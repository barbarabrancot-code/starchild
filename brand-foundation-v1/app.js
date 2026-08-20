/**
 * Starchild Brand Foundation — app.js
 * Sticky nav active section on scroll, collapsible mobile nav,
 * collapsible voice principles, reveal-on-scroll transitions.
 */

(function () {
  'use strict';

  // ---------- MOBILE NAV TOGGLE ----------
  const navToggle = document.querySelector('.nav-toggle');
  const sidebarNav = document.querySelector('.sidebar-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-links a');

  function openNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    sidebarNav.classList.add('open');
    navOverlay.classList.add('visible');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    sidebarNav.classList.remove('open');
    navOverlay.classList.remove('visible');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeNav() : openNav();
  });

  navOverlay.addEventListener('click', closeNav);

  // Close nav when a link is clicked
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) closeNav();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
      navToggle.focus();
    }
  });

  // ---------- STICKY NAV — ACTIVE SECTION ON SCROLL ----------
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.sidebar-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Throttle scroll handler
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  updateActiveNav();

  // ---------- REVEAL ON SCROLL (with reduced-motion check) ----------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // If reduced motion or no IntersectionObserver, show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- COLLAPSIBLE VOICE PRINCIPLES ----------
  const voicePrinciples = document.querySelectorAll('.voice-principle');

  voicePrinciples.forEach(function (principle) {
    const header = principle.querySelector('.voice-principle-header');
    if (!header) return;

    header.addEventListener('click', function () {
      const isExpanded = principle.classList.contains('expanded');

      // Close all others (accordion-style)
      voicePrinciples.forEach(function (p) {
        p.classList.remove('expanded');
      });

      // Toggle current
      if (!isExpanded) {
        principle.classList.add('expanded');
      }
    });

    // Keyboard accessibility
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = sidebarNav ? sidebarNav.offsetHeight : 0;
        const targetPosition = target.offsetTop - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });

        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // ---------- CLOSE MOBILE NAV ON RESIZE ----------
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768) {
        closeNav();
      }
    }, 150);
  });

})();
