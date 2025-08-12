(function(){
  const root = document.body;
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const themeToggle = document.getElementById('themeToggle');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Theme: init from localStorage or media query
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    root.classList.add('dark');
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close nav on link click (mobile)
  siteNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  // Smooth scroll offset for sticky header
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  // Form handling (demo only)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !email || !message) {
      setStatus('Please complete all fields.', true);
      return;
    }

    // Simulate async send
    setStatus('Sending…');
    setTimeout(() => {
      setStatus('Thanks! We will be in touch shortly.');
      form.reset();
    }, 900);
  });

  function setStatus(text, isError){
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.style.color = isError ? '#ef4444' : 'var(--muted)';
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.feature, .plan, .faq details, .form');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.animate([
          { transform: 'translateY(12px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 }
        ], { duration: 400, easing: 'ease-out', fill: 'both' });
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
})();