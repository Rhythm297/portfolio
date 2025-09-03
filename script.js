// Navbar shrink on scroll + current year
(function () {
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
})();
