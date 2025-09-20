// Neon theme interactions: navbar shrink, year, 3D tilt, and scroll reveal
(function () {
  // Navbar shrink
  const nav = document.getElementById('navbar');
  const y = () => window.scrollY || document.documentElement.scrollTop;
  const onScroll = () => {
    if (y() > 10) nav.classList.add('shrink');
    else nav.classList.remove('shrink');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3D Tilt on .tilt elements
  const tilts = Array.from(document.querySelectorAll('.tilt'));
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  tilts.forEach((card) => {
    let bounds;
    const enter = () => { bounds = card.getBoundingClientRect(); };
    const move = (e) => {
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const rx = clamp(((y / bounds.height) - 0.5) * -10, -10, 10);
      const ry = clamp(((x / bounds.width) - 0.5) * 10, -10, 10);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };
    const leave = () => { card.style.transform = 'rotateX(0) rotateY(0)'; };
    card.addEventListener('mouseenter', enter);
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseleave', leave);
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
