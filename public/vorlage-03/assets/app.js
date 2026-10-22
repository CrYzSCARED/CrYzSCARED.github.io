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
  // Local media can be paused and restarted. Never contacts a video host.
  const heroVideo=document.querySelector('#hero-film');
  if(heroVideo && reduceMotion){heroVideo.pause();heroVideo.removeAttribute('autoplay');}
  const cinema=document.querySelector('#cinema-film');
  const toggle=document.querySelector('#cinema-toggle');
  if(cinema && toggle){
    const icon=toggle.querySelector('.play-icon');const text=toggle.querySelector('.play-copy');
    function setPlaying(playing){toggle.setAttribute('aria-pressed',String(playing));toggle.setAttribute('aria-label',playing?'Video pausieren':'Video abspielen');icon.textContent=playing?'Ⅱ':'▶';text.textContent=playing?'FILM PAUSIEREN':'FILM STARTEN';}
    toggle.addEventListener('click',()=>{
      if(cinema.paused){const p=cinema.play();if(p&&p.then)p.then(()=>setPlaying(true)).catch(()=>setPlaying(false));}
      else{cinema.pause();setPlaying(false);}
    });
    cinema.addEventListener('ended',()=>setPlaying(false));
    cinema.addEventListener('pause',()=>setPlaying(false));
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
