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
  // 3. Theme Management (Dark / Light Mode)
  // ------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'caa_portfolio_theme';

  /**
   * Determine initial theme from localStorage or OS preference
   */
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Default to dark mode for modern engineer aesthetic, or check OS
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  };

  /**
   * Apply selected theme
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

  // Initialize theme
  applyTheme(getInitialTheme());

  // Listen to toggle button clicks
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
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
  // 9. Shooting Stars / Meteor Animation
  // ------------------------------------------------------------------------
  const initShootingStars = () => {
    const container = document.createElement('div');
    container.id = 'shooting-stars-container';
    container.setAttribute('aria-hidden', 'true');
    // Append to body but it will be styled behind everything
    document.body.appendChild(container);

    const starCount = 20; // Number of meteors
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('span');
      star.classList.add('shooting-star');
      
      // Randomize starting positions along the top and right edges
      // to ensure they fall across the screen
      const topOffset = Math.random() * 100 - 20; // -20vh to 80vh
      const leftOffset = Math.random() * 100 + 20; // 20vw to 120vw
      const delay = Math.random() * 8; // 0 to 8s
      const duration = 1.5 + Math.random() * 3; // 1.5s to 4.5s

      star.style.top = `${topOffset}vh`;
      star.style.left = `${leftOffset}vw`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${duration}s`;

      container.appendChild(star);
    }
  };

  initShootingStars();

  // ------------------------------------------------------------------------
  // 10. Console Badge (Clean Signature)
  // ------------------------------------------------------------------------
  console.log(
    '%c Caesar Arkan Athariz %c Junior AI Web Engineer • SMKN 1 Probolinggo ',
    'background: #2563eb; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #0f172a; color: #38bdf8; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
});
