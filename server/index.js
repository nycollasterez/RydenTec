import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadDb, saveDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'rydentec-super-secure-key-2026-production';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve public static files (brand logos, previews)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Simple in-memory rate limiter
const rateLimitMap = new Map();
function rateLimiter(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 30;

  const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count++;
  }

  rateLimitMap.set(ip, clientData);

  if (clientData.count > maxRequests) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before trying again.'
    });
  }

  next();
}

// Admin Authentication Middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Session expired or invalid token.' });
  }
}

// -------------------------------------------------------------
// PUBLIC API ROUTES
// -------------------------------------------------------------

// 1. Settings (Public)
app.get('/api/settings', (req, res) => {
  try {
    const db = loadDb();
    const safeSettings = {
      brandName: db.settings.brandName,
      tagline: db.settings.tagline,
      heroHeadline: db.settings.heroHeadline,
      heroSupporting: db.settings.heroSupporting,
      contactEmail: db.settings.contactEmail,
      whatsappNumber: db.settings.whatsappNumber,
      whatsappMessage: db.settings.whatsappMessage,
      schedulingUrl: db.settings.schedulingUrl,
      metaPixelId: db.settings.metaPixelId,
      gaMeasurementId: db.settings.gaMeasurementId,
      pricing: db.settings.pricing
    };
    res.json({ success: true, settings: safeSettings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch settings' });
  }
});

// 2. Portfolio (Public - Only published)
app.get('/api/portfolio', (req, res) => {
  try {
    const db = loadDb();
    const publishedProjects = (db.portfolio || [])
      .filter(p => p.published !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ success: true, projects: publishedProjects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio' });
  }
});

// 3. Analytics Tracking (Public)
app.post('/api/analytics/track', (req, res) => {
  try {
    const { event, path: currentPath, referrer } = req.body;
    if (!event) return res.status(400).json({ success: false, error: 'Missing event' });

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'direct';
    const db = loadDb();

    if (!db.analytics) {
      db.analytics = { visits: 0, uniqueIps: {}, whatsappClicks: 0, quoteRequests: 0, consultationClicks: 0, events: [] };
    }

    if (event === 'pageview') {
      db.analytics.visits = (db.analytics.visits || 0) + 1;
      if (!db.analytics.uniqueIps) db.analytics.uniqueIps = {};
      db.analytics.uniqueIps[ip] = (db.analytics.uniqueIps[ip] || 0) + 1;
    } else if (event === 'whatsapp_click') {
      db.analytics.whatsappClicks = (db.analytics.whatsappClicks || 0) + 1;
    } else if (event === 'quote_request') {
      db.analytics.quoteRequests = (db.analytics.quoteRequests || 0) + 1;
    } else if (event === 'consultation_click') {
      db.analytics.consultationClicks = (db.analytics.consultationClicks || 0) + 1;
    }

    // Keep last 100 raw events for transparency without bloat
    if (!db.analytics.events) db.analytics.events = [];
    db.analytics.events.unshift({
      event,
      path: currentPath || '/',
      referrer: referrer || 'direct',
      timestamp: new Date().toISOString()
    });

    if (db.analytics.events.length > 200) {
      db.analytics.events = db.analytics.events.slice(0, 200);
    }

    saveDb(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Tracking error' });
  }
});

// 4. Lead Submission (Public with Validation, Honeypot, Rate Limiter)
app.post('/api/leads', rateLimiter, (req, res) => {
  try {
    const {
      fullName,
      businessName,
      email,
      phone,
      service,
      budget,
      projectDetails,
      honeypot // Bot trap
    } = req.body;

    // Honeypot check - if filled, silently ignore or reject
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Inquiry received' });
    }

    // Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide your full name.' });
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!service || typeof service !== 'string') {
      return res.status(400).json({ success: false, error: 'Please select what type of solution you need.' });
    }

    if (!projectDetails || typeof projectDetails !== 'string' || projectDetails.trim().length < 5) {
      return res.status(400).json({ success: false, error: 'Please provide a brief description of your project goals.' });
    }

    const db = loadDb();
    if (!db.leads) db.leads = [];

    // Duplicate submission check (same email and project within last 5 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const isDuplicate = db.leads.some(l => 
      l.email.toLowerCase() === email.trim().toLowerCase() && 
      new Date(l.createdAt).getTime() > fiveMinutesAgo
    );

    if (isDuplicate) {
      return res.status(400).json({
        success: false,
        error: 'We have recently received your request. Our team will contact you shortly!'
      });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      businessName: (businessName || '').trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      service: service.trim(),
      budget: budget || 'Not specified',
      projectDetails: projectDetails.trim(),
      status: 'new', // new, contacted, negotiating, won, lost
      notes: '',
      createdAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: userAgent
    };

    db.leads.unshift(newLead);

    // Track quote request event
    if (!db.analytics) db.analytics = { visits: 0, uniqueIps: {}, whatsappClicks: 0, quoteRequests: 0, consultationClicks: 0, events: [] };
    db.analytics.quoteRequests = (db.analytics.quoteRequests || 0) + 1;

    saveDb(db);

    // Console notification for administrator (prepared for SMTP / Resend / SendGrid webhook)
    console.log(`[RydenTec Notification] NEW LEAD RECEIVED from ${newLead.fullName} (${newLead.businessName || 'Independent'}) - Service: ${newLead.service} - Email: ${newLead.email}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your quote request has been securely submitted. A RydenTec specialist will review your project and follow up within 24 business hours.',
      leadId: newLead.id
    });
  } catch (err) {
    console.error('Lead submission error:', err);
    res.status(500).json({ success: false, error: 'A server error occurred. Please try again.' });
  }
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required.' });
    }

    const db = loadDb();
    const adminUser = db.admin;

    if (username.trim().toLowerCase() !== adminUser.username.toLowerCase()) {
      return res.status(401).json({ success: false, error: 'Invalid administrator credentials.' });
    }

    const isMatch = bcrypt.compareSync(password, adminUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid administrator credentials.' });
    }

    // Update last login
    adminUser.lastLogin = new Date().toISOString();
    saveDb(db);

    const token = jwt.sign(
      { username: adminUser.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        username: adminUser.username,
        lastLogin: adminUser.lastLogin
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Authentication failed.' });
  }
});

app.get('/api/auth/me', authenticateAdmin, (req, res) => {
  const db = loadDb();
  res.json({
    success: true,
    user: {
      username: db.admin.username,
      lastLogin: db.admin.lastLogin
    }
  });
});

// Change Admin Password
app.post('/api/admin/change-password', authenticateAdmin, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, error: 'New password must be at least 8 characters long.' });
    }

    const db = loadDb();
    const isMatch = bcrypt.compareSync(currentPassword, db.admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect.' });
    }

    const salt = bcrypt.genSaltSync(10);
    db.admin.passwordHash = bcrypt.hashSync(newPassword, salt);
    saveDb(db);

    res.json({ success: true, message: 'Administrator password updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update password.' });
  }
});

// -------------------------------------------------------------
// ADMIN PROTECTED ROUTES: LEADS
// -------------------------------------------------------------
app.get('/api/admin/leads', authenticateAdmin, (req, res) => {
  try {
    const db = loadDb();
    const { status, search } = req.query;
    let leads = db.leads || [];

    if (status && status !== 'all') {
      leads = leads.filter(l => l.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      leads = leads.filter(l => 
        l.fullName.toLowerCase().includes(q) ||
        (l.businessName && l.businessName.toLowerCase().includes(q)) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone && l.phone.includes(q)) ||
        l.service.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, leads });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch leads' });
  }
});

app.patch('/api/admin/leads/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const db = loadDb();

    const leadIndex = (db.leads || []).findIndex(l => l.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({ success: false, error: 'Lead not found.' });
    }

    if (status) {
      const validStatuses = ['new', 'contacted', 'negotiating', 'won', 'lost'];
      if (validStatuses.includes(status)) {
        db.leads[leadIndex].status = status;
      }
    }

    if (typeof notes === 'string') {
      db.leads[leadIndex].notes = notes;
    }

    saveDb(db);
    res.json({ success: true, lead: db.leads[leadIndex] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update lead' });
  }
});

app.delete('/api/admin/leads/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = loadDb();
    db.leads = (db.leads || []).filter(l => l.id !== id);
    saveDb(db);
    res.json({ success: true, message: 'Lead deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete lead' });
  }
});

// -------------------------------------------------------------
// ADMIN PROTECTED ROUTES: PORTFOLIO
// -------------------------------------------------------------
app.get('/api/admin/portfolio', authenticateAdmin, (req, res) => {
  const db = loadDb();
  res.json({ success: true, projects: db.portfolio || [] });
});

app.post('/api/admin/portfolio', authenticateAdmin, (req, res) => {
  try {
    const { title, industry, category, shortDescription, fullDescription, desktopPreview, mobilePreview, isConcept, published, techStack, metrics } = req.body;
    if (!title || !category) {
      return res.status(400).json({ success: false, error: 'Title and category are required.' });
    }

    const db = loadDb();
    if (!db.portfolio) db.portfolio = [];

    const newProject = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      industry: (industry || 'Technology').trim(),
      category: category.trim(),
      shortDescription: (shortDescription || '').trim(),
      fullDescription: (fullDescription || '').trim(),
      desktopPreview: desktopPreview || '/portfolio/default-desktop.png',
      mobilePreview: mobilePreview || '/portfolio/default-mobile.png',
      isConcept: isConcept !== undefined ? Boolean(isConcept) : true,
      badge: isConcept ? 'Concept Project' : 'Client Project',
      published: published !== undefined ? Boolean(published) : true,
      order: db.portfolio.length + 1,
      techStack: Array.isArray(techStack) ? techStack : ['Next.js', 'Tailwind CSS'],
      metrics: Array.isArray(metrics) ? metrics : ['High Performance']
    };

    db.portfolio.push(newProject);
    saveDb(db);
    res.status(201).json({ success: true, project: newProject });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create project.' });
  }
});

app.put('/api/admin/portfolio/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = loadDb();
    const index = (db.portfolio || []).findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }

    db.portfolio[index] = {
      ...db.portfolio[index],
      ...req.body,
      id // preserve id
    };

    saveDb(db);
    res.json({ success: true, project: db.portfolio[index] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update project.' });
  }
});

app.delete('/api/admin/portfolio/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = loadDb();
    db.portfolio = (db.portfolio || []).filter(p => p.id !== id);
    saveDb(db);
    res.json({ success: true, message: 'Project removed.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete project.' });
  }
});

// -------------------------------------------------------------
// ADMIN PROTECTED ROUTES: SETTINGS & PRICING
// -------------------------------------------------------------
app.put('/api/admin/settings', authenticateAdmin, (req, res) => {
  try {
    const db = loadDb();
    db.settings = {
      ...db.settings,
      ...req.body
    };
    saveDb(db);
    res.json({ success: true, settings: db.settings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update settings.' });
  }
});

// -------------------------------------------------------------
// ADMIN PROTECTED ROUTES: REAL ANALYTICS
// -------------------------------------------------------------
app.get('/api/admin/analytics', authenticateAdmin, (req, res) => {
  try {
    const db = loadDb();
    const analytics = db.analytics || { visits: 0, uniqueIps: {}, whatsappClicks: 0, quoteRequests: 0, consultationClicks: 0, events: [] };
    const leads = db.leads || [];

    const totalVisits = analytics.visits || 0;
    const uniqueVisitors = Object.keys(analytics.uniqueIps || {}).length;
    const totalLeads = leads.length;
    const whatsappClicks = analytics.whatsappClicks || 0;
    const consultationClicks = analytics.consultationClicks || 0;

    // Conversion calculation based on real counts
    const conversionRate = totalVisits > 0 ? ((totalLeads / totalVisits) * 100).toFixed(1) : '0.0';

    // Service distribution
    const serviceDistribution = {};
    leads.forEach(l => {
      serviceDistribution[l.service] = (serviceDistribution[l.service] || 0) + 1;
    });

    // Status distribution
    const statusDistribution = {
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      negotiating: leads.filter(l => l.status === 'negotiating').length,
      won: leads.filter(l => l.status === 'won').length,
      lost: leads.filter(l => l.status === 'lost').length,
    };

    res.json({
      success: true,
      summary: {
        totalVisits,
        uniqueVisitors,
        totalLeads,
        whatsappClicks,
        consultationClicks,
        conversionRate: `${conversionRate}%`,
        serviceDistribution,
        statusDistribution
      },
      recentEvents: (analytics.events || []).slice(0, 50)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to compute analytics.' });
  }
});

// Serve frontend in production build if dist exists
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`\n🚀 RydenTec Server running on port ${PORT}`);
  console.log(`⚡ Official Domain: https://rydentec.com (fallback: http://localhost:${PORT})`);
  console.log(`🔒 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`💼 Default Admin Username: admin / Password: ${process.env.ADMIN_PASSWORD || 'RydenTec2026!'}\n`);
});
