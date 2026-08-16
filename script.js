document.addEventListener('DOMContentLoaded',()=>{
  const header=document.getElementById('site-header');
  const progress=document.getElementById('scroll-progress-bar');
  const navToggle=document.querySelector('.nav-toggle');
  const nav=document.getElementById('main-nav');
  const form=document.getElementById('mini-registration');
  const formNote=document.getElementById('form-note');
  const year=document.getElementById('year');

  if(year) year.textContent=new Date().getFullYear();

  const onScroll=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=max>0?`${(window.scrollY/max)*100}%`:'0%';
    header.classList.toggle('scrolled',window.scrollY>40);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  navToggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded',String(open));
  });
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded','false');
  }));

  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  const counters=document.querySelectorAll('.stat[data-target]');
  const counterObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target,target=Number(el.dataset.target),duration=1500,start=performance.now();
      const format=n=>{
        if(target===70000000)return `${Math.floor(n/1000000)}M+`;
        if(target===30)return `${Math.floor(n)}`;
        return `${Math.floor(n)}`;
      };
      const tick=now=>{
        const progress=Math.min((now-start)/duration,1);
        const eased=1-Math.pow(1-progress,3);
        el.firstChild.nodeValue=format(target*eased);
        if(progress<1)requestAnimationFrame(tick); else el.firstChild.nodeValue=format(target);
      };
      requestAnimationFrame(tick);counterObserver.unobserve(el);
    });
  },{threshold:.45});
  counters.forEach(el=>counterObserver.observe(el));

  const formLink='https://docs.google.com/forms/d/e/1FAIpQLSfWJzjauPd7oB-5D2od1ztnIsNEOAvrjZ11KawpM_9_WaOQRQ/viewform';
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form);
    const params=new URLSearchParams();
    for(const [key,value] of data.entries())params.set(key,value);
    formNote.textContent='Opening the official registration form…';
    window.open(`${formLink}${params.toString()?'?'+params.toString():''}`,'_blank','noopener');
  });
});
