(() => {
  'use strict';
  const links = Array.from(document.querySelectorAll('.main-nav a'));
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  function setCurrent(id) {
    for (const link of links) {
      if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  for (const link of links) link.addEventListener('click', () => setCurrent(link.hash.slice(1)));
  if (!('IntersectionObserver' in window)) return;
  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    }
    const first = sections.find(section => visible.has(section.id));
    if (first) setCurrent(first.id);
  }, { rootMargin: '-10% 0px -45% 0px' });
  sections.forEach(section => observer.observe(section));
})();
