// Ensure all assets, fonts, VANTA, etc. are fully loaded
window.onload = () => {
  const isMobile = window.matchMedia('(max-width: 700px)').matches;

  // Initialize VANTA.WAVES effect (desktop and mobile)
  VANTA.WAVES({
    el: ".vanta-bg",
    mouseControls: true,
    touchControls: true,
    minHeight: 400.00,
    minWidth: 200.00,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x7f5af0,
    shininess: 50.0,
    waveHeight: 20.0,
    waveSpeed: 0.7,
    zoom: 0.95
  });

  // === Hero GSAP Animations ===
  gsap.from('.hero h1', {
    y: isMobile ? 10 : 60,
    opacity: 0,
    duration: isMobile ? 0.3 : 1.2,
    ease: 'power3.out'
  });
  gsap.from('.hero p', {
    y: isMobile ? 7 : 40,
    opacity: 0,
    duration: isMobile ? 0.25 : 1,
    delay: 0.1,
    ease: 'power2.out'
  });
  gsap.from('.hero-cta', {
    y: isMobile ? 5 : 30,
    opacity: 0,
    duration: isMobile ? 0.2 : 0.9,
    delay: 0.2,
    ease: 'power2.out'
  });

  // === Sun & Arrow Animation (always on) ===
  gsap.to('#sun-rays', {
    rotate: 360,
    transformOrigin: '40px 90px',
    repeat: -1,
    duration: 8,
    ease: 'linear'
  });

  gsap.to(['#arrow1', '#arrow2', '#arrow3', '#arrow4', '#arrow5'], {
    opacity: 0.2,
    yoyo: true,
    repeat: -1,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power1.inOut'
  });

  // === Glow Effects ===
  gsap.to('#panels', {
    boxShadow: '0 0 16px 4px #7f5af0',
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: 'sine.inOut'
  });

  gsap.to('#home', {
    boxShadow: '0 0 16px 4px #FFD600',
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: 'sine.inOut',
    delay: 0.7
  });

  // === Scroll-triggered animations ===
  if (!isMobile) {
    // Animate sections
    gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%', // Better than 99% for mobile precision
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power3.out'
      });
    });

    // Solar system diagram zoom
    gsap.from('#solar-system-diagram', {
      scrollTrigger: {
        trigger: '#why-solar',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      scale: 0.7,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out'
    });

    // Cards / Steps / Testimonials / FAQ
    const staggerGroups = [
      { selector: '.solution-card', trigger: '#solutions' },
      { selector: '.how-step', trigger: '#how-it-works' },
      { selector: '.testimonial', trigger: '#testimonials' },
      { selector: '.faq-item', trigger: '#faq' }
    ];

    staggerGroups.forEach(({ selector, trigger }) => {
      gsap.from(selector, {
        scrollTrigger: {
          trigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out'
      });
    });

    // Hero parallax zoom background
    gsap.to('.hero-bg-parallax', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      scale: 1.18,
      y: -60,
      ease: 'none'
    });
  } else {
    // On mobile, skip animations: just show content
    gsap.set([
      'section',
      '#solar-system-diagram',
      '.solution-card',
      '.how-step',
      '.testimonial',
      '.faq-item',
      '.hero-bg-parallax'
    ], { opacity: 1, y: 0, x: 0, scale: 1 });
  }

  // Refresh ScrollTrigger after layout stabilizes
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
};
