import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'rydentec.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_PORTFOLIO = [
  {
    id: 'proj-01',
    title: 'Honorato Barber Shop & Grooming Lounge',
    industry: 'Barbershop & Men\'s Grooming',
    category: 'Website Development',
    isConcept: false,
    published: true,
    order: 1,
    liveUrl: 'https://www.honoratobarbershop.com.br/',
    shortDescription: 'Official high-converting digital presence and online booking experience with modern dark aesthetic and mobile-first scheduling.',
    fullDescription: 'Custom high-performance web experience engineered for Honorato Barber Shop (live at honoratobarbershop.com.br). Features automated appointment scheduling, service packages showcase, team barber portfolios, and direct WhatsApp VIP booking integration.',
    desktopPreview: '/portfolio/barbershop-desktop.png',
    mobilePreview: '/portfolio/barbershop-mobile.png',
    badge: 'Live Client Project',
    techStack: ['Responsive UX', 'Direct Booking', 'WhatsApp VIP Integration', 'SEO Optimized'],
    metrics: ['Sub-second load speed', 'Mobile-first layout', 'Live Production Site']
  },
  {
    id: 'proj-02',
    title: 'Sofisticasa Interior & Architecture Studio',
    industry: 'Home Services & Interior Design',
    category: 'Website Redesign',
    isConcept: true,
    published: true,
    order: 2,
    shortDescription: 'Editorial-grade portfolio experience highlighting luxury residential projects, material finishes, and consultation scheduling.',
    fullDescription: 'Sophisticated digital showcase for an upscale interior architecture studio. Focuses on immersive project galleries, client brief intake forms, and seamless responsive typography that elevates brand credibility.',
    desktopPreview: '/portfolio/interior-desktop.png',
    mobilePreview: '/portfolio/interior-mobile.png',
    badge: 'Concept Project',
    techStack: ['Responsive UX', 'Next-gen Images', 'Lead Funnel', 'Analytics'],
    metrics: ['Luxury visual tone', 'Inquiry intake form', 'Editorial typography']
  },
  {
    id: 'proj-03',
    title: 'Apex Auto Detailing & Ceramic Studio',
    industry: 'Auto Detailing & Care',
    category: 'Website Development',
    isConcept: true,
    published: true,
    order: 3,
    shortDescription: 'Interactive vehicle package selector with dynamic quote calculation and high-resolution before/after comparisons.',
    fullDescription: 'Custom automotive studio web application featuring interactive service tier selection (Paint Correction, Ceramic Coating, PPF), quote estimator, and localized Google Maps & review integration.',
    desktopPreview: '/portfolio/detailing-desktop.png',
    mobilePreview: '/portfolio/detailing-mobile.png',
    badge: 'Concept Project',
    techStack: ['Interactive Calculator', 'Modern UI', 'Conversion Engine'],
    metrics: ['Package builder', 'Visual before/after', 'Instant quote request']
  },
  {
    id: 'proj-04',
    title: 'RydenFlow Business Operations ERP',
    industry: 'Professional Services',
    category: 'Custom Software',
    isConcept: true,
    published: true,
    order: 4,
    shortDescription: 'Modular internal enterprise dashboard for job tracking, real-time invoicing, customer management, and team dispatch.',
    fullDescription: 'Enterprise workflow management system built to replace scattered spreadsheets. Centralizes quotes, automated payment status tracking, inventory alerts, and role-based staff permissions into one fast, secure cloud portal.',
    desktopPreview: '/portfolio/erp-desktop.png',
    mobilePreview: '/portfolio/erp-mobile.png',
    badge: 'Concept Project',
    techStack: ['Node.js API', 'Role-Based Access', 'Data Analytics', 'Realtime Sync'],
    metrics: ['Real-time KPIs', 'Automated invoicing', 'Zero-clutter interface']
  },
  {
    id: 'proj-05',
    title: 'Ótica Central Precision Eyewear',
    industry: 'Retail & Wellness',
    category: 'App Development',
    isConcept: true,
    published: true,
    order: 5,
    shortDescription: 'Modern digital catalog and prescription appointment scheduling system for boutique optical practices.',
    fullDescription: 'Digital catalog and examination scheduling web app. Allows patients to browse curated designer frames, upload prescription documents securely, and book comprehensive optometry examinations in seconds.',
    desktopPreview: '/portfolio/optical-desktop.png',
    mobilePreview: '/portfolio/optical-mobile.png',
    badge: 'Concept Project',
    techStack: ['Progressive Web App', 'Prescription Upload', 'HIPAA-aware UX'],
    metrics: ['Frame catalog', 'One-tap booking', 'Speed-optimized assets']
  },
  {
    id: 'proj-06',
    title: 'AutoAssist AI Customer Dispatcher',
    industry: 'AI & Business Automation',
    category: 'AI & Automation',
    isConcept: true,
    published: true,
    order: 6,
    shortDescription: 'Intelligent multi-channel intake bot that pre-qualifies incoming inquiries and syncs directly into CRM calendars.',
    fullDescription: 'Automated conversational pipeline connecting WhatsApp, web contact forms, and Google Calendar. Automatically answers frequent service questions, estimates turnaround times, and books consultations without manual staff overhead.',
    desktopPreview: '/portfolio/automation-desktop.png',
    mobilePreview: '/portfolio/automation-mobile.png',
    badge: 'Concept Project',
    techStack: ['AI Language API', 'Webhook Dispatcher', 'CRM Sync', 'WhatsApp API'],
    metrics: ['24/7 instant replies', 'CRM auto-sync', 'Lead qualification']
  }
];

const DEFAULT_SETTINGS = {
  brandName: 'RydenTec',
  tagline: 'Technology That Moves Your Business Forward.',
  officialDomain: 'rydentec.com',
  secondaryDomain: 'rydentec.online',
  heroHeadline: 'We Build Digital Experiences That Move Businesses Forward.',
  heroSupporting: 'From high-performance websites to custom software and intelligent automation, we turn ambitious ideas into powerful digital solutions.',
  contactEmail: 'hello@rydentec.com',
  whatsappNumber: '+1 (305) 890-2184',
  whatsappMessage: 'Hi! I found RydenTec online and I\'m interested in discussing a digital project for my business.',
  schedulingUrl: 'https://calendly.com/rydentec/consultation',
  metaPixelId: '',
  gaMeasurementId: '',
  pricing: {
    starter: {
      title: 'STARTER WEBSITE',
      price: '$799',
      startingNote: 'Starting at',
      description: 'Ideal for small businesses establishing a professional online presence.',
      features: [
        'Responsive Website',
        'Up to 3 Pages',
        'Contact Form',
        'Mobile Optimization',
        'Basic SEO Setup',
        'Social Media Integration'
      ],
      cta: 'Get Started',
      popular: false
    },
    business: {
      title: 'BUSINESS WEBSITE',
      price: '$1,499',
      startingNote: 'Starting at',
      description: 'For businesses that need a more complete digital presence.',
      features: [
        'Up to 7 Pages',
        'Custom Responsive Design',
        'Lead Capture Forms',
        'Analytics Integration',
        'SEO Foundations',
        'Conversion-Focused Structure'
      ],
      cta: 'Request a Proposal',
      popular: true
    },
    custom: {
      title: 'CUSTOM SOLUTIONS',
      price: 'Custom Quote',
      startingNote: '',
      description: 'For complex websites, applications, software, and automation projects.',
      features: [
        'Custom Project Scope',
        'Advanced Features',
        'Business Integrations',
        'Scalable Architecture',
        'Tailored User Experience',
        'Custom Development'
      ],
      cta: 'Let\'s Talk',
      popular: false
    },
    disclaimer: 'Final pricing depends on project requirements, features, and scope. Hosting, third-party subscriptions, and ongoing maintenance may be quoted separately.'
  }
};

function getInitialData() {
  const salt = bcrypt.genSaltSync(10);
  const password = process.env.ADMIN_PASSWORD || 'RydenTec2026!';
  const passwordHash = bcrypt.hashSync(password, salt);

  return {
    admin: {
      username: process.env.ADMIN_USERNAME || 'admin',
      passwordHash: passwordHash,
      lastLogin: null
    },
    settings: DEFAULT_SETTINGS,
    portfolio: DEFAULT_PORTFOLIO,
    leads: [],
    analytics: {
      visits: 0,
      uniqueIps: {},
      whatsappClicks: 0,
      quoteRequests: 0,
      consultationClicks: 0,
      events: []
    }
  };
}

let dbCache = null;

export function loadDb() {
  if (dbCache) return dbCache;

  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialData();
    saveDb(initial);
    dbCache = initial;
    return initial;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    dbCache = JSON.parse(raw);
    // Ensure all critical root keys exist
    if (!dbCache.settings) dbCache.settings = DEFAULT_SETTINGS;
    if (!dbCache.portfolio) dbCache.portfolio = DEFAULT_PORTFOLIO;
    if (!dbCache.leads) dbCache.leads = [];
    if (!dbCache.analytics) dbCache.analytics = { visits: 0, uniqueIps: {}, whatsappClicks: 0, quoteRequests: 0, consultationClicks: 0, events: [] };
    return dbCache;
  } catch (err) {
    console.error('Error reading database file, fallback to default:', err);
    const initial = getInitialData();
    saveDb(initial);
    dbCache = initial;
    return initial;
  }
}

export function saveDb(data) {
  dbCache = data;
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}
