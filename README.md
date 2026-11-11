# RydenTec — Official Technology & Digital Solutions Platform

> **Technology That Moves Your Business Forward.**  
> Official Domain: [rydentec.com](https://rydentec.com)  
> Secondary Domain: [rydentec.online](https://rydentec.online)

---

## 1. Overview & Brand Identity

RydenTec is an international technology and digital solutions brand engineered for the American commercial market. The platform delivers high-converting presentation, interactive software demonstrations, real-time lead capture, and a protected administrative operations console.

### Official Color Palette
- **Deep Navy:** `#07111F`
- **Midnight Blue:** `#0B1730`
- **Electric Blue:** `#087CFF`
- **Cyan:** `#00D5FF`
- **Pure White:** `#FFFFFF`
- **Soft Gray:** `#A8B5C7`
- **Dark Card Background:** `#101F35`
- **Signature Gradient:** `linear-gradient(135deg, #087CFF 0%, #00D5FF 100%)`

### Official Brand Assets
- Preserves the exact typography, proportions, colors, and visual characteristics of the supplied RydenTec logo (`/public/brand/rydentec-logo.png`).

---

## 2. Core Capabilities & Architecture

1. **High-Impact Hero Section**
   - Headline: *"We Build Digital Experiences That Move Businesses Forward."*
   - Interactive 3D floating composition showcasing desktop web preview, Core Web Vitals (99/100 score), AI Lead Dispatcher, and real-time analytics.
   - Value propositions: Built Around Your Business, Modern Responsive Experiences, Scalable Digital Solutions.

2. **Core Services (Interactive Cards)**
   - **01 Website Development** — *Websites That Make a Lasting Impression.*
   - **02 Custom Software** — *Software Built Around the Way You Work.*
   - **03 App Development** — *Your Ideas, Built for the Digital World.*
   - **04 AI & Automation** — *Work Smarter With Intelligent Technology.*

3. **Interactive Website Showcase**
   - Dual-viewport switcher: **Desktop View** & **Mobile View** with dynamic screen framing.
   - Conceptual demonstrations for 6 target industries:
     - Barbershop & Grooming (*Honorato Barber Club*)
     - Auto Detailing & Care (*Apex Ceramic & Paint Defense*)
     - Home Services & Remodeling (*Vanguard Contracting*)
     - Beauty & Wellness (*Aura Aesthetics Clinic*)
     - Professional Advisory (*Sterling Financial Partners*)
     - Artisan Restaurant & Lounge (*L'Atelier Modern Hearth*)
   - Transparently badged as *Concept Demonstration*.

4. **Curated Portfolio & Case Details**
   - High-fidelity project cards with technology tags, architectural specs, and a modal breakdown.
   - Dynamically served from the persistent database (`data/rydentec.json`) and editable live via the Admin Console.

5. **Strategic Method ("How We Work")**
   - Progressive 5-step roadmap: Let's Talk &rarr; Strategy & Proposal &rarr; Design & Development &rarr; Review & Launch &rarr; Ongoing Support.

6. **Transparent Pricing**
   - **Starter Website** (Starting at $799)
   - **Business Website** (Starting at $1,499 &mdash; *Most Popular*)
   - **Custom Solutions** (Custom Quote)
   - Full commercial disclaimer regarding project scopes and hosting.

7. **Production Lead Capture & Conversion Engine**
   - Validates, sanitizes, and persists all inquiries to `data/rydentec.json`.
   - Anti-spam honeypot + sliding-window IP rate limiting + duplicate submission prevention.
   - Triggers celebratory UI animation upon verified database save.
   - Immediate conversion actions: direct WhatsApp chat and Calendly discovery scheduling.

8. **Discreet Floating WhatsApp Integration**
   - Official WhatsApp badge with pulse indicator.
   - Prefilled message: *"Hi! I found RydenTec online and I'm interested in discussing a digital project for my business."*
   - Configurable destination number in Admin settings.
   - Tracks clicks as a dedicated analytics event.

9. **Private Administrative Dashboard (`/admin`)**
   - Secure JWT token authentication.
   - **Lead Management:** Search, status filtering (`new`, `contacted`, `negotiating`, `won`, `lost`), internal follow-up notes, click-to-email, click-to-WhatsApp.
   - **Portfolio Management:** Add, edit, delete, publish/unpublish, and toggle concept badges.
   - **Website & Pricing Editor:** Update headlines, starter/business/custom prices and features, WhatsApp number, Calendly link, Meta Pixel ID, GA ID.
   - **Real Analytics:** Aggregates real visit logs, quote requests, WhatsApp clicks, and conversion rate percentages. Zero fake metrics.

---

## 3. Getting Started & Running Locally

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm

### Installation
```bash
npm install
```

### Development Mode (with Live Reload)
```bash
npm run dev
```

### Production Build & Launch
```bash
npm run build
npm start
```
- Public website: `http://localhost:5000`
- Admin portal: `http://localhost:5000/admin`

---

## 4. Default Administrator Credentials

- **Portal URL:** `http://localhost:5000/admin`
- **Username:** `admin`
- **Default Password:** `RydenTec2026!`
*(Password can be updated in `.env` as `ADMIN_PASSWORD` or modified via the settings database).*

---

## 5. Production Domain Deployment (rydentec.com)

1. Deploy the Node.js application to your cloud host (VPS, Render, Railway, DigitalOcean, or cPanel Node.js Application Manager).
2. Point your DNS records for `rydentec.com` (A / CNAME) to the server.
3. Configure `rydentec.online` with a 301 Permanent Redirect to `https://rydentec.com`.
4. In the Admin Dashboard (`/admin`), set your verified WhatsApp business number and Calendly consultation URL.
