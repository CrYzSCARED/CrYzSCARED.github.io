(() => {
  'use strict';
  const clips = {
    '44545': {name:'ON TOP', subtitle:'Sitting on a sports car', duration:'00:10', orientation:'landscape', page:'https://mixkit.co/free-stock-video/stylish-woman-sitting-on-a-sports-car-44545/'},
    '44556': {name:'LEAN IN', subtitle:'Leaning in a Camaro', duration:'00:09', orientation:'portrait', page:'https://mixkit.co/free-stock-video/stylish-woman-leaning-in-a-camaro-44556/'},
    '44542': {name:'IN FRAME', subtitle:'Sitting in a sports car', duration:'00:12', orientation:'portrait', page:'https://mixkit.co/free-stock-video/stylish-woman-sitting-in-a-sports-car-44542/'},
    '44544': {name:'LAST FRAME', subtitle:'Next to a sports car', duration:'00:21', orientation:'landscape', page:'https://mixkit.co/free-stock-video/stylish-woman-smoking-sitting-next-to-sports-car-44544/'},
    '44560': {name:'FOCUS', subtitle:'Posing with a Camaro', duration:'00:09', orientation:'landscape', page:'https://mixkit.co/free-stock-video/stylish-woman-posing-with-a-camaro-car-44560/'},
    '44559': {name:'REFLECTION', subtitle:'Rearview mirror', duration:'00:16', orientation:'portrait', page:'https://mixkit.co/free-stock-video/woman-fixing-the-rearview-mirror-of-a-car-44559/'},
    '44557': {name:'MIDNIGHT', subtitle:'Inside a sports car', duration:'00:16', orientation:'portrait', page:'https://mixkit.co/free-stock-video/a-young-stylish-woman-inside-a-sports-car-44557/'},
    '44554': {name:'EXIT SCENE', subtitle:'Getting out of a Camaro', duration:'00:15', orientation:'landscape', page:'https://mixkit.co/free-stock-video/stylish-woman-getting-out-of-a-camaro-in-a-parking-44554/'},
    '44546': {name:'APPROACH', subtitle:'Posing around a Camaro', duration:'00:18', orientation:'landscape', page:'https://mixkit.co/free-stock-video/stylish-woman-posing-around-a-camaro-car-44546/'}
  };
  // All nine original videos are hosted locally in the website package.
  const clipOrder = ['44545','44556','44542','44544','44560','44559','44557','44554','44546'];
  const localURL = id => `assets/videos/${id}.mp4`;
  const posterURL = id => `assets/images/clip-${id}.webp`;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const reveals = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) reveals.forEach(el => el.classList.add('is-visible'));
  else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -18px 0px'});
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  if (menuButton && mobileNav) {
    function setMenu(open) {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
      mobileNav.hidden = !open;
    }
    menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click',()=>setMenu(false)));
  }


  // Save bandwidth and device resources: pause decorative videos outside the viewport.
  const ambientFilms = document.querySelectorAll('.ambient-film');
  if (prefersReducedMotion) {
    ambientFilms.forEach(video => { video.pause(); video.removeAttribute('autoplay'); });
  } else if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if(isIntersecting) {
          const promise = target.play();
          if(promise && promise.catch) promise.catch(() => {});
        } else target.pause();
      });
    }, {threshold: 0.18});
    ambientFilms.forEach(video => videoObserver.observe(video));
  }
  const modal = document.getElementById('film-modal');
  const player = document.getElementById('film-player');
  const loader = document.getElementById('player-loader');
  const error = document.getElementById('player-error');
  const source = document.getElementById('source-link');
  const sourceTop = document.getElementById('modal-source');
  const title = document.getElementById('modal-title');
  const sub = document.getElementById('modal-sub');
  const number = document.getElementById('modal-counter');
  const closeButton = document.getElementById('close-modal');
  let lastFocused = null, loadSequence = 0, errorTimer = null;

  function revealError(){
    if (modal.hidden) return;
    loader.hidden = true;
    error.hidden = false;
    player.pause();
  }
  async function openClip(id){
    const clip = clips[id];if(!clip)return;
    loadSequence += 1;const current = loadSequence;
    lastFocused = document.activeElement;
    modal.hidden = false;document.body.classList.add('modal-open');
    error.hidden = true;loader.hidden = false;
    player.pause();player.removeAttribute('src');player.load();
    player.style.objectFit = 'contain';
    player.muted = true;
    title.textContent=clip.name;
    sub.textContent=`${clip.subtitle.toUpperCase()} / ${clip.duration} / 24 FPS`;
    number.textContent=`SCENE ${String(clipOrder.indexOf(id)+1).padStart(2,'0')} / 09`;
    source.href=clip.page;sourceTop.href=clip.page;
    closeButton.focus();
    if(modal.hidden || current !== loadSequence)return;
    player.poster = posterURL(id);
    player.src = localURL(id);
    player.load();
    clearTimeout(errorTimer);
    errorTimer=setTimeout(() => {if(!modal.hidden && player.readyState < 2)revealError();},12000);
    const attempt=player.play();
    if(attempt && typeof attempt.catch==='function')attempt.catch(()=>{
      // If browser blocks autoplay, the native play control remains available.
      loader.hidden=true;
    });
  }
  function closeModal(){
    loadSequence += 1;clearTimeout(errorTimer);
    modal.hidden=true;document.body.classList.remove('modal-open');
    player.pause();player.removeAttribute('src');player.load();
    error.hidden=true;loader.hidden=true;
    if(lastFocused && typeof lastFocused.focus==='function')lastFocused.focus();
  }
  document.querySelectorAll('[data-clip]').forEach(btn => btn.addEventListener('click',()=>openClip(btn.dataset.clip)));
  document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
  closeButton.addEventListener('click',closeModal);
  player.addEventListener('loadeddata',()=>{loader.hidden=true;clearTimeout(errorTimer);});
  player.addEventListener('playing',()=>{loader.hidden=true;clearTimeout(errorTimer);});
  player.addEventListener('error',()=>{if(!modal.hidden)revealError();});
  window.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(!modal.hidden)closeModal();
      else if(menuButton && menuButton.getAttribute('aria-expanded')==='true'){
        menuButton.click();menuButton.focus();
      }
    }
  });
})();
