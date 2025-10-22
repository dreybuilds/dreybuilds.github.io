(function(){
  const YEAR = document.getElementById('year');
  if (YEAR) YEAR.textContent = new Date().getFullYear();

  // Theme toggle: dark <-> light
  const btn = document.getElementById('themeToggle');
  const KEY = 'theme';
  const apply = (mode) => {
    if (mode === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
  };
  // initial
  const saved = localStorage.getItem(KEY);
  apply(saved);
  if (btn){
    btn.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
      localStorage.setItem(KEY, next === 'light' ? 'light' : 'dark');
      apply(next);
    });
  }

  // Subtle card tilt on pointer
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    let raf;
    card.addEventListener('pointermove', e => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        card.style.transform = `rotateY(${x*6}deg) rotateX(${-y*6}deg)`;
      });
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
})();