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

  let viewer = null;
  try { viewer = window.VOLTEX_CAR_VIEWER?.create(document.querySelector('#car-canvas')); } catch (err) { console.warn('3D viewer unavailable; switching to still image', err); }
  if (!viewer) {
    document.querySelector('#car-canvas').hidden=true;
    document.querySelector('#car-fallback').hidden=false;
    document.querySelectorAll('#rotate-left,#rotate-right,#auto-spin,#reset-view,.swatch').forEach(el=>el.disabled=true);
    return;
  }
  const canvas = document.querySelector('#car-canvas');
  let pointerStart=0,lastX=0,dragging=false,touched=false,auto=false;
  const hint=document.querySelector('#rotate-hint');
  const autoButton=document.querySelector('#auto-spin');
  const angleElement=document.querySelector('#view-angle');
  let angle=-0.48, target=-0.48, paint='graphite',spinDirection=1, visible=true;
  let lastTime=performance.now(), lastSoftwareDraw=0;
  const still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finishLabel=document.querySelector('#finish-label');
  function norm(a){return ((a%(2*Math.PI))+(2*Math.PI))%(2*Math.PI)}
  function updateAngle(){angleElement.textContent='ANGLE: '+Math.round(norm(angle)*180/Math.PI).toString().padStart(3,'0')+'°';}
  function rotate(delta){target+=delta;angle=target;viewer.render(angle,paint);updateAngle();hint.style.opacity='0';touched=true;}
  canvas.addEventListener('pointerdown', e=> { dragging=true;lastX=e.clientX;pointerStart=e.clientX;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!dragging) return; const dx=e.clientX-lastX;lastX=e.clientX;if(Math.abs(e.clientX-pointerStart)>3)rotate(dx*0.014);});
  const release=()=>{dragging=false;};
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);
  canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();rotate((e.key==='ArrowLeft'?-1:1)*Math.PI/12);}});
  document.querySelector('#rotate-left').addEventListener('click',()=>rotate(-Math.PI/8));
  document.querySelector('#rotate-right').addEventListener('click',()=>rotate(Math.PI/8));
  autoButton.addEventListener('click',()=>{auto=!auto;autoButton.setAttribute('aria-pressed',String(auto));autoButton.textContent=auto?'❚❚ PAUSE':'▶ AUTO-ROTATION'; hint.style.opacity='0';touched=true;});
  document.querySelector('#reset-view').addEventListener('click',()=>{auto=false;autoButton.setAttribute('aria-pressed','false');autoButton.textContent='▶ AUTO-ROTATION';angle=-.48;target=-.48;viewer.render(angle,paint);updateAngle();});
  document.querySelectorAll('.swatch').forEach(button=>button.addEventListener('click',()=>{
    paint=button.dataset.finish;
    document.querySelectorAll('.swatch').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
    finishLabel.textContent=({graphite:'GRAPHITE / 01',pearl:'PEARL / 02',crimson:'CRIMSON / 03'})[paint];
    viewer.render(angle,paint);
  }));
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:0});io.observe(canvas);}
  // Scrolling past the viewer also creates a gentle, non-blocking rotation until a user interacts.
  let scrollTick=false;
  window.addEventListener('scroll',()=>{
    if(touched||auto||still||scrollTick||!visible)return;
    scrollTick=true;
    requestAnimationFrame(()=>{
      const r=canvas.getBoundingClientRect(), h=innerHeight;
      const t=Math.min(1,Math.max(0,(h-r.top)/(h+r.height)));
      const newAngle=-.48+t*Math.PI*.85;
      if(Math.abs(newAngle-angle)>.001){angle=target=newAngle;viewer.render(angle,paint);updateAngle();}
      scrollTick=false;
    });
  },{passive:true});
  function animate(now){const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;if(auto&&visible&&!dragging&&!still){angle+=dt*.56*spinDirection;target=angle;if(!viewer.software||now-lastSoftwareDraw>35){viewer.render(angle,paint);lastSoftwareDraw=now;updateAngle();}}requestAnimationFrame(animate);}
  requestAnimationFrame(animate);
  updateAngle();
})();
