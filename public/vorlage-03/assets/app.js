(() => {
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  function closeMenu(){ mobileMenu.hidden=true; menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Menü öffnen'); }
  if(menuButton && mobileMenu){
    menuButton.addEventListener('click',()=>{const open=mobileMenu.hidden;mobileMenu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Menü schliessen':'Menü öffnen');});
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuButton.focus();}});
  }
  // Staggered, restrained reveals. Reduced motion presents text immediately.
  const revealEls = document.querySelectorAll('[data-reveal]');
  if(reduceMotion || !('IntersectionObserver' in window)) revealEls.forEach(el=>el.classList.add('visible'));
  else {
    const io = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}}),{threshold:.13,rootMargin:'0px 0px -24px 0px'});
    revealEls.forEach(el=>io.observe(el));
  }
  // One pinned video / one narrative timeline, no stacked full-page cards.
  const story=document.querySelector('.story');
  const chapters=[...document.querySelectorAll('.chapter')];
  const counter=document.querySelector('.story-progress-count');
  const bar=document.querySelector('#story-progress-fill');
  let current=-1,scheduled=false;
  function updateStory(){
    scheduled=false;
    if(reduceMotion || !story) return;
    const rect=story.getBoundingClientRect();
    const distance=Math.max(1,rect.height-innerHeight);
    const p=Math.max(0,Math.min(1,-rect.top/distance));
    const next=Math.min(2,Math.floor(p*3));
    if(next!==current){chapters.forEach((el,i)=>{const active=i===next;el.classList.toggle('current',active);el.setAttribute('aria-hidden',String(!active));});current=next;counter.textContent=`0${next+1} / 03`;}
    bar.style.width=(p*100).toFixed(2)+'%';
  }
  if(!reduceMotion){addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateStory)}},{passive:true});addEventListener('resize',updateStory);updateStory();}
  // A browser-native video player is always operable, including for reduced-motion visitors.
  // On first appearance, request muted playback. Users can pause/play with the native controls.
  const heroVideo = document.querySelector('#hero-film');
  const cinema = document.querySelector('#cinema-film');
  const cinemaError = document.querySelector('#cinema-error');
  if (heroVideo && reduceMotion) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }
  if (cinema) {
    let hasEntered = false;
    if (reduceMotion) {
      cinema.removeAttribute('autoplay');
      cinema.pause();
    }
    const showError = () => {
      if (cinemaError) cinemaError.hidden = false;
    };
    cinema.addEventListener('error', showError);
    const clipSource = cinema.querySelector('source');
    if (clipSource) clipSource.addEventListener('error', showError);
    if ('IntersectionObserver' in window) {
      const cinemaObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || hasEntered) return;
          hasEntered = true;
          observer.unobserve(entry.target);
          if (!reduceMotion) {
            cinema.muted = true;
            const promise = cinema.play();
            if (promise && typeof promise.catch === 'function') {
              promise.catch(() => {
                // Native player remains visible; a normal click will start playback.
              });
            }
          }
        });
      }, {threshold:.15});
      cinemaObserver.observe(cinema);
    }
  }

  // Subtle parallax on the smaller editorial photographs only.
  const motionPhotos = [...document.querySelectorAll('[data-motion-image]')];
  if (!reduceMotion && motionPhotos.length) {
    let imageScheduled = false;
    const updatePhotos = () => {
      imageScheduled = false;
      motionPhotos.forEach(photo => {
        const rect = photo.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
        const amount = Math.max(-12, Math.min(12, (innerHeight * .5 - (rect.top + rect.height * .5)) * .035));
        photo.style.setProperty('--photo-shift', `${amount.toFixed(1)}px`);
      });
    };
    const schedulePhotos = () => {
      if (imageScheduled) return;
      imageScheduled = true;
      requestAnimationFrame(updatePhotos);
    };
    addEventListener('scroll',schedulePhotos,{passive:true});
    addEventListener('resize',schedulePhotos);
    updatePhotos();
  }
  // GDPR-minded click-to-load: the external viewer is not requested on page visit.
  const modelButton=document.querySelector('#load-model');const modelPlaceholder=document.querySelector('#model-placeholder');const modelEmbed=document.querySelector('#model-embed');
  if(modelButton && modelPlaceholder && modelEmbed){
    modelButton.addEventListener('click',()=>{
      if(modelEmbed.querySelector('iframe'))return;
      const iframe=document.createElement('iframe');
      iframe.src='https://sketchfab.com/models/58ac9d802d054c4eae0fd09988ad4f33/embed?autostart=1&ui_hint=2&ui_theme=light&autospin=0';
      iframe.title='Porsche 911 GT3 RS – unabhängiges 3D-Modell von Nazh Design auf Sketchfab';
      iframe.allow='autoplay; fullscreen; xr-spatial-tracking';
      iframe.allowFullscreen=true;
      iframe.referrerPolicy='strict-origin-when-cross-origin';
      iframe.setAttribute('loading','eager');
      modelEmbed.appendChild(iframe);
      modelEmbed.hidden=false;modelPlaceholder.hidden=true;
    },{once:true});
  }
})();
