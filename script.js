(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ── Nav ──
  ScrollTrigger.create({
    onUpdate: function () {
      document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
    },
  });

  // ── Progress bar ──
  ScrollTrigger.create({
    onUpdate: function () {
      document.getElementById('progress').style.width =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
    },
  });

  // ── Typewriter ──
  var tw = document.getElementById('typewriter');
  var twCursor = tw.querySelector('.tw-cursor');
  var phrases = [
    'Building AI systems that actually work.',
    'Founder of Kea Concepts.',
    'Mechatronics Engineering Student.',
    'Creating immersive 3D web experiences.',
  ];
  var pi = 0, ci = 0, del = false;
  function tick() {
    var phrase = phrases[pi];
    while (tw.childNodes.length > 1) tw.removeChild(tw.firstChild);
    tw.insertBefore(document.createTextNode(phrase.slice(0, ci)), twCursor);
    if (!del) { ci++; if (ci > phrase.length) { del = true; setTimeout(tick, 1600); return; } setTimeout(tick, 55); }
    else { ci--; if (ci < 0) { del = false; ci = 0; pi = (pi + 1) % phrases.length; setTimeout(tick, 300); return; } setTimeout(tick, 28); }
  }
  setTimeout(tick, 1800);

  // ═══════════════════════════════════════
  // VIDEO BACKGROUND
  // ═══════════════════════════════════════

  var video = document.getElementById('bg-video');
  var heroText = document.getElementById('hero-text');
  var scrollHint = document.getElementById('scroll-hint');

  video.play().catch(function () {});

  // ═══════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════

  // Entrance
  gsap.timeline({ delay: 0.2 })
    .from('.hero-label', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' })
    .from('.hero-text h1', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, '-=0.55')
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.55')
    .from('.hero-btn', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .from('#scroll-hint', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, '-=0.4');

  // Hero text fades and drifts up as you scroll past
  gsap.to(heroText, {
    opacity: 0, y: -120, scale: 1.05,
    ease: 'power2.in',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '60% top',
      scrub: true,
    },
  });

  gsap.to(scrollHint, {
    opacity: 0,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '15% top',
      scrub: true,
    },
  });

  // ═══════════════════════════════════════
  // ABOUT — parallax reveal
  // ═══════════════════════════════════════

  gsap.from('.about-inner', {
    y: 100, opacity: 0, scale: 0.97,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 90%',
      end: 'top 40%',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // About paragraphs stagger in
  document.querySelectorAll('.about-paragraphs p').forEach(function (p) {
    gsap.from(p, {
      y: 30, opacity: 0,
      scrollTrigger: {
        trigger: p,
        start: 'top 92%',
        end: 'top 65%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  // Counting numbers
  ScrollTrigger.create({
    trigger: '#about-facts',
    start: 'top 85%',
    once: true,
    onEnter: function () {
      document.querySelectorAll('[data-count]').forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'));
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val) + '+';
          },
        });
      });
      gsap.from('.fact', {
        y: 25, opacity: 0, stagger: 0.15,
        duration: 0.7, ease: 'power3.out',
      });
    },
  });

  // ═══════════════════════════════════════
  // PROJECTS — split heading + card reveals
  // ═══════════════════════════════════════

  var heading = document.getElementById('projects-heading');
  var text = heading.textContent;
  heading.textContent = '';
  text.split('').forEach(function (char) {
    var span = document.createElement('span');
    span.className = 'char';
    span.textContent = char;
    heading.appendChild(span);
  });

  gsap.to('#projects-heading .char', {
    opacity: 1, y: 0, rotateX: 0,
    stagger: 0.04,
    scrollTrigger: {
      trigger: '#projects-header',
      start: 'top 85%',
      end: 'top 55%',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  gsap.from('#projects-header .label', {
    y: 20, opacity: 0,
    scrollTrigger: {
      trigger: '#projects-header',
      start: 'top 88%',
      end: 'top 65%',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  document.querySelectorAll('.project-card').forEach(function (card) {
    gsap.from(card, {
      y: 80,
      opacity: 0,
      scrollTrigger: {
        trigger: card,
        start: 'top 100%',
        end: 'top 70%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  // ═══════════════════════════════════════
  // CONTACT — draw line + stagger
  // ═══════════════════════════════════════

  gsap.from('.contact-inner', {
    y: 60, opacity: 0, scale: 0.97,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 85%',
      end: 'top 50%',
      scrub: true, invalidateOnRefresh: true,
    },
  });

  gsap.to('#draw-line', {
    width: '80px',
    scrollTrigger: {
      trigger: '#draw-line',
      start: 'top 80%', end: 'top 60%',
      scrub: true, invalidateOnRefresh: true,
    },
  });

  // ═══════════════════════════════════════
  // INTERACTIONS
  // ═══════════════════════════════════════

  // Expand / collapse
  document.querySelectorAll('.expand-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.project-card');
      var detail = card.querySelector('.card-detail');
      var isOpen = detail.classList.contains('open');

      document.querySelectorAll('.card-detail.open').forEach(function (d) {
        d.classList.remove('open');
        var b = d.closest('.project-card').querySelector('.expand-btn');
        b.setAttribute('aria-expanded', 'false');
        b.childNodes[0].textContent = 'Read More ';
      });

      if (!isOpen) {
        detail.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        btn.childNodes[0].textContent = 'Close ';
        setTimeout(function () {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          ScrollTrigger.refresh();
        }, 600);
      } else {
        ScrollTrigger.refresh();
      }
    });
  });

  // Flow step highlight
  document.querySelectorAll('.flow').forEach(function (flow) {
    var steps = flow.querySelectorAll('.flow-step');
    var active = 0, interval = null;
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        interval = setInterval(function () {
          steps.forEach(function (s) { s.style.borderColor = ''; });
          if (steps[active]) {
            steps[active].style.borderColor = '#93c5fd';
            var c = active;
            setTimeout(function () { if (steps[c]) steps[c].style.borderColor = ''; }, 700);
          }
          active = (active + 1) % steps.length;
        }, 900);
      } else { clearInterval(interval); steps.forEach(function (s) { s.style.borderColor = ''; }); }
    });
    obs.observe(flow);
  });

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: target }, duration: 1.2, ease: 'power3.inOut' });
      }
    });
  });

})();
