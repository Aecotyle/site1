// Removed video scrub code as VANTA.HALO is used for hero background now

window.addEventListener('DOMContentLoaded', () => {
  let vantaEffect = VANTA.WAVES({
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

  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  // GSAP Hero Animation
  gsap.from('.hero h1', { y: isMobile ? 10 : 60, opacity: 0, duration: isMobile ? 0.3 : 1.2, ease: 'power3.out' });
  gsap.from('.hero p', { y: isMobile ? 7 : 40, opacity: 0, duration: isMobile ? 0.25 : 1, delay: 0.4, ease: 'power2.out' });
  gsap.from('.hero-cta', { y: isMobile ? 5 : 30, opacity: 0, duration: isMobile ? 0.2 : 0.9, delay: 0.8, ease: 'power2.out' });

  // GSAP animation for solar system diagram
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

  // GSAP ScrollTrigger animations
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: isMobile ? 'top 92%' : 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: isMobile ? 24 : 60,
      duration: isMobile ? 0.7 : 1.1,
      ease: 'power3.out'
    });
  });

  // Zoom-in effect for solar diagram
  gsap.from('#solar-system-diagram', {
    scrollTrigger: {
      trigger: '#why-solar',
      start: isMobile ? 'top 90%' : 'top 70%',
      toggleActions: 'play none none none',
    },
    scale: isMobile ? 0.9 : 0.7,
    opacity: 0,
    duration: isMobile ? 0.7 : 1.2,
    ease: 'power2.out'
  });

  // Staggered animation for solution cards
  gsap.from('.solution-card', {
    scrollTrigger: {
      trigger: '#solutions',
      start: isMobile ? 'top 92%' : 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: isMobile ? 16 : 40,
    stagger: 0.12,
    duration: isMobile ? 0.6 : 0.9,
    ease: 'power2.out'
  });

  // Staggered animation for how-it-works steps
  gsap.from('.how-step', {
    scrollTrigger: {
      trigger: '#how-it-works',
      start: isMobile ? 'top 92%' : 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: isMobile ? 14 : 40,
    stagger: 0.13,
    duration: isMobile ? 0.5 : 0.8,
    ease: 'power2.out'
  });

  // Testimonials
  gsap.from('.testimonial', {
    scrollTrigger: {
      trigger: '#testimonials',
      start: isMobile ? 'top 95%' : 'top 85%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    x: isMobile ? 20 : 60,
    stagger: 0.15,
    duration: isMobile ? 0.5 : 0.9,
    ease: 'power2.out'
  });

  // FAQ
  gsap.from('.faq-item', {
    scrollTrigger: {
      trigger: '#faq',
      start: isMobile ? 'top 95%' : 'top 85%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: isMobile ? 10 : 30,
    stagger: 0.09,
    duration: isMobile ? 0.4 : 0.7,
    ease: 'power2.out'
  });

  // Parallax zoom-in effect for hero background
  gsap.to('.hero-bg-parallax', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    scale: isMobile ? 1.08 : 1.18,
    y: isMobile ? -20 : -60,
    ease: 'none',
  });
});
