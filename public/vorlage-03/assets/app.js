(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: .10, rootMargin: '0px 0px -22px 0px' });
    elements.forEach(el => observer.observe(el));
  } else elements.forEach(el => el.classList.add('visible'));

  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-nav');
  function setMenu(open) { toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'Menü schliessen':'Menü öffnen'); mobile.hidden=!open; }
  toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobile.hidden){setMenu(false);toggle.focus();}});

  // Die realistische 3D-Ansicht wird auf ausdrücklichen Klick als Sketchfab-Embed geladen.
  // Ohne Einwilligung wird keine Verbindung zu Sketchfab hergestellt.
  const loadButton = document.querySelector('#load-porsche');
  const poster = document.querySelector('#porsche-poster');
  const iframeContainer = document.querySelector('#porsche-iframe-container');
  if (loadButton && poster && iframeContainer) {
    loadButton.addEventListener('click', () => {
      if (iframeContainer.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.title = 'Porsche 911 GT3 RS – interaktives 360-Grad-3D-Modell von Nazh Design auf Sketchfab';
      iframe.src = 'https://sketchfab.com/models/58ac9d802d054c4eae0fd09988ad4f33/embed?autostart=1&ui_hint=2&ui_theme=dark&autospin=0.05';
      iframe.allow = 'autoplay; fullscreen; xr-spatial-tracking';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.setAttribute('loading', 'eager');
      iframe.className = 'porsche-embed';
      iframeContainer.appendChild(iframe);
      iframeContainer.hidden = false;
      poster.hidden = true;
    }, { once: true });
  }
})();
