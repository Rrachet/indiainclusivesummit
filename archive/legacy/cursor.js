(() => {
  if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dot=document.querySelector('.cursor-dot');
  const ring=document.querySelector('.cursor-ring');
  if(!dot||!ring)return;
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY});
  const tick=()=>{
    rx+=(x-rx)*.18;ry+=(y-ry)*.18;
    dot.style.left=x+'px';dot.style.top=y+'px';
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  };
  tick();
  document.querySelectorAll('a,button,.experience-card,.voice-card,.visual-card,input').forEach(el=>{
    el.addEventListener('pointerenter',()=>ring.classList.add('is-hover'));
    el.addEventListener('pointerleave',()=>ring.classList.remove('is-hover'));
  });
})();
