/*
 * India Inclusive Summit — client application
 *
 * The page is rendered from a single JS entrypoint so that the markup, the
 * motion layer and the accessibility behaviour stay in one place. Motion is
 * progressive enhancement: the site is fully readable and navigable if GSAP
 * fails to load or the visitor prefers reduced motion.
 */

/* ------------------------------------------------------------------ *
 * Configuration
 * ------------------------------------------------------------------ */

const LOGO = 'tot_logo_bg.png';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2400&q=90',
  people: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90',
  stage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=90'
};

// Official registration form. The page links straight to it rather than
// re-collecting fields it cannot submit anywhere.
const REGISTRATION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfWJzjauPd7oB-5D2od1ztnIsNEOAvrjZ11KawpM_9_WaOQRQ/viewform';

// Pinned to an exact version and verified with Subresource Integrity so a
// compromised or swapped CDN file cannot execute on this origin.
const VENDOR_SCRIPTS = [
  {
    src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    integrity: 'sha384-g4NTh/Iv5PPU4xPyhEWqPcwtNXOvdaDI8LLnyYfyNZOjKJeYQyjzQ9X5275eBjpt'
  },
  {
    src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    integrity: 'sha384-Z3REaz79l2IaAZqJsSABtTbhjgOUYyV3p90XNnAPCSHg3EMTz1fouunq9WZRtj3d'
  }
];

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const loadScript = ({ src, integrity }) =>
  new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.integrity = integrity;
    el.crossOrigin = 'anonymous';
    el.onload = resolve;
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });

/* ------------------------------------------------------------------ *
 * Markup
 * ------------------------------------------------------------------ */

const whyCards = [
  {
    number: '01',
    label: 'THE PURPOSE',
    heading: 'Move beyond awareness.',
    body: 'Turn meaningful conversations about disability and inclusion into practical ideas, partnerships and commitments.'
  },
  {
    number: '02',
    label: 'THE PEOPLE',
    heading: 'Put lived experience at the centre.',
    body: 'People with disabilities are not an audience at the summit. They are voices, leaders, creators and contributors shaping the conversation.',
    variant: 'photo',
    image: IMAGES.people
  },
  {
    number: '03',
    label: 'THE EXPERIENCE',
    heading: 'Think. Connect. Challenge. Act.',
    body: 'Keynotes, fireside conversations, inclusive labs and immersive experiences create a journey designed to move people from intent to action.',
    variant: 'aqua'
  },
  {
    number: '04',
    label: 'THE OUTCOME',
    heading: 'Leave with something to build.',
    body: 'New perspectives, new relationships and concrete commitments that continue long after the summit ends.',
    variant: 'photo',
    image: IMAGES.stage
  }
];

const renderWhyCard = card => {
  const classes = ['', card.variant].filter(Boolean).join(' ').trim();
  const style = card.image ? ` style="--bg:url('${card.image}')"` : '';
  const overlay = card.variant === 'photo' ? '<div aria-hidden="true"></div>' : '';
  return `
    <article${classes ? ` class="${classes}"` : ''}${style}>
      ${overlay}
      <b aria-hidden="true">${card.number}</b>
      <small>${card.label}</small>
      <h3>${card.heading}</h3>
      <p>${card.body}</p>
    </article>`;
};

const experienceStrip = [
  'KEYNOTES',
  'FIRESIDE CONVERSATIONS',
  'INCLUSIVE LABS',
  'IMMERSIVE EXPERIENCES',
  'RECOGNITION'
];

const template = `
<a class="skip-link" href="#main">Skip to main content</a>

<div class="loader" id="loader" aria-hidden="true">
  <div>
    <img src="${LOGO}" alt="">
    <strong>PRESENTS</strong>
    <h2>INDIA <i>INCLUSIVE</i><br>SUMMIT</h2>
    <span></span>
  </div>
</div>

<div class="cursor" aria-hidden="true"></div>
<div class="progress" aria-hidden="true"></div>

<header>
  <a class="logo" href="#home">
    <img src="${LOGO}" alt="Triumphs of Talent">
    <span class="presents">PRESENTS</span>
    <b>INDIA INCLUSIVE SUMMIT</b>
  </a>
  <button class="menu" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
    <span aria-hidden="true">&#9776;</span>
  </button>
  <nav id="site-nav" aria-label="Primary">
    <a href="#home">Home</a>
    <a href="#why">Why the Summit</a>
    <a href="#register" class="cta">Register your interest</a>
  </nav>
</header>

<main id="main" tabindex="-1">
  <section class="home" id="home" aria-labelledby="home-title">
    <img src="${IMAGES.hero}" alt="" role="presentation">
    <div class="shade" aria-hidden="true"></div>
    <div class="home-copy">
      <small>TRIUMPHS OF TALENT PRESENTS</small>
      <h1 id="home-title">India <em>Inclusive</em><br>Summit.</h1>
      <p>Breaking barriers. Building pathways. A national platform bringing lived experience, business leadership, policy and innovation together to create a more inclusive India.</p>
      <div class="actions">
        <a class="btn primary" href="#register">Register your interest <span aria-hidden="true">&#8599;</span></a>
        <a class="btn" href="#why">Discover the summit <span aria-hidden="true">&#8595;</span></a>
      </div>
    </div>
    <div class="home-bottom" aria-hidden="true">
      <span>INCLUSION / ACCESS / OPPORTUNITY</span>
      <span>SCROLL TO EXPLORE &#8595;</span>
    </div>
  </section>

  <section class="why" id="why" aria-labelledby="why-title">
    <div class="why-intro reveal">
      <div>
        <small>02 / WHY THE SUMMIT</small>
        <h2 id="why-title">Inclusion is not<br>a conversation.<br><em>It is action.</em></h2>
      </div>
      <p>India has extraordinary talent. Yet opportunity is still shaped by barriers in access, employment, technology and everyday participation. India Inclusive Summit brings the people who experience those barriers together with the people who can remove them.</p>
    </div>

    <div class="why-scroll" role="region" aria-label="Why the summit matters" tabindex="0">
      <div class="why-track">
        ${whyCards.map(renderWhyCard).join('')}
      </div>
    </div>

    <ul class="experience-strip">
      ${experienceStrip.map(item => `<li>${item}</li>`).join('')}
    </ul>
  </section>

  <section class="register" id="register" aria-labelledby="register-title">
    <div class="register-image" aria-hidden="true"></div>
    <div class="register-panel reveal">
      <small>03 / REGISTER YOUR INTEREST</small>
      <h2 id="register-title">Be part of the<br><em>change.</em></h2>
      <p>Register your interest to receive official summit announcements, participation updates and registration details from Triumphs of Talent.</p>
      <p class="register-note">Registration is handled on the official Triumphs of Talent form, which asks for your name, email address and phone number.</p>
      <a class="btn primary register-cta" href="${REGISTRATION_URL}" target="_blank" rel="noopener noreferrer">
        Open the registration form
        <span aria-hidden="true">&#8599;</span>
        <span class="visually-hidden">(opens in a new tab)</span>
      </a>
    </div>
  </section>
</main>

<footer>
  <div>
    <img src="${LOGO}" alt="Triumphs of Talent">
    <span>presents</span>
    <b>India Inclusive Summit</b>
  </div>
  <span>&copy; ${new Date().getFullYear()} Triumphs of Talent</span>
</footer>`;

document.querySelector('#app').innerHTML = template;

/* ------------------------------------------------------------------ *
 * Baseline behaviour — always runs, no dependencies
 * ------------------------------------------------------------------ */

const loader = document.querySelector('#loader');

const dismissLoader = () => {
  if (!loader || !loader.isConnected) return;
  loader.classList.add('loaded');
  window.setTimeout(() => loader.remove(), 900);
};

// Safety net: the loader never outlives this timeout, whatever else fails.
window.setTimeout(dismissLoader, 2200);

function setupNavigation() {
  const nav = document.querySelector('#site-nav');
  const toggle = document.querySelector('.menu');
  if (!nav || !toggle) return;

  const setOpen = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// Reveal-on-scroll that does not depend on GSAP.
function setupReveals() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver(
    entries =>
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }),
    { threshold: 0.12 }
  );
  targets.forEach(el => observer.observe(el));
}

setupNavigation();
setupReveals();

/* ------------------------------------------------------------------ *
 * Motion layer — progressive enhancement
 * ------------------------------------------------------------------ */

function setupProgressBar() {
  const bar = document.querySelector('.progress');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function setupCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  window.addEventListener('pointermove', event => {
    window.gsap.to('.cursor', { x: event.clientX, y: event.clientY, duration: 0.3 });
  });
}

function setupMagneticButtons() {
  window.gsap.utils.toArray('.btn').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      window.gsap.to(button, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.08,
        y: (event.clientY - rect.top - rect.height / 2) * 0.08,
        duration: 0.2
      });
    });
    button.addEventListener('pointerleave', () => {
      window.gsap.to(button, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// Horizontal pinned scroll for the "Why" section. Only applies on wide
// viewports; narrow screens and reduced-motion users get a vertical stack,
// which the stylesheet handles.
function createHorizontalScroll() {
  const pin = document.querySelector('.why-scroll');
  const track = document.querySelector('.why-track');
  let tween = null;

  const build = () => {
    if (!pin || !track || window.innerWidth <= 760) return null;
    const distance = Math.max(0, track.scrollWidth - window.innerWidth);
    pin.style.height = `${window.innerHeight + distance}px`;
    tween = window.gsap.to(track, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: `+=${distance}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.15,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    return tween;
  };

  const rebuild = () => {
    window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (tween) {
      tween.kill();
      tween = null;
    }
    window.gsap.set(track, { clearProps: 'transform' });
    if (pin) pin.style.height = '';
    build();
    window.ScrollTrigger.refresh();
  };

  build();
  return { get tween() { return tween; }, rebuild };
}

function setupSectionAnimations(horizontal) {
  const { gsap } = window;

  gsap.from('.home-copy > *', {
    y: 70,
    opacity: 0,
    stagger: 0.1,
    duration: 0.9,
    delay: 0.75,
    ease: 'power4.out'
  });

  gsap.to('.home img', {
    scale: 1.15,
    yPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '.home', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.from('.why-intro', {
    y: 80,
    opacity: 0,
    scrollTrigger: { trigger: '.why-intro', start: 'top 80%', once: true }
  });

  gsap.utils.toArray('.why-track article').forEach(card => {
    gsap.from(card, {
      scale: 0.94,
      opacity: 0.55,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        containerAnimation: horizontal.tween || undefined
      }
    });
  });

  gsap.from('.experience-strip li', {
    y: 30,
    opacity: 0,
    stagger: 0.08,
    scrollTrigger: { trigger: '.experience-strip', start: 'top 85%', once: true }
  });

  gsap.from('.register-panel', {
    y: 80,
    opacity: 0,
    scale: 0.96,
    scrollTrigger: { trigger: '.register-panel', start: 'top 80%', once: true }
  });
}

async function initMotion() {
  setupProgressBar();

  if (prefersReducedMotion()) {
    dismissLoader();
    return;
  }

  try {
    // Loaded in order: ScrollTrigger expects gsap to already exist.
    for (const script of VENDOR_SCRIPTS) {
      await loadScript(script);
    }
  } catch (error) {
    // The site is fully usable without the motion layer.
    dismissLoader();
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Switches the "Why" section from its stacked fallback layout to the pinned
  // horizontal track. Set before measuring, so scrollWidth reflects the flex
  // layout the pinned scroll is about to be built from.
  document.documentElement.classList.add('motion-ready');

  gsap.to(loader, {
    yPercent: -100,
    duration: 1.05,
    delay: 0.55,
    ease: 'power4.inOut',
    onComplete: dismissLoader
  });

  const horizontal = createHorizontalScroll();
  setupSectionAnimations(horizontal);
  setupCursor();
  setupMagneticButtons();

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => horizontal.rebuild(), 150);
  });

  window.setTimeout(() => ScrollTrigger.refresh(), 300);
}

initMotion();
