(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  // ===== HERO ENTRANCE =====
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    .to('.hero-name', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
    .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to('.scroll-line', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');

  // Fade hero on scroll
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: '60% top',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set('.hero-content', { opacity: 1 - self.progress * 1.5 });
      gsap.set('.scroll-line', { opacity: Math.max(0, 1 - self.progress * 3) });
    },
  });

  // ===== VIDEO SCRUB =====
  const video = document.getElementById('scrub-video');
  let videoReady = false;

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !videoReady) {
        video.load();
        video.addEventListener('loadedmetadata', () => { videoReady = true; }, { once: true });
      }
    });
  }, { rootMargin: '300px' });

  videoObserver.observe(video);

  ScrollTrigger.create({
    trigger: '#video-section',
    start: 'top 60%',
    end: 'top top',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(video, { opacity: self.progress });
    },
  });

  ScrollTrigger.create({
    trigger: '#video-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (videoReady && video.duration) {
        video.currentTime = self.progress * video.duration;
      }
    },
  });

  const videoOverlay = document.getElementById('video-overlay');

  ScrollTrigger.create({
    trigger: '#video-section',
    start: '25% top',
    end: '65% top',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress;
      const opacity = p < 0.5 ? p * 2 : 1 - (p - 0.5) * 2;
      gsap.set(videoOverlay, { opacity });
    },
  });

  ScrollTrigger.create({
    trigger: '#video-section',
    start: '85% top',
    end: 'bottom top',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(video, { opacity: 1 - self.progress });
    },
  });

  // ===== PROJECT CARDS =====
  document.querySelectorAll('.project-card').forEach((card) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      },
    });
  });

  // ===== ABOUT =====
  gsap.from('.about-statement', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-statement',
      start: 'top 85%',
      toggleActions: 'play none none none',
      invalidateOnRefresh: true,
    },
  });

  gsap.utils.toArray('.about-right p').forEach((p, i) => {
    gsap.from(p, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: p,
        start: 'top 88%',
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      },
    });
  });

  // ===== CONTACT =====
  gsap.from('.contact-heading', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 75%',
      toggleActions: 'play none none none',
      invalidateOnRefresh: true,
    },
  });

  gsap.from('.contact-sub', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
      toggleActions: 'play none none none',
      invalidateOnRefresh: true,
    },
  });

  gsap.from('.contact-link', {
    opacity: 0,
    y: 15,
    stagger: 0.08,
    duration: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-links',
      start: 'top 88%',
      toggleActions: 'play none none none',
      invalidateOnRefresh: true,
    },
  });

  // ===== SMOOTH ANCHOR SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 0 },
          duration: 1,
          ease: 'power3.inOut',
        });
      }
    });
  });

  // ===== RESIZE =====
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

})();
