import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

// ─── whatsapp helper ───────────────────────────────────────────────────────────
const WA_NUMBER = '13058902184';
const WA_MSG = encodeURIComponent("Hi! I saw the Ryden website and I'd like to discuss a website for my business.");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// ─── reduced-motion check ─────────────────────────────────────────────────────
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── easing ───────────────────────────────────────────────────────────────────
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const mapRange = (v, inMin, inMax, outMin, outMax) => {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, easeInOut(t));
};

// ─── Forma Studio architecture photo (Unsplash — free) ───────────────────────
const PHOTO_URL =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop';
const PHOTO_MOBILE_URL =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=75&auto=format&fit=crop&crop=center';

// ─── SVG cursor path helpers ──────────────────────────────────────────────────
// Total path length is known; we drive stroke-dashoffset from full → 0
function CursorSVG({ progress }) {
  // The cursor is a simple arrow pointer, only shown inside the demo
  const opacity = mapRange(progress, 0, 0.45, 0, 1) * mapRange(progress, 0.4, 0.5, 1, 0);
  const x = mapRange(progress, 0, 0.1, 10, 55);
  const y = mapRange(progress, 0, 0.1, 10, 38);
  if (opacity < 0.01) return null;
  return (
    <svg
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        zIndex: 20,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
        transition: 'none',
      }}
      width="22"
      height="28"
      viewBox="0 0 22 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L2 22L8 16L12 26L15 24.5L11 14.5L18 14.5L2 2Z"
        fill="white"
        stroke="#222"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Browser chrome outline drawn with SVG stroke-dashoffset ─────────────────
function BrowserOutline({ progress }) {
  // Phase 0–20%: draw the outer browser rect + header bar
  const outerLen = 332; // perimeter of outer rect (approx)
  const headerLen = 90; // header divider line
  const outerDash = mapRange(progress, 0, 0.12, outerLen, 0);
  const headerDash = mapRange(progress, 0.1, 0.2, headerLen, 0);
  const outerOpacity = progress > 0.01 ? 1 : 0;

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}
      viewBox="0 0 400 280"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* outer browser rect */}
      <rect
        x="2" y="2" width="396" height="276" rx="8"
        stroke="#C4A882"
        strokeWidth="2"
        strokeDasharray={outerLen}
        strokeDashoffset={outerDash}
        opacity={outerOpacity}
        fill="none"
      />
      {/* header divider */}
      <line
        x1="2" y1="38" x2="398" y2="38"
        stroke="#C4A882"
        strokeWidth="1.5"
        strokeDasharray={headerLen}
        strokeDashoffset={headerDash}
        opacity={headerDash < headerLen ? 1 : 0}
      />
      {/* traffic light dots */}
      {progress > 0.15 && (
        <>
          <circle cx="18" cy="20" r="4" fill="#ff5f56" opacity={mapRange(progress, 0.15, 0.22, 0, 1)} />
          <circle cx="30" cy="20" r="4" fill="#ffbd2e" opacity={mapRange(progress, 0.17, 0.24, 0, 1)} />
          <circle cx="42" cy="20" r="4" fill="#27c93f" opacity={mapRange(progress, 0.19, 0.26, 0, 1)} />
        </>
      )}
    </svg>
  );
}

// ─── wireframe placeholders drawn phase 20–45% ────────────────────────────────
function WireframePlaceholders({ progress }) {
  const show = (from, to) => ({ opacity: mapRange(progress, from, to, 0, 1) });

  // nav label placeholder
  const navOp = mapRange(progress, 0.2, 0.28, 0, 1);
  // headline lines
  const h1Op = mapRange(progress, 0.25, 0.33, 0, 1);
  const h2Op = mapRange(progress, 0.28, 0.36, 0, 1);
  // image rect
  const imgOp = mapRange(progress, 0.3, 0.4, 0, 1);
  // button outline
  const btnOp = mapRange(progress, 0.35, 0.44, 0, 1);

  // fade all out as we enter phase 45–60%
  const globalFade = 1 - mapRange(progress, 0.52, 0.65, 0, 1);

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 6 }}
      viewBox="0 0 400 280"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity={globalFade}
    >
      {/* nav placeholder bar */}
      <rect x="60" y="12" width="180" height="8" rx="4" fill="#C4A882" opacity={navOp * 0.4} />
      <rect x="250" y="12" width="50" height="8" rx="4" fill="#C4A882" opacity={navOp * 0.6} />
      <rect x="310" y="10" width="70" height="12" rx="6" fill="#C4A882" opacity={navOp * 0.5} />

      {/* headline lines */}
      <rect x="20" y="52" width="200" height="14" rx="3" fill="#1A1A1A" opacity={h1Op * 0.25} />
      <rect x="20" y="72" width="150" height="14" rx="3" fill="#1A1A1A" opacity={h2Op * 0.2} />
      <rect x="20" y="92" width="100" height="10" rx="3" fill="#1A1A1A" opacity={h2Op * 0.15} />

      {/* image placeholder rect */}
      <rect x="20" y="115" width="360" height="110" rx="4" stroke="#C4A882" strokeWidth="1.5" strokeDasharray="6 4" fill="#C4A882" fillOpacity={imgOp * 0.06} opacity={imgOp} />
      {/* image icon */}
      <text x="190" y="178" textAnchor="middle" fill="#C4A882" fontSize="20" opacity={imgOp * 0.5}>⬛</text>

      {/* button placeholder */}
      <rect x="20" y="234" width="110" height="30" rx="15" stroke="#C4A882" strokeWidth="1.5" fill="none" opacity={btnOp} />
      <rect x="22" y="244" width="80" height="8" rx="4" fill="#C4A882" opacity={btnOp * 0.5} />
    </svg>
  );
}

// ─── The actual Forma Studio site content (phase 45–100%) ─────────────────────
function FormaStudioSite({ progress }) {
  // content fades in 45–65%
  const contentIn = mapRange(progress, 0.45, 0.68, 0, 1);

  const photoReveal = mapRange(progress, 0.47, 0.72, 100, 0); // clip-path inset right %
  const titleOp = mapRange(progress, 0.5, 0.68, 0, 1);
  const titleY = mapRange(progress, 0.5, 0.68, 12, 0);
  const btnOp = mapRange(progress, 0.55, 0.72, 0, 1);
  const navNameOp = mapRange(progress, 0.52, 0.68, 0, 1);

  if (contentIn < 0.02) return null;

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        background: '#F5F0EA',
        borderRadius: 8,
        overflow: 'hidden',
        opacity: contentIn,
        zIndex: 7,
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      {/* Demo nav */}
      <div style={{
        height: 38,
        borderBottom: '1px solid #E0D8CF',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        background: '#FAF8F4',
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#1A1A1A', opacity: navNameOp, fontFamily: 'Georgia, serif' }}>
          FORMA STUDIO
        </span>
        <div style={{ display: 'flex', gap: 12, opacity: navNameOp }}>
          {['Work', 'About', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 9, color: '#6B6055', letterSpacing: 1 }}>{l}</span>
          ))}
          <span style={{ fontSize: 9, background: '#1A1A1A', color: '#FAF8F4', padding: '2px 8px', borderRadius: 20, letterSpacing: 0.5 }}>Enquire</span>
        </div>
      </div>

      {/* Hero area */}
      <div style={{ padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOp,
          transition: 'none',
        }}>
          <div style={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: -0.5 }}>
            Spaces for
          </div>
          <div style={{ fontSize: 18, fontStyle: 'italic', color: '#C4A882', lineHeight: 1.2 }}>
            slower living.
          </div>
          <div style={{ fontSize: 9, color: '#6B6055', marginTop: 4, letterSpacing: 0.5, lineHeight: 1.5, maxWidth: 180 }}>
            Interior design for homes that breathe.
          </div>
        </div>

        {/* Photo reveal */}
        <div style={{
          width: '100%', height: 108,
          borderRadius: 4,
          overflow: 'hidden',
          clipPath: `inset(0 ${photoReveal}% 0 0)`,
        }}>
          <img
            src={PHOTO_URL}
            alt="Forma Studio — interior architecture"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
        </div>

        {/* Button */}
        <div style={{ opacity: btnOp, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            padding: '5px 14px',
            background: '#1A1A1A',
            color: '#FAF8F4',
            borderRadius: 20,
            fontSize: 9,
            letterSpacing: 1,
            display: 'inline-block',
          }}>
            Explore our work
          </div>
          <span style={{ fontSize: 9, color: '#C4A882', letterSpacing: 1 }}>↓ scroll</span>
        </div>
      </div>
    </div>
  );
}

// ─── Device frames (phase 75–100%) ────────────────────────────────────────────
function DeviceFrames({ progress }) {
  // Start appearing at 75%
  const laptopIn = mapRange(progress, 0.75, 0.9, 0, 1);
  const phoneIn = mapRange(progress, 0.8, 0.92, 0, 1);
  const scale = mapRange(progress, 0.75, 0.88, 1, 0.72);
  const translateY = mapRange(progress, 0.75, 0.88, 0, 10);

  if (laptopIn < 0.02) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 15,
      pointerEvents: 'none',
    }}>
      {/* Laptop frame */}
      <div style={{
        opacity: laptopIn,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        display: 'flex', alignItems: 'flex-end', gap: 16,
        transformOrigin: 'center center',
      }}>
        {/* Laptop */}
        <div style={{ position: 'relative' }}>
          {/* Screen bezel */}
          <div style={{
            width: 280, height: 185,
            background: '#1A1A1A',
            borderRadius: '8px 8px 0 0',
            padding: '10px 10px 0',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: '#F5F0EA',
              borderRadius: '4px 4px 0 0',
              overflow: 'hidden',
            }}>
              {/* Mini Forma Studio preview */}
              <div style={{ background: '#FAF8F4', borderBottom: '1px solid #E0D8CF', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1.5, color: '#1A1A1A', fontFamily: 'Georgia, serif' }}>FORMA STUDIO</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Work','About','Contact'].map(l=><span key={l} style={{fontSize:6,color:'#6B6055',letterSpacing:0.5}}>{l}</span>)}
                </div>
              </div>
              <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ fontSize: 10, color: '#1A1A1A', fontFamily: 'Georgia, serif' }}>Spaces for <em style={{ color: '#C4A882' }}>slower living.</em></div>
                <div style={{ width: '100%', height: 60, borderRadius: 3, overflow: 'hidden' }}>
                  <img src={PHOTO_URL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ background: '#1A1A1A', color: '#FAF8F4', fontSize: 6, padding: '3px 8px', borderRadius: 20, display: 'inline-block', letterSpacing: 0.8 }}>Explore our work</div>
              </div>
            </div>
          </div>
          {/* Laptop base */}
          <div style={{ width: 300, height: 10, background: '#2A2A2A', borderRadius: '0 0 4px 4px', marginLeft: -10, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }} />
          <div style={{ width: 320, height: 4, background: '#1A1A1A', borderRadius: '0 0 8px 8px', marginLeft: -20 }} />
        </div>

        {/* Phone frame */}
        <div style={{
          opacity: phoneIn,
          transform: `translateX(${mapRange(progress, 0.8, 0.92, 30, 0)}px)`,
          position: 'relative',
        }}>
          <div style={{
            width: 72, height: 148,
            background: '#1A1A1A',
            borderRadius: 12,
            padding: '8px 4px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}>
            {/* Notch */}
            <div style={{ width: 20, height: 4, background: '#333', borderRadius: 2, margin: '0 auto 4px' }} />
            <div style={{ width: '100%', height: '100%', background: '#F5F0EA', borderRadius: 8, overflow: 'hidden' }}>
              {/* Mobile nav */}
              <div style={{ background: '#FAF8F4', borderBottom: '1px solid #E0D8CF', padding: '3px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 5, fontWeight: 700, letterSpacing: 1, color: '#1A1A1A', fontFamily: 'Georgia, serif' }}>FS</span>
                <div style={{ width: 10, height: 6, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[1,2,3].map(i=><div key={i} style={{height:1,background:'#1A1A1A',borderRadius:1}}/>)}
                </div>
              </div>
              {/* Vertical photo crop */}
              <div style={{ width: '100%', height: 55, overflow: 'hidden' }}>
                <img src={PHOTO_MOBILE_URL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div style={{ padding: '4px 5px' }}>
                <div style={{ fontSize: 6.5, color: '#1A1A1A', fontFamily: 'Georgia, serif', lineHeight: 1.3 }}>
                  Spaces for<br /><em style={{ color: '#C4A882' }}>slower living.</em>
                </div>
                <div style={{ marginTop: 4, background: '#1A1A1A', color: '#FAF8F4', fontSize: 5, padding: '2px 6px', borderRadius: 20, display: 'inline-block', letterSpacing: 0.5 }}>Explore</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Signature CTA (phase 90–100%) ────────────────────────────────────────────
function SignatureCTA({ progress, onStart }) {
  const show = mapRange(progress, 0.9, 1, 0, 1);
  if (show < 0.05) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
      paddingBottom: 24,
      zIndex: 25,
      opacity: show,
      pointerEvents: show > 0.5 ? 'auto' : 'none',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: -0.3,
          marginBottom: 10,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          Now imagine yours.
        </div>
        <button
          onClick={onStart}
          style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #087CFF, #00D5FF)',
            color: '#fff',
            border: 'none',
            borderRadius: 24,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.5,
            boxShadow: '0 4px 20px rgba(8,124,255,0.4)',
          }}
        >
          Start my website →
        </button>
      </div>
    </div>
  );
}

// ─── Main Scene Canvas ─────────────────────────────────────────────────────────
function SceneCanvas({ progress, onStart }) {
  const reduced = prefersReducedMotion();

  if (reduced) {
    // Static reduced-motion fallback
    return (
      <div style={{
        width: '100%', maxWidth: 480,
        background: '#F5F0EA',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        fontFamily: 'Georgia, serif',
      }}>
        <div style={{ padding: 24 }}>
          <div style={{ fontSize: 22, color: '#1A1A1A' }}>Spaces for <em style={{ color: '#C4A882' }}>slower living.</em></div>
          <img src={PHOTO_URL} alt="" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 6, marginTop: 12 }} />
          <button onClick={onStart} style={{ marginTop: 16, padding: '10px 24px', background: '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 24, cursor: 'pointer', fontFamily: 'sans-serif' }}>
            Start my website →
          </button>
        </div>
      </div>
    );
  }

  // Background fill: transitions from transparent (wireframe phase) to Forma Studio warm white
  const bgOpacity = mapRange(progress, 0.42, 0.52, 0, 1);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingTop: '70%', // 10:7 aspect
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: `0 ${mapRange(progress, 0, 0.3, 4, 32)}px ${mapRange(progress, 0, 0.3, 8, 80)}px rgba(0,0,0,${mapRange(progress, 0, 0.3, 0.1, 0.4)})`,
      background: '#F5F0EA',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Phase 0–45: outline + wireframe */}
        <BrowserOutline progress={progress} />
        <WireframePlaceholders progress={progress} />
        <CursorSVG progress={progress} />

        {/* Phase 45–75: Forma Studio fills in */}
        <FormaStudioSite progress={progress} />

        {/* Phase 75–90: device frames */}
        <DeviceFrames progress={progress} />

        {/* Phase 90–100: CTA */}
        <SignatureCTA progress={progress} onStart={onStart} />
      </div>
    </div>
  );
}

// ─── Scroll progress label ─────────────────────────────────────────────────────
function ProgressLabel({ progress }) {
  const labels = [
    [0, 0.2, 'Drawing the outline…'],
    [0.2, 0.45, 'Sketching the layout…'],
    [0.45, 0.75, 'The site comes to life…'],
    [0.75, 0.9, 'Desktop & mobile ready.'],
    [0.9, 1, 'Your turn.'],
  ];
  const current = labels.find(([lo, hi]) => progress >= lo && progress < hi) || labels[labels.length - 1];
  return (
    <div style={{
      fontSize: 11,
      color: '#A8B5C7',
      letterSpacing: 1,
      marginTop: 8,
      textAlign: 'center',
      minHeight: 16,
      transition: 'opacity 0.3s',
    }}>
      {current[2]}
    </div>
  );
}

// ─── Scroll-driven scene wrapper ──────────────────────────────────────────────
function ScrollScene({ onStart }) {
  const outerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const outer = outerRef.current;
    if (!outer) return;

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const viewH = window.innerHeight;
      const totalScroll = outer.offsetHeight - viewH;
      if (totalScroll <= 0) return;
      const scrolled = -rect.top;
      const p = clamp(scrolled / totalScroll, 0, 1);
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  if (reduced) {
    return (
      <section style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}>
        <SceneCanvas progress={1} onStart={onStart} />
      </section>
    );
  }

  // 500vh total — sticky inner
  return (
    <div ref={outerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        overflow: 'hidden',
      }}>
        {/* Scroll hint — fades out quickly */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          opacity: mapRange(progress, 0, 0.08, 1, 0),
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 10, color: '#A8B5C7', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll to build</span>
          <div style={{
            width: 1, height: 32, background: 'linear-gradient(to bottom, #087CFF, transparent)',
            animation: 'none',
          }} />
        </div>

        <div style={{ width: '100%', maxWidth: 520 }}>
          <SceneCanvas progress={progress} onStart={onStart} />
          <ProgressLabel progress={progress} />
        </div>
      </div>
    </div>
  );
}

// ─── Compact nav ──────────────────────────────────────────────────────────────
function PreviewNav({ onStart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s',
      background: scrolled ? 'rgba(7,17,31,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        {/* Logo */}
        <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/brand/rydentec-logo.png" alt="RydenTec" style={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(8,124,255,0.3))' }} />
        </a>

        {/* Desktop links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="preview-nav-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}
              style={{ padding: '8px 14px', fontSize: 13, color: '#A8B5C7', textDecoration: 'none', borderRadius: 8, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#A8B5C7'}
            >{l.label}</a>
          ))}
          <button onClick={onStart} style={{
            marginLeft: 8, padding: '8px 20px',
            background: 'linear-gradient(135deg, #087CFF, #00D5FF)',
            color: '#fff', border: 'none', borderRadius: 10,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(8,124,255,0.3)',
          }}>
            Start a project
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#A8B5C7', cursor: 'pointer', padding: 8 }}
          className="preview-nav-mobile-btn"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(7,17,31,0.98)', borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '8px 24px 20px',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}
              style={{ display: 'block', padding: '12px 0', fontSize: 16, color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >{l.label}</a>
          ))}
          <button onClick={onStart} style={{
            marginTop: 12, width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #087CFF, #00D5FF)',
            color: '#fff', border: 'none', borderRadius: 10,
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>
            Start a project
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero section (above fold) ────────────────────────────────────────────────
function HeroSection({ onStart }) {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: 48,
      padding: '100px 60px 60px',
      maxWidth: 1100,
      margin: '0 auto',
    }} className="preview-hero-grid">
      {/* Left: copy */}
      <div>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.1,
          letterSpacing: -1,
          marginBottom: 20,
        }}>
          From a blank page<br />
          <span style={{
            background: 'linear-gradient(135deg, #087CFF, #00D5FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            to your business online.
          </span>
        </h1>
        <p style={{ fontSize: 17, color: '#A8B5C7', lineHeight: 1.6, marginBottom: 32, maxWidth: 400 }}>
          Custom websites for businesses ready to turn visitors into customers.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={onStart} style={{
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #087CFF, #00D5FF)',
            color: '#fff', border: 'none', borderRadius: 12,
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(8,124,255,0.35)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            Start a project <ArrowRight size={16} />
          </button>
          <a href="#services" onClick={e => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              padding: '14px 24px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', borderRadius: 12,
              fontSize: 15, fontWeight: 500, cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            See our work
          </a>
        </div>

        {/* Scroll to build label */}
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 12, opacity: 0.5 }}>
          <div style={{ width: 24, height: 1, background: '#A8B5C7' }} />
          <span style={{ fontSize: 11, color: '#A8B5C7', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll to build</span>
        </div>
      </div>

      {/* Right: tiny preview of scene */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: '#F5F0EA',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          aspectRatio: '10/7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Static first-frame hint */}
          <svg width="100%" height="100%" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
            <rect x="2" y="2" width="396" height="276" rx="8" stroke="#C4A882" strokeWidth="1.5" fill="none" />
            <line x1="2" y1="38" x2="398" y2="38" stroke="#C4A882" strokeWidth="1" />
            <circle cx="18" cy="20" r="4" fill="#ff5f56" opacity={0.6} />
            <circle cx="30" cy="20" r="4" fill="#ffbd2e" opacity={0.6} />
            <circle cx="42" cy="20" r="4" fill="#27c93f" opacity={0.6} />
          </svg>
          {/* Cursor icon */}
          <svg style={{ position: 'absolute', top: '20%', left: '15%', opacity: 0.7 }} width="22" height="28" viewBox="0 0 22 28" fill="none">
            <path d="M2 2L2 22L8 16L12 26L15 24.5L11 14.5L18 14.5L2 2Z" fill="white" stroke="#222" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 10, color: '#6B6055', letterSpacing: 1 }}>↓ scroll to continue</div>
        </div>
      </div>
    </section>
  );
}

// ─── Services section ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: 'Business websites',
    desc: 'A professional presence that works for your business around the clock — built to load fast, rank well, and convert visitors.',
  },
  {
    title: 'Landing pages',
    desc: 'Focused pages built around a single goal: turning ad clicks and referrals into real inquiries and sales.',
  },
  {
    title: 'Online stores',
    desc: 'E-commerce experiences that make buying straightforward, from product discovery to checkout.',
  },
];

function ServicesSection({ onStart }) {
  return (
    <section id="services" style={{
      padding: '100px 24px',
      maxWidth: 900,
      margin: '0 auto',
    }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: -0.5 }}>
        What can we build for you?
      </h2>
      <p style={{ fontSize: 16, color: '#A8B5C7', marginBottom: 56, maxWidth: 480, lineHeight: 1.6 }}>
        Every project starts with a conversation. Here's what we do best.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
        {SERVICES.map((s, i) => (
          <div key={i} style={{
            padding: '36px 32px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{ fontSize: 11, color: '#087CFF', letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>
              0{i + 1}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: -0.3 }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 14, color: '#A8B5C7', lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Portfolio section ─────────────────────────────────────────────────────────
function PortfolioSection({ portfolio }) {
  const realProjects = portfolio.filter(p => p.liveUrl);
  const conceptProjects = portfolio.filter(p => !p.liveUrl);

  return (
    <section id="portfolio" style={{ padding: '80px 24px 100px', maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 48, letterSpacing: -0.5 }}>
        Our work
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Forma Studio concept card always shown */}
        <div style={{
          borderRadius: 12, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          background: '#0B1730',
        }}>
          <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
            <img src={PHOTO_URL} alt="Forma Studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: 10, color: '#087CFF', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Concept project</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Forma Studio</div>
            <div style={{ fontSize: 12, color: '#A8B5C7', marginTop: 4 }}>Interior Design Studio</div>
          </div>
        </div>

        {/* Real projects */}
        {realProjects.map(p => (
          <div key={p.id} style={{
            borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: '#0B1730',
          }}>
            {p.imageUrl ? (
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            ) : (
              <div style={{ aspectRatio: '16/10', background: '#101F35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: '#A8B5C7' }}>No preview</span>
              </div>
            )}
            <div style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: 10, color: '#00D5FF', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Live project</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{p.title}</div>
              <div style={{ fontSize: 12, color: '#A8B5C7', marginTop: 4, marginBottom: 12 }}>{p.type || p.category}</div>
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12, color: '#087CFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Visit site ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact / CTA section ────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" style={{
      padding: '100px 24px 120px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        color: '#fff',
        letterSpacing: -0.5,
        marginBottom: 16,
      }}>
        Let's build your website.
      </h2>
      <p style={{ fontSize: 16, color: '#A8B5C7', marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>
        Tell us about your business and we'll take it from there.
      </p>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '16px 36px',
          background: '#25D366',
          color: '#fff',
          border: 'none',
          borderRadius: 14,
          fontSize: 16,
          fontWeight: 700,
          textDecoration: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(37,211,102,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.3)'; }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Talk to Ryden
      </a>
    </section>
  );
}

// ─── Minimal footer ───────────────────────────────────────────────────────────
function PreviewFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '24px',
      textAlign: 'center',
      fontSize: 12,
      color: '#A8B5C7',
      opacity: 0.6,
    }}>
      © 2026 RydenTec — rydentec.com · rydentec.online
    </footer>
  );
}

// ─── Responsive CSS injected ──────────────────────────────────────────────────
const PREVIEW_CSS = `
  @media (max-width: 768px) {
    .preview-hero-grid {
      grid-template-columns: 1fr !important;
      padding: 90px 20px 40px !important;
      gap: 32px !important;
    }
    .preview-nav-desktop {
      display: none !important;
    }
    .preview-nav-mobile-btn {
      display: flex !important;
    }
  }
  @media (min-width: 769px) {
    .preview-nav-mobile-btn {
      display: none !important;
    }
  }
  * { box-sizing: border-box; }
`;

// ─── Root PreviewPage ─────────────────────────────────────────────────────────
export default function PreviewPage({ settings, portfolio = [] }) {
  const [currentPortfolio, setCurrentPortfolio] = useState(portfolio);

  // Inject noindex + title + styles
  useEffect(() => {
    // Title
    const prevTitle = document.title;
    document.title = 'RydenTec — Preview (Draft)';

    // noindex
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    // Responsive styles
    const style = document.createElement('style');
    style.id = 'preview-page-styles';
    style.textContent = PREVIEW_CSS;
    document.head.appendChild(style);

    // Scroll to top
    window.scrollTo(0, 0);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
      const s = document.getElementById('preview-page-styles');
      if (s) document.head.removeChild(s);
    };
  }, []);

  // Fallback: fetch portfolio if not passed
  useEffect(() => {
    if (portfolio.length === 0) {
      fetch('/api/portfolio')
        .then(r => r.json())
        .then(d => { if (d.projects) setCurrentPortfolio(d.projects); })
        .catch(() => {});
    } else {
      setCurrentPortfolio(portfolio);
    }
  }, [portfolio]);

  const whatsappNumber = settings?.whatsappNumber || '+1 (305) 890-2184';

  const handleStart = () => {
    window.open(WA_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07111F',
      color: '#fff',
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      overscrollBehavior: 'none',
    }}>
      <PreviewNav onStart={handleStart} />

      <HeroSection onStart={handleStart} />

      {/* The main scroll-driven scene */}
      <ScrollScene onStart={handleStart} />

      <ServicesSection onStart={handleStart} />

      <PortfolioSection portfolio={currentPortfolio} />

      <ContactSection />

      <PreviewFooter />
    </div>
  );
}
