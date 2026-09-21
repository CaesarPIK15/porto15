/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT LOGIC (Vanilla JS)
 * Developer: Caesar Arkan Athariz (Junior AI Web Engineer)
 * Institution: SMKN 1 Probolinggo
 * Concept: Modern • Clean • Minimalist • Professional • Smooth • Responsive
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DOM Elements Cache
  // ------------------------------------------------------------------------
  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const currentYearSpan = document.getElementById('current-year');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const revealElements = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section[id], header[id="hero"]');

  // ------------------------------------------------------------------------
  // 2. Dynamic Year Update
  // ------------------------------------------------------------------------
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 3. Theme Management (Celestial Dark / Light Mode with Spectacular FX)
  // ------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'caa_portfolio_theme';

  /**
   * Web Audio API Synthesizer for High-Tech Celestial Micro-Chime
   */
  let themeAudioCtx = null;

  const initThemeAudio = () => {
    if (!themeAudioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      themeAudioCtx = new AudioContextClass();
    }
    if (themeAudioCtx && themeAudioCtx.state === 'suspended') {
      themeAudioCtx.resume().catch(() => {});
    }
  };

  const playThemeChime = (theme) => {
    try {
      initThemeAudio();
      if (!themeAudioCtx) return;

      const now = themeAudioCtx.currentTime;
      const masterGain = themeAudioCtx.createGain();
      // Gentle, pleasant, non-intrusive volume
      masterGain.gain.setValueAtTime(0.05, now);
      masterGain.connect(themeAudioCtx.destination);

      if (theme === 'light') {
        // "Dawn / Sunrise" Arpeggio (Warm, Rising, Bright: C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = themeAudioCtx.createOscillator();
          const noteGain = themeAudioCtx.createGain();
          const filter = themeAudioCtx.createBiquadFilter();
          const startTime = now + idx * 0.05;
          const duration = 0.35;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2800, startTime);

          noteGain.gain.setValueAtTime(0, startTime);
          noteGain.gain.linearRampToValueAtTime(0.6, startTime + 0.012);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(startTime);
          osc.stop(startTime + duration);
        });
      } else {
        // "Twilight / Dusk" Resonant Chime (Ethereal, Descending Cosmic: A5 -> E5 -> C5 -> G4)
        const notes = [880.0, 659.25, 523.25, 392.0];
        notes.forEach((freq, idx) => {
          const osc = themeAudioCtx.createOscillator();
          const noteGain = themeAudioCtx.createGain();
          const filter = themeAudioCtx.createBiquadFilter();
          const startTime = now + idx * 0.06;
          const duration = 0.52;

          osc.type = idx === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1900, startTime);

          noteGain.gain.setValueAtTime(0, startTime);
          noteGain.gain.linearRampToValueAtTime(0.55, startTime + 0.015);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(startTime);
          osc.stop(startTime + duration);
        });
      }
    } catch (e) {
      // Audio autoplay policy or device restriction fallback; fail silently
    }
  };

  /**
   * Spawns Celestial Particle Sparks & Stars at button coordinate
   */
  const spawnThemeParticles = (originX, originY, nextTheme) => {
    const container = document.getElementById('theme-particles-container') || document.body;
    const particleCount = 18;
    const isLight = nextTheme === 'light';

    // Rich color palette matching the mood
    const lightPalette = ['#f59e0b', '#fbbf24', '#fef08a', '#fb7185', '#ffffff', '#38bdf8'];
    const darkPalette = ['#38bdf8', '#818cf8', '#a78bfa', '#c084fc', '#ffffff', '#34d399'];
    const palette = isLight ? lightPalette : darkPalette;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'theme-particle';

      // Alternating shapes (circles & 5-point stars)
      const isStar = i % 3 === 0;
      if (isStar) {
        particle.classList.add('shape-star');
      }

      const angle = (i / particleCount) * 2 * Math.PI + (Math.random() * 0.35 - 0.175);
      const distance = 40 + Math.random() * 85;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rot = `${Math.floor(Math.random() * 540 - 270)}deg`;
      const size = isStar ? 7 + Math.random() * 5 : 4 + Math.random() * 5;
      const color = palette[Math.floor(Math.random() * palette.length)];

      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      particle.style.setProperty('--rot', rot);
      particle.style.boxShadow = `0 0 ${size * 1.6}px ${color}`;

      container.appendChild(particle);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  };

  /**
   * Spawns Expanding Energetic Shockwave Ring
   */
  const triggerThemeShockwave = (originX, originY) => {
    const shockwave = document.createElement('div');
    shockwave.className = 'theme-shockwave-ring';
    const maxDimension = Math.max(window.innerWidth, window.innerHeight) * 0.45;
    shockwave.style.left = `${originX}px`;
    shockwave.style.top = `${originY}px`;
    shockwave.style.width = `${maxDimension}px`;
    shockwave.style.height = `${maxDimension}px`;

    document.body.appendChild(shockwave);
    shockwave.addEventListener('animationend', () => {
      shockwave.remove();
    });
  };

  /**
   * Floating Status HUD Toast Notification
   */
  let toastTimer = null;
  const showThemeToast = (theme) => {
    const toast = document.getElementById('theme-toast');
    if (!toast) return;

    const isLight = theme === 'light';
    const icon = isLight ? '☀️' : '🌙';
    const text = isLight ? 'Mode Terang Diaktifkan' : 'Mode Gelap Diaktifkan';

    toast.innerHTML = `
      <span class="theme-toast-icon">${icon}</span>
      <span class="theme-toast-text">${text}</span>
    `;

    toast.classList.add('is-visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2200);
  };

  /**
   * Determine initial theme from localStorage or OS preference
   */
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  };

  /**
   * Apply selected theme with aria accessibility sync
   */
  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'
      );
    }
  };

  /**
   * Execute Theme Toggle with View Transition Circular Ripple & Multi-layered FX
   */
  const executeThemeToggle = (e) => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Calculate exact button center or pointer coordinates
    let originX, originY;
    if (e && typeof e.clientX === 'number' && (e.clientX !== 0 || e.clientY !== 0)) {
      originX = e.clientX;
      originY = e.clientY;
    } else if (themeToggleBtn) {
      const rect = themeToggleBtn.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    } else {
      originX = window.innerWidth / 2;
      originY = window.innerHeight / 2;
    }

    // Trigger visual & audio micro-interactions
    playThemeChime(nextTheme);
    spawnThemeParticles(originX, originY, nextTheme);
    triggerThemeShockwave(originX, originY);
    showThemeToast(nextTheme);

    // Trigger celebration shooting star across the sky
    if (typeof window.spawnShootingStar === 'function') {
      window.spawnShootingStar(true);
    }

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // View Transitions API with circular clip-path ripple
    if (document.startViewTransition && !prefersReducedMotion) {
      const endRadius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY)
      );

      const transition = document.startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${originX}px ${originY}px)`,
              `circle(${endRadius}px at ${originX}px ${originY}px)`
            ]
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      }).catch(() => {
        // Fallback in case of animation error
        applyTheme(nextTheme);
      });
    } else {
      // Fallback smooth transition
      applyTheme(nextTheme);
    }
  };

  // Initialize theme on initial load
  applyTheme(getInitialTheme());

  // Listen to toggle button clicks
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      executeThemeToggle(e);
    });
  }

  // ------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer
  // ------------------------------------------------------------------------
  let isMenuOpen = false;

  const toggleMobileMenu = (open) => {
    isMenuOpen = typeof open === 'boolean' ? open : !isMenuOpen;
    mobileMenuBtn.classList.toggle('is-active', isMenuOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen ? 'true' : 'false');
    mobileMenu.classList.toggle('is-open', isMenuOpen);
    mobileMenu.setAttribute('aria-hidden', isMenuOpen ? 'false' : 'true');

    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.toggle('is-open', isMenuOpen);
      mobileMenuOverlay.setAttribute('aria-hidden', isMenuOpen ? 'false' : 'true');
    }

    // Prevent background scrolling when drawer is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  };

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());

    // Close on mobile menu overlay backdrop click
    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener('click', () => {
        if (isMenuOpen) toggleMobileMenu(false);
      });
    }

    // Close on mobile nav link click and navigate smoothly
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            if (isMenuOpen) toggleMobileMenu(false);
            targetEl.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', targetId);
          } else if (isMenuOpen) {
            toggleMobileMenu(false);
          }
        } else if (isMenuOpen) {
          toggleMobileMenu(false);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu(false);
      }
    });

    // Close on window resize if transitioned to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMobileMenu(false);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. Active Navigation Indicator on Scroll (Scroll Spy)
  // ------------------------------------------------------------------------
  const observedSections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = (activeId) => {
    // Update Desktop Nav
    desktopNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Mobile Nav
    mobileNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateActiveNavLink(entry.target.getAttribute('id'));
          }
        });
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: 0
      }
    );

    observedSections.forEach((sec) => sectionObserver.observe(sec));
  } else {
    // Fallback scroll listener
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      observedSections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          updateActiveNavLink(id);
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. Scroll Reveal Animations (Subtle & Lightweight)
  // ------------------------------------------------------------------------
  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: immediately show all elements
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ------------------------------------------------------------------------
  // 7. Scroll To Top Button
  // ------------------------------------------------------------------------
  if (scrollTopBtn) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 340) {
            scrollTopBtn.classList.add('is-visible');
          } else {
            scrollTopBtn.classList.remove('is-visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. Contact Form Validation & Mailto Action (Pure Frontend)
  // ------------------------------------------------------------------------
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    /**
     * Regex check for valid email format
     */
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    };

    /**
     * Validate single field
     */
    const validateField = (input, errorEl, condition, defaultText) => {
      if (!condition) {
        input.classList.add('is-invalid');
        errorEl.classList.add('visible');
        if (defaultText) errorEl.textContent = defaultText;
        return false;
      } else {
        input.classList.remove('is-invalid');
        errorEl.classList.remove('visible');
        return true;
      }
    };

    // Real-time input validation listeners
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('is-invalid')) {
        validateField(nameInput, nameError, nameInput.value.trim().length >= 2);
      }
    });

    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('is-invalid')) {
        validateField(emailInput, emailError, isValidEmail(emailInput.value));
      }
    });

    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('is-invalid')) {
        validateField(messageInput, messageError, messageInput.value.trim().length >= 10);
      }
    });

    // Form submission handler
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset general status
      formStatus.style.display = 'none';
      formStatus.className = 'form-status-alert';

      const isNameValid = validateField(
        nameInput,
        nameError,
        nameInput.value.trim().length >= 2,
        'Harap masukkan nama lengkap Anda (minimal 2 karakter).'
      );

      const isEmailValid = validateField(
        emailInput,
        emailError,
        isValidEmail(emailInput.value),
        'Harap masukkan alamat email yang valid (contoh: nama@domain.com).'
      );

      const isMessageValid = validateField(
        messageInput,
        messageError,
        messageInput.value.trim().length >= 10,
        'Pesan tidak boleh kosong dan harus berisi minimal 10 karakter.'
      );

      if (isNameValid && isEmailValid && isMessageValid) {
        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const msgVal = messageInput.value.trim();

        // Construct standard mailto parameters
        const mailSubject = encodeURIComponent(`Pesan Portfolio dari ${nameVal}`);
        const mailBody = encodeURIComponent(
          `Halo Caesar Arkan,\n\nNama Pengirim: ${nameVal}\nEmail: ${emailVal}\n\nPesan:\n${msgVal}\n\n---\nDikirim via Portfolio Website Caesar Arkan Athariz`
        );
        const mailtoUrl = `mailto:caesarghani270@gmail.com?subject=${mailSubject}&body=${mailBody}`;

        // Feedback to user: pure client-side friendly notification
        formStatus.innerHTML = `
          <strong>Pesan Berhasil Divalidasi!</strong><br>
          Membuka aplikasi email default Anda... Jika tidak terbuka otomatis, Anda dapat mengklik tombol di bawah:<br>
          <a href="${mailtoUrl}" class="btn btn-secondary btn-sm" style="margin-top: 8px; display: inline-flex;">Kirim Sekarang via Email</a>
        `;
        formStatus.classList.add('success');
        formStatus.style.display = 'block';

        // Attempt to trigger mailto
        window.location.href = mailtoUrl;

        // Reset form inputs after brief delay
        setTimeout(() => {
          contactForm.reset();
        }, 1500);
      } else {
        formStatus.textContent = 'Harap periksa kembali isian formulir yang ditandai merah.';
        formStatus.classList.add('error');
        formStatus.style.display = 'block';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. Full Celestial Ambient Universe & Meteor Canvas Engine (Light & Dark)
  // ------------------------------------------------------------------------
  const initCelestialUniverse = () => {
    const canvas = document.getElementById('meteor-canvas');
    const mouseGlow = document.getElementById('mouse-glow');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let meteors = [];
    let ambientStars = [];
    let animationId = null;
    let isRunning = true;
    let nextSpawnTime = Date.now() + 800;

    // Mouse coordinates tracking with smooth damping
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    window.addEventListener('pointermove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.active) {
        mouse.active = true;
        if (mouseGlow) mouseGlow.classList.add('is-active');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      if (mouseGlow) mouseGlow.classList.remove('is-active');
    });

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initAmbientStars();
    };

    // Ambient floating stars / sunlight motes class
    class AmbientStar {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -10;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = 0.15 + Math.random() * 0.35; // gentle downward drift
        this.size = 0.9 + Math.random() * 1.8;
        this.baseAlpha = 0.2 + Math.random() * 0.55;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = 0.015 + Math.random() * 0.03;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.vx;
        this.y += this.vy;

        // Twinkle oscillation
        this.alpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * (this.baseAlpha * 0.45);

        // Wrap around boundaries
        if (this.y > height + 10) this.y = -10;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (isDark) {
          // Dark Mode: Soft Cyan & Diamond White Motes
          ctx.fillStyle = `rgba(186, 230, 253, ${this.alpha})`;
        } else {
          // Light Mode: Warm Amber Solar Dust & Sunlight Prisms
          ctx.fillStyle = `rgba(245, 158, 11, ${this.alpha * 0.75})`;
        }
        ctx.fill();
      }
    }

    const initAmbientStars = () => {
      // Responsive star count: 28 on mobile, 48 on desktop
      const count = width < 768 ? 28 : 48;
      ambientStars = [];
      for (let i = 0; i < count; i++) {
        ambientStars.push(new AmbientStar());
      }
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    class Meteor {
      constructor(isCelebration = false) {
        this.reset(isCelebration);
      }

      reset(isCelebration = false) {
        const isDark = htmlRoot.getAttribute('data-theme') !== 'light';
        this.isDark = isDark;

        this.angle = (34 + Math.random() * 8) * (Math.PI / 180);
        this.speed = 13 + Math.random() * 9;
        this.length = 110 + Math.random() * 90;
        this.size = 1.6 + Math.random() * 1.3;

        this.dx = -Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;

        if (isCelebration) {
          this.x = width * 0.75 + (Math.random() * 150 - 75);
          this.y = Math.random() * 60;
        } else {
          this.x = Math.random() * (width * 0.65) + (width * 0.35);
          this.y = Math.random() * -80 - 20;
        }

        this.alpha = 0;
        this.maxAlpha = isDark ? (0.85 + Math.random() * 0.15) : (0.7 + Math.random() * 0.2);
        this.life = 0;
        this.maxLife = 45 + Math.random() * 25;
        this.sparks = [];
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.life++;

        if (this.life < 7) {
          this.alpha = (this.life / 7) * this.maxAlpha;
        } else if (this.life > this.maxLife - 14) {
          this.alpha = Math.max(0, ((this.maxLife - this.life) / 14) * this.maxAlpha);
        } else {
          this.alpha = this.maxAlpha;
        }

        if (Math.random() < 0.45 && this.alpha > 0.25) {
          this.sparks.push({
            x: this.x + (Math.random() * 8 - 4),
            y: this.y + (Math.random() * 8 - 4),
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            size: 0.8 + Math.random() * 1.2,
            alpha: this.alpha * 0.75,
            decay: 0.04 + Math.random() * 0.03
          });
        }

        for (let i = this.sparks.length - 1; i >= 0; i--) {
          const sp = this.sparks[i];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.alpha -= sp.decay;
          if (sp.alpha <= 0) {
            this.sparks.splice(i, 1);
          }
        }

        return (
          this.life < this.maxLife &&
          this.x > -150 &&
          this.y < height + 150 &&
          (this.alpha > 0 || this.sparks.length > 0)
        );
      }

      draw() {
        const tailX = this.x - this.dx * (this.length / this.speed);
        const tailY = this.y - this.dy * (this.length / this.speed);

        const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        if (this.isDark) {
          grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
          grad.addColorStop(0.15, `rgba(56, 189, 248, ${this.alpha * 0.9})`);
          grad.addColorStop(0.55, `rgba(129, 140, 248, ${this.alpha * 0.45})`);
          grad.addColorStop(1, `rgba(129, 140, 248, 0)`);
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
          grad.addColorStop(0.18, `rgba(245, 158, 11, ${this.alpha * 0.85})`);
          grad.addColorStop(0.55, `rgba(56, 189, 248, ${this.alpha * 0.35})`);
          grad.addColorStop(1, `rgba(56, 189, 248, 0)`);
        }

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.shadowBlur = this.isDark ? 10 : 8;
        ctx.shadowColor = this.isDark
          ? `rgba(56, 189, 248, ${this.alpha})`
          : `rgba(245, 158, 11, ${this.alpha * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (const sp of this.sparks) {
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fillStyle = this.isDark
            ? `rgba(125, 211, 252, ${sp.alpha})`
            : `rgba(251, 191, 36, ${sp.alpha})`;
          ctx.fill();
        }
      }
    }

    const triggerMeteor = (isCelebration = false) => {
      if (meteors.length < 3) {
        meteors.push(new Meteor(isCelebration));
      }
    };

    window.spawnShootingStar = triggerMeteor;

    let frameCount = 0;
    const render = () => {
      if (!isRunning) return;
      frameCount++;

      ctx.clearRect(0, 0, width, height);
      const isDark = htmlRoot.getAttribute('data-theme') !== 'light';

      // Update Mouse Follower DOM position with smooth interpolation
      if (mouseGlow && mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
        mouseGlow.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      // Render Ambient Stars & Constellations
      const starLen = ambientStars.length;
      for (let i = 0; i < starLen; i++) {
        const s1 = ambientStars[i];
        s1.update(frameCount);
        s1.draw(isDark);

        // Constellation lines between nearby stars
        for (let j = i + 1; j < starLen; j++) {
          const s2 = ambientStars[j];
          const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * (isDark ? 0.12 : 0.08);
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Interactive constellation line to mouse
        if (mouse.active) {
          const mouseDist = Math.hypot(s1.x - mouse.x, s1.y - mouse.y);
          if (mouseDist < 120) {
            const mouseLineAlpha = (1 - mouseDist / 120) * (isDark ? 0.22 : 0.14);
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(129, 140, 248, ${mouseLineAlpha})`
              : `rgba(245, 158, 11, ${mouseLineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Spawn meteors periodically
      const now = Date.now();
      if (now > nextSpawnTime) {
        triggerMeteor();
        if (Math.random() < 0.2) {
          setTimeout(() => triggerMeteor(), 220 + Math.random() * 180);
        }
        nextSpawnTime = now + (2400 + Math.random() * 3400);
      }

      // Render meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const alive = m.update();
        if (alive) {
          m.draw();
        } else {
          meteors.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isRunning = false;
        if (animationId) cancelAnimationFrame(animationId);
      } else {
        isRunning = true;
        render();
      }
    });

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      render();
    }
  };

  initCelestialUniverse();

  // ------------------------------------------------------------------------
  // 11. Interactive Projects Modal System
  // ------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectCategory = document.getElementById('modal-project-category');
  const projectLaunchButtons = document.querySelectorAll('.btn-open-project');

  const appContainers = {
    calculator: document.getElementById('app-calculator'),
    login: document.getElementById('app-login'),
    absensi: document.getElementById('app-absensi')
  };

  const projectMeta = {
    calculator: {
      title: 'Kalkulator Digital Modern',
      category: 'Aplikasi Utilitas'
    },
    login: {
      title: 'Sistem Autentikasi & Tampilan Login',
      category: 'Auth UI/UX'
    },
    absensi: {
      title: 'Sistem Absensi Digital Siswa & Tim',
      category: 'Sistem Manajemen'
    }
  };

  let activeProject = null;

  const openProjectModal = (projectId) => {
    if (!appContainers[projectId]) return;
    activeProject = projectId;

    // Set meta headers
    if (modalProjectTitle && projectMeta[projectId]) {
      modalProjectTitle.textContent = projectMeta[projectId].title;
    }
    if (modalProjectCategory && projectMeta[projectId]) {
      modalProjectCategory.textContent = projectMeta[projectId].category;
    }

    // Toggle container display
    Object.keys(appContainers).forEach(key => {
      if (appContainers[key]) {
        appContainers[key].style.display = key === projectId ? 'block' : 'none';
      }
    });

    // Open modal
    if (modalBackdrop) {
      modalBackdrop.classList.add('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    // Refresh specific app views
    if (projectId === 'absensi') {
      renderAbsensiTable();
    }
  };

  const closeProjectModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
    activeProject = null;
  };

  // Attach launch buttons
  projectLaunchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetProject = btn.getAttribute('data-project');
      if (targetProject) {
        openProjectModal(targetProject);
      }
    });
  });

  // Modal close handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      closeProjectModal();
    }
  });

  // ------------------------------------------------------------------------
  // 12. App 1: Kalkulator Digital Modern Logic
  // ------------------------------------------------------------------------
  const calcDisplay = document.getElementById('calc-display');
  const calcExpr = document.getElementById('calc-expr');
  const calcKeypad = document.getElementById('calc-keypad');
  const calcHistoryList = document.getElementById('calc-history-list');
  const calcClearHistoryBtn = document.getElementById('calc-clear-history-btn');

  let calcCurrentVal = '0';
  let calcPrevVal = null;
  let calcOp = null;
  let calcResetNext = false;
  let calcHistory = [];

  const updateCalcScreen = () => {
    if (calcDisplay) {
      calcDisplay.textContent = calcCurrentVal;
    }
    if (calcExpr) {
      if (calcPrevVal !== null && calcOp !== null) {
        calcExpr.textContent = `${calcPrevVal} ${calcOp}`;
      } else {
        calcExpr.innerHTML = '&nbsp;';
      }
    }
  };

  const inputDigit = (digit) => {
    if (calcResetNext) {
      calcCurrentVal = digit === '.' ? '0.' : digit;
      calcResetNext = false;
    } else {
      if (digit === '.') {
        if (!calcCurrentVal.includes('.')) {
          calcCurrentVal += '.';
        }
      } else {
        calcCurrentVal = calcCurrentVal === '0' ? digit : calcCurrentVal + digit;
      }
    }
    updateCalcScreen();
  };

  const executeCalculation = (first, second, op) => {
    let res = 0;
    switch (op) {
      case '+': res = first + second; break;
      case '−':
      case '-': res = first - second; break;
      case '×':
      case '*': res = first * second; break;
      case '÷':
      case '/':
        if (second === 0) return 'Error';
        res = first / second;
        break;
      default: return second;
    }
    return Math.round(res * 100000000) / 100000000;
  };

  const handleOperator = (nextOp) => {
    const inputNum = parseFloat(calcCurrentVal);

    if (calcOp && calcResetNext) {
      calcOp = nextOp;
      updateCalcScreen();
      return;
    }

    if (calcPrevVal === null) {
      calcPrevVal = calcCurrentVal;
    } else if (calcOp) {
      const prevNum = parseFloat(calcPrevVal);
      const result = executeCalculation(prevNum, inputNum, calcOp);
      calcCurrentVal = `${result}`;
      calcPrevVal = `${result}`;
    }

    calcResetNext = true;
    calcOp = nextOp;
    updateCalcScreen();
  };

  const renderCalcHistory = () => {
    if (!calcHistoryList) return;
    if (calcHistory.length === 0) {
      calcHistoryList.innerHTML = '<div class="calc-history-empty">Belum ada riwayat perhitungan. Lakukan perhitungan untuk melihat riwayat di sini.</div>';
      return;
    }

    calcHistoryList.innerHTML = calcHistory.map(item => `
      <div class="calc-history-item" data-res="${item.result}">
        <div class="calc-item-expr">${item.expr}</div>
        <div class="calc-item-res">${item.result}</div>
      </div>
    `).join('');

    calcHistoryList.querySelectorAll('.calc-history-item').forEach(item => {
      item.addEventListener('click', () => {
        const val = item.getAttribute('data-res');
        if (val !== null) {
          calcCurrentVal = val;
          calcResetNext = false;
          updateCalcScreen();
        }
      });
    });
  };

  const handleEquals = () => {
    if (calcOp === null || calcPrevVal === null) return;
    const first = parseFloat(calcPrevVal);
    const second = parseFloat(calcCurrentVal);
    const res = executeCalculation(first, second, calcOp);

    const fullExpr = `${calcPrevVal} ${calcOp} ${calcCurrentVal} =`;
    calcHistory.unshift({ expr: fullExpr, result: res });
    if (calcHistory.length > 15) calcHistory.pop();
    renderCalcHistory();

    if (calcExpr) calcExpr.textContent = fullExpr;
    calcCurrentVal = `${res}`;
    if (calcDisplay) calcDisplay.textContent = calcCurrentVal;

    calcPrevVal = null;
    calcOp = null;
    calcResetNext = true;
  };

  if (calcClearHistoryBtn) {
    calcClearHistoryBtn.addEventListener('click', () => {
      calcHistory = [];
      renderCalcHistory();
    });
  }

  const handleCalcAction = (action) => {
    switch (action) {
      case 'ac':
        calcCurrentVal = '0';
        calcPrevVal = null;
        calcOp = null;
        calcResetNext = false;
        updateCalcScreen();
        break;
      case 'del':
        if (calcResetNext) {
          calcCurrentVal = '0';
          calcResetNext = false;
        } else {
          calcCurrentVal = calcCurrentVal.length > 1 ? calcCurrentVal.slice(0, -1) : '0';
        }
        updateCalcScreen();
        break;
      case 'percent':
        calcCurrentVal = `${parseFloat(calcCurrentVal) / 100}`;
        updateCalcScreen();
        break;
      case 'negate':
        calcCurrentVal = `${parseFloat(calcCurrentVal) * -1}`;
        updateCalcScreen();
        break;
      case 'equals':
        handleEquals();
        break;
    }
  };

  if (calcKeypad) {
    calcKeypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.calc-btn');
      if (!btn) return;

      const calcData = btn.getAttribute('data-calc');
      if (!calcData) return;

      if (!isNaN(calcData) || calcData === '.') {
        inputDigit(calcData);
      } else if (['+', '-', '*', '/'].includes(calcData)) {
        const opSymbol = calcData === '*' ? '×' : (calcData === '/' ? '÷' : (calcData === '-' ? '−' : '+'));
        handleOperator(opSymbol);
      } else {
        handleCalcAction(calcData);
      }
    });
  }

  // Keyboard support for calculator
  document.addEventListener('keydown', (e) => {
    if (!modalBackdrop || !modalBackdrop.classList.contains('is-open') || activeProject !== 'calculator') {
      return;
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (!isNaN(e.key) || e.key === '.') {
      inputDigit(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      const opSymbol = e.key === '*' ? '×' : (e.key === '/' ? '÷' : (e.key === '-' ? '−' : '+'));
      handleOperator(opSymbol);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      handleEquals();
    } else if (e.key === 'Backspace') {
      handleCalcAction('del');
    }
  });

  // ------------------------------------------------------------------------
  // 13. App 2: Sistem Tampilan Login & Autentikasi Logic
  // ------------------------------------------------------------------------
  const authTabLoginBtn = document.getElementById('auth-tab-login-btn');
  const authTabRegisterBtn = document.getElementById('auth-tab-register-btn');
  const authLoginPane = document.getElementById('auth-login-pane');
  const authRegisterPane = document.getElementById('auth-register-pane');
  const authFormsWrapper = document.getElementById('auth-forms-wrapper');
  const authDashboardView = document.getElementById('auth-dashboard-view');
  const formAuthLogin = document.getElementById('form-auth-login');
  const formAuthRegister = document.getElementById('form-auth-register');
  const loginFeedback = document.getElementById('login-feedback');
  const regFeedback = document.getElementById('reg-feedback');
  const authLogoutBtn = document.getElementById('auth-logout-btn');
  const authForgotBtn = document.getElementById('auth-forgot-btn');
  const regPasswordInput = document.getElementById('reg-password');
  const regPwStrengthBar = document.getElementById('reg-pw-strength-bar');
  const regPwStrengthText = document.getElementById('reg-pw-strength-text');

  // Tab switching
  const switchAuthTab = (tab) => {
    if (tab === 'login') {
      if (authTabLoginBtn) {
        authTabLoginBtn.classList.add('is-active');
        authTabLoginBtn.setAttribute('aria-selected', 'true');
      }
      if (authTabRegisterBtn) {
        authTabRegisterBtn.classList.remove('is-active');
        authTabRegisterBtn.setAttribute('aria-selected', 'false');
      }
      if (authLoginPane) authLoginPane.style.display = 'block';
      if (authRegisterPane) authRegisterPane.style.display = 'none';
    } else {
      if (authTabRegisterBtn) {
        authTabRegisterBtn.classList.add('is-active');
        authTabRegisterBtn.setAttribute('aria-selected', 'true');
      }
      if (authTabLoginBtn) {
        authTabLoginBtn.classList.remove('is-active');
        authTabLoginBtn.setAttribute('aria-selected', 'false');
      }
      if (authRegisterPane) authRegisterPane.style.display = 'block';
      if (authLoginPane) authLoginPane.style.display = 'none';
    }
  };

  if (authTabLoginBtn) authTabLoginBtn.addEventListener('click', () => switchAuthTab('login'));
  if (authTabRegisterBtn) authTabRegisterBtn.addEventListener('click', () => switchAuthTab('register'));

  // Password visibility toggles
  const setupPwToggle = (btnId, inputId) => {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;

    btn.addEventListener('click', () => {
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      btn.style.color = isPassword ? 'var(--accent-primary)' : 'var(--text-muted)';
    });
  };

  setupPwToggle('login-toggle-pw', 'login-password');
  setupPwToggle('reg-toggle-pw', 'reg-password');

  // Password Strength Meter
  if (regPasswordInput && regPwStrengthBar && regPwStrengthText) {
    regPasswordInput.addEventListener('input', () => {
      const val = regPasswordInput.value;
      let score = 0;
      if (val.length >= 6) score++;
      if (val.length >= 10) score++;
      if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (val.length === 0) {
        regPwStrengthBar.style.width = '0%';
        regPwStrengthBar.style.backgroundColor = '#ef4444';
        regPwStrengthText.textContent = 'Kekuatan Sandi: Belum diisi';
      } else if (score <= 1) {
        regPwStrengthBar.style.width = '25%';
        regPwStrengthBar.style.backgroundColor = '#ef4444';
        regPwStrengthText.textContent = 'Kekuatan Sandi: Sangat Lemah';
      } else if (score === 2) {
        regPwStrengthBar.style.width = '50%';
        regPwStrengthBar.style.backgroundColor = '#f59e0b';
        regPwStrengthText.textContent = 'Kekuatan Sandi: Cukup / Sedang';
      } else if (score === 3) {
        regPwStrengthBar.style.width = '75%';
        regPwStrengthBar.style.backgroundColor = '#38bdf8';
        regPwStrengthText.textContent = 'Kekuatan Sandi: Kuat';
      } else {
        regPwStrengthBar.style.width = '100%';
        regPwStrengthBar.style.backgroundColor = '#10b981';
        regPwStrengthText.textContent = 'Kekuatan Sandi: Sangat Kuat & Aman';
      }
    });
  }

  // Quick Demo Account Buttons
  document.querySelectorAll('.btn-demo-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const demoRole = btn.getAttribute('data-auth-demo');
      switchAuthTab('login');
      const emailInput = document.getElementById('login-email');
      const pwInput = document.getElementById('login-password');
      if (demoRole === 'siswa') {
        if (emailInput) emailInput.value = 'siswa@smkn1.sch.id';
        if (pwInput) pwInput.value = 'Siswa123!';
      } else {
        if (emailInput) emailInput.value = 'guru@smkn1.sch.id';
        if (pwInput) pwInput.value = 'GuruAdmin2026!';
      }
      if (loginFeedback) {
        loginFeedback.className = 'auth-feedback success';
        loginFeedback.textContent = `Akun Demo (${demoRole === 'siswa' ? 'Siswa' : 'Guru/Admin'}) berhasil diisikan! Klik tombol Masuk di bawah.`;
        loginFeedback.style.display = 'block';
      }
    });
  });

  // Login form submission
  if (formAuthLogin) {
    formAuthLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const pwInput = document.getElementById('login-password');
      const email = emailInput ? emailInput.value.trim() : '';
      const pw = pwInput ? pwInput.value.trim() : '';
      const submitBtn = document.getElementById('login-submit-btn');

      if (!email || !pw) {
        if (loginFeedback) {
          loginFeedback.className = 'auth-feedback error';
          loginFeedback.textContent = 'Harap isi email/NIS dan kata sandi Anda.';
          loginFeedback.style.display = 'block';
        }
        return;
      }

      if (pw.length < 6) {
        if (loginFeedback) {
          loginFeedback.className = 'auth-feedback error';
          loginFeedback.textContent = 'Kata sandi minimal terdiri dari 6 karakter.';
          loginFeedback.style.display = 'block';
        }
        return;
      }

      // Simulate Authentication Progress
      if (submitBtn) {
        submitBtn.disabled = true;
        const textSpan = submitBtn.querySelector('span');
        if (textSpan) textSpan.textContent = 'Memverifikasi Sesi...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          const textSpan = submitBtn.querySelector('span');
          if (textSpan) textSpan.textContent = 'Masuk ke Dashboard';
        }

        // Determine profile details
        const isTeacher = email.includes('guru') || email.includes('admin');
        const userName = isTeacher ? 'Bpk. Hendra Gunawan, S.Kom' : 'Caesar Arkan Athariz';
        const userRole = isTeacher ? 'Tenaga Pengajar / Admin RPL' : 'Siswa SMKN 1 Probolinggo (XI RPL 1)';
        const avatarText = isTeacher ? 'HG' : 'CA';

        const nameEl = document.getElementById('dash-user-name');
        const emailEl = document.getElementById('dash-user-email');
        const roleEl = document.getElementById('dash-user-role');
        const avatarEl = document.getElementById('dash-avatar');
        const timeEl = document.getElementById('dash-login-time');

        if (nameEl) nameEl.textContent = userName;
        if (emailEl) emailEl.textContent = email;
        if (roleEl) roleEl.textContent = userRole;
        if (avatarEl) avatarEl.textContent = avatarText;

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
        if (timeEl) timeEl.textContent = `Hari Ini, ${timeStr}`;

        // Switch to dashboard view
        if (authFormsWrapper) authFormsWrapper.style.display = 'none';
        if (authDashboardView) authDashboardView.style.display = 'block';
        if (loginFeedback) loginFeedback.style.display = 'none';
      }, 700);
    });
  }

  // Logout button
  if (authLogoutBtn) {
    authLogoutBtn.addEventListener('click', () => {
      if (authDashboardView) authDashboardView.style.display = 'none';
      if (authFormsWrapper) authFormsWrapper.style.display = 'block';
      if (formAuthLogin) formAuthLogin.reset();
      if (loginFeedback) {
        loginFeedback.className = 'auth-feedback success';
        loginFeedback.textContent = 'Anda telah berhasil keluar (logout) dari sesi.';
        loginFeedback.style.display = 'block';
      }
    });
  }

  // Forgot password alert
  if (authForgotBtn) {
    authForgotBtn.addEventListener('click', () => {
      alert('Tautan instruksi reset kata sandi telah disimulasikan dan dikirim ke email terdaftar Anda.');
    });
  }

  // Register form submission
  if (formAuthRegister) {
    formAuthRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('reg-name');
      const emailInput = document.getElementById('reg-email');
      const pwInput = document.getElementById('reg-password');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const pw = pwInput ? pwInput.value.trim() : '';

      if (!name || !email || !pw) {
        if (regFeedback) {
          regFeedback.className = 'auth-feedback error';
          regFeedback.textContent = 'Harap lengkapi semua kolom formulir pendaftaran.';
          regFeedback.style.display = 'block';
        }
        return;
      }

      if (pw.length < 6) {
        if (regFeedback) {
          regFeedback.className = 'auth-feedback error';
          regFeedback.textContent = 'Kata sandi minimal 6 karakter.';
          regFeedback.style.display = 'block';
        }
        return;
      }

      if (regFeedback) {
        regFeedback.className = 'auth-feedback success';
        regFeedback.textContent = `Registrasi akun untuk "${name}" berhasil! Mengalihkan ke form login...`;
        regFeedback.style.display = 'block';
      }

      setTimeout(() => {
        switchAuthTab('login');
        const loginEmail = document.getElementById('login-email');
        const loginPw = document.getElementById('login-password');
        if (loginEmail) loginEmail.value = email;
        if (loginPw) loginPw.value = pw;
        if (regFeedback) regFeedback.style.display = 'none';
        formAuthRegister.reset();
      }, 1200);
    });
  }

  // ------------------------------------------------------------------------
  // 14. App 3: Sistem Absensi Digital Siswa & Tim Logic
  // ------------------------------------------------------------------------
  const ABSENSI_STORAGE_KEY = 'caa_absensi_data';
  const absensiTableBody = document.getElementById('absensi-table-body');
  const absensiEmptyState = document.getElementById('absensi-empty-state');
  const formAddAbsensi = document.getElementById('form-add-absensi');
  const absensiSearchInput = document.getElementById('absensi-search-input');
  const absensiFilterStatus = document.getElementById('absensi-filter-status');
  const absensiLoadDemoBtn = document.getElementById('absensi-load-demo-btn');
  const absensiClearAllBtn = document.getElementById('absensi-clear-all-btn');

  // KPI elements
  const statTotal = document.getElementById('stat-absensi-total');
  const statHadir = document.getElementById('stat-absensi-hadir');
  const statIzin = document.getElementById('stat-absensi-izin');
  const statSakit = document.getElementById('stat-absensi-sakit');
  const statAlpa = document.getElementById('stat-absensi-alpa');

  const defaultAbsensiDemoData = [
    { id: '1', name: 'Caesar Arkan Athariz', className: 'XI RPL 1', status: 'Hadir', note: 'Tepat Waktu (06:45)', time: '06:45 WIB' },
    { id: '2', name: 'Ahmad Faiz Fadhlullah', className: 'XI RPL 1', status: 'Hadir', note: 'Tepat Waktu (06:50)', time: '06:50 WIB' },
    { id: '3', name: 'Dimas Aditya Putra', className: 'XI RPL 2', status: 'Izin', note: 'Lomba Web Design Tingkat Provinsi', time: '07:15 WIB' },
    { id: '4', name: 'Rizky Pratama Ramadhan', className: 'XII RPL 1', status: 'Sakit', note: 'Demam (Surat dokter terlampir)', time: '07:20 WIB' },
    { id: '5', name: 'Budi Santoso', className: 'X PPLG 1', status: 'Alpa', note: 'Belum ada konfirmasi orang tua', time: '07:30 WIB' }
  ];

  const getAbsensiData = () => {
    try {
      const stored = localStorage.getItem(ABSENSI_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Error reading absensi data from localStorage:', err);
    }
    localStorage.setItem(ABSENSI_STORAGE_KEY, JSON.stringify(defaultAbsensiDemoData));
    return defaultAbsensiDemoData;
  };

  const saveAbsensiData = (data) => {
    try {
      localStorage.setItem(ABSENSI_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Error saving absensi data:', err);
    }
    renderAbsensiTable();
  };

  const updateAbsensiStats = (data) => {
    let hadir = 0, izin = 0, sakit = 0, alpa = 0;
    data.forEach(item => {
      const st = (item.status || '').toLowerCase();
      if (st === 'hadir') hadir++;
      else if (st === 'izin') izin++;
      else if (st === 'sakit') sakit++;
      else if (st === 'alpa') alpa++;
    });

    if (statTotal) statTotal.textContent = data.length;
    if (statHadir) statHadir.textContent = hadir;
    if (statIzin) statIzin.textContent = izin;
    if (statSakit) statSakit.textContent = sakit;
    if (statAlpa) statAlpa.textContent = alpa;
  };

  const renderAbsensiTable = () => {
    const allData = getAbsensiData();
    updateAbsensiStats(allData);

    const query = (absensiSearchInput ? absensiSearchInput.value : '').toLowerCase().trim();
    const filter = (absensiFilterStatus ? absensiFilterStatus.value : 'all');

    const filtered = allData.filter(item => {
      const matchQuery = (item.name || '').toLowerCase().includes(query) || (item.className || '').toLowerCase().includes(query);
      const matchStatus = filter === 'all' || item.status === filter;
      return matchQuery && matchStatus;
    });

    if (!absensiTableBody) return;

    if (filtered.length === 0) {
      absensiTableBody.innerHTML = '';
      if (absensiEmptyState) absensiEmptyState.style.display = 'block';
      return;
    }

    if (absensiEmptyState) absensiEmptyState.style.display = 'none';

    absensiTableBody.innerHTML = filtered.map((item, index) => {
      const statusClass = (item.status || '').toLowerCase();
      return `
        <tr>
          <td><strong>${index + 1}</strong></td>
          <td><strong>${item.name}</strong></td>
          <td><span class="type-pill" style="font-size: 0.72rem;">${item.className}</span></td>
          <td>
            <span class="status-badge ${statusClass}">
              ● ${item.status}
            </span>
          </td>
          <td>${item.time || '-'}</td>
          <td><small>${item.note || '-'}</small></td>
          <td style="text-align: center;">
            <button type="button" class="btn-del-record" data-del-id="${item.id}" title="Hapus catatan ini">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach delete handlers
    absensiTableBody.querySelectorAll('.btn-del-record').forEach(btn => {
      btn.addEventListener('click', () => {
        const idToDel = btn.getAttribute('data-del-id');
        const currentData = getAbsensiData();
        const updated = currentData.filter(item => item.id !== idToDel);
        saveAbsensiData(updated);
      });
    });
  };

  // Add Attendance record
  if (formAddAbsensi) {
    formAddAbsensi.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('absensi-name');
      const classInput = document.getElementById('absensi-class');
      const statusInput = document.getElementById('absensi-status');
      const noteInput = document.getElementById('absensi-note');

      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) return;

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;

      const newRecord = {
        id: Date.now().toString(),
        name: name,
        className: classInput ? classInput.value : 'XI RPL 1',
        status: statusInput ? statusInput.value : 'Hadir',
        note: (noteInput && noteInput.value.trim()) ? noteInput.value.trim() : 'Presensi langsung dicatat',
        time: timeStr
      };

      const currentData = getAbsensiData();
      currentData.unshift(newRecord);
      saveAbsensiData(currentData);

      if (nameInput) nameInput.value = '';
      if (noteInput) noteInput.value = '';
      if (nameInput) nameInput.focus();
    });
  }

  // Filter & Search events
  if (absensiSearchInput) {
    absensiSearchInput.addEventListener('input', renderAbsensiTable);
  }
  if (absensiFilterStatus) {
    absensiFilterStatus.addEventListener('change', renderAbsensiTable);
  }

  // Load demo data button
  if (absensiLoadDemoBtn) {
    absensiLoadDemoBtn.addEventListener('click', () => {
      saveAbsensiData(defaultAbsensiDemoData);
    });
  }

  // Clear all data button
  if (absensiClearAllBtn) {
    absensiClearAllBtn.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin menghapus seluruh data catatan absensi?')) {
        saveAbsensiData([]);
      }
    });
  }

  // Initialize absensi data on load
  renderAbsensiTable();

  // ------------------------------------------------------------------------
  // 15. Console Badge (Clean Signature)
  // ------------------------------------------------------------------------
  console.log(
    '%c Caesar Arkan Athariz %c Junior AI Web Engineer • SMKN 1 Probolinggo ',
    'background: #2563eb; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #0f172a; color: #38bdf8; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
});
