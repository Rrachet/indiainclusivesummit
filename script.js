/* India Inclusive Summit — cinematic interaction system */
const CDN={
  gsap:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  scrollTrigger:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
  lenis:'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled/lenis.min.js'
};

const loadScript=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});

const imageSet={
  hero:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2400&q=90',
  story1:'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=88',
  story2:'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=88',
  story3:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=88',
  stage:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=88',
  people:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=88',
  register:'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=2200&q=88'
};

function installImages(){
  const hero=document.querySelector('.hero-image');
  if(hero){hero.src=imageSet.hero;hero.alt='Professionals collaborating at a modern summit';}
  const register=document.querySelector('.register-bg');
  if(register)register.style.backgroundImage=`url("${imageSet.register}")`;
}

function injectCinematicSections(){
  if(document.querySelector('.cinematic-story'))return;
  const experience=document.querySelector('.experience');
  const impact=document.querySelector('.impact');
  if(!experience||!impact)return;

  const story=document.createElement('section');
  story.className='cinematic-story';
  story.innerHTML=`
    <div class="floating-word" aria-hidden="true">INCLUDE</div>
    <div class="story-intro section-wrap reveal">
      <div class="section-label">03 / WHY INDIA NEEDS THIS</div>
      <div class="story-intro-grid">
        <h2>India has talent.<br><span>Now build access.</span></h2>
        <p>Millions of people are ready to learn, lead, build and contribute. The barrier is often not ability — it is the systems, spaces and assumptions around them.</p>
      </div>
    </div>
    <div class="horizontal-stage" id="why-stage">
      <div class="horizontal-track">
        <article class="why-panel why-panel-dark">
          <span class="panel-index">01</span><div class="panel-kicker">THE GAP</div>
          <h3>Awareness is only the beginning.</h3>
          <p>Move the conversation from “why inclusion matters” to “what are we changing on Monday?”</p>
          <div class="panel-mark">AWARENESS → ACTION</div>
        </article>
        <article class="why-panel why-panel-image" style="--panel-image:url('${imageSet.people}')">
          <div class="image-shade"></div><span class="panel-index">02</span><div class="panel-kicker">THE PEOPLE</div>
          <h3>Put lived experience in the room.</h3>
          <p>Better decisions happen when the people affected by them help shape them.</p>
        </article>
        <article class="why-panel why-panel-teal">
          <span class="panel-index">03</span><div class="panel-kicker">THE WORK</div>
          <h3>Design workplaces that work for everyone.</h3>
          <p>Hiring, technology, physical spaces and culture are not separate conversations. They are one employee experience.</p>
          <div class="panel-grid-mark"><i>ACCESS</i><i>EMPLOY</i><i>ENABLE</i><i>LEAD</i></div>
        </article>
        <article class="why-panel why-panel-image" style="--panel-image:url('${imageSet.stage}')">
          <div class="image-shade"></div><span class="panel-index">04</span><div class="panel-kicker">THE MOMENT</div>
          <h3>Turn a summit into a starting line.</h3>
          <p>Leave with relationships, commitments and ideas that can travel beyond the room.</p>
        </article>
      </div>
    </div>
  `;
  experience.after(story);

  const visual=document.createElement('section');
  visual.className='visual-story';
  visual.innerHTML=`
    <div class="section-wrap visual-wrap">
      <div class="visual-copy reveal">
        <div class="section-label">04 / PEOPLE FIRST</div>
        <h2>Inclusion is<br><em>human.</em></h2>
        <p>Across every conversation, the focus stays where it belongs: on people, potential and participation.</p>
      </div>
      <div class="visual-collage">
        <figure class="visual-card visual-card-main reveal"><div class="image-wrap"><img src="${imageSet.story1}" alt="People collaborating in a professional setting" loading="lazy"></div><figcaption><span>01</span> Collaboration</figcaption></figure>
        <figure class="visual-card visual-card-top reveal"><div class="image-wrap"><img src="${imageSet.story2}" alt="A diverse group sharing ideas" loading="lazy"></div><figcaption><span>02</span> Community</figcaption></figure>
        <figure class="visual-card visual-card-bottom reveal"><div class="image-wrap"><img src="${imageSet.story3}" alt="Professionals connecting and exchanging ideas" loading="lazy"></div><figcaption><span>03</span> Opportunity</figcaption></figure>
      </div>
    </div>
  `;
  impact.before(visual);

  const voices=document.createElement('section');
  voices.className='voices section-dark';
  voices.innerHTML=`
    <div class="section-wrap">
      <div class="section-label">05 / THE ROOM</div>
      <div class="voices-head reveal"><h2>Different voices.<br><span>One direction.</span></h2><p>The strongest inclusion conversations happen when lived experience, business, policy and innovation meet at the same table.</p></div>
      <div class="voice-grid">
        <article class="voice-card reveal"><span>01</span><h3>Lived Experience</h3><p>People with disabilities shaping the conversation, not simply being represented in it.</p><b>VOICE</b></article>
        <article class="voice-card reveal"><span>02</span><h3>Business Leadership</h3><p>Decision-makers turning inclusion into talent strategy, culture and measurable outcomes.</p><b>LEADERSHIP</b></article>
        <article class="voice-card reveal"><span>03</span><h3>Policy & Systems</h3><p>Institutions and policymakers connecting intent, regulation and implementation.</p><b>SYSTEMS</b></article>
        <article class="voice-card reveal"><span>04</span><h3>Innovation & Access</h3><p>Creators and assistive technology builders designing what the next decade can look like.</p><b>INNOVATION</b></article>
      </div>
    </div>
  `;
  visual.after(voices);

  const manifesto=document.createElement('section');
  manifesto.className='manifesto';
  manifesto.innerHTML=`
    <div class="manifesto-no">06</div>
    <div class="manifesto-lines" aria-hidden="true"><span>ACCESS</span><span>DIGNITY</span><span>OPPORTUNITY</span></div>
    <div class="manifesto-content reveal"><div class="section-label">THE MANIFESTO</div><h2>Don't build a seat<br>at the table.<br><em>Build a bigger table.</em></h2><a href="#stay-updated" class="btn btn-primary">I want to be part of it <span aria-hidden="true">↗</span></a></div>
  `;
  voices.after(manifesto);
}

function initBasicUI(){
  const header=document.getElementById('site-header');
  const progress=document.getElementById('scroll-progress-bar');
  const navToggle=document.querySelector('.nav-toggle');
  const nav=document.getElementById('main-nav');
  const form=document.getElementById('mini-registration');
  const formNote=document.getElementById('form-note');
  const year=document.getElementById('year');
  if(year)year.textContent=new Date().getFullYear();

  const onScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress)progress.style.width=max>0?`${scrollY/max*100}%`:'0%';
    header?.classList.toggle('scrolled',scrollY>40);
  };
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  navToggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded',String(open));
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

  const formLink='https://docs.google.com/forms/d/e/1FAIpQLSfWJzjauPd7oB-5D2od1ztnIsNEOAvrjZ11KawpM_9_WaOQRQ/viewform';
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    if(formNote)formNote.textContent='Opening the official registration form…';
    window.open(formLink,'_blank','noopener');
  });
}

function initFallbackMotion(){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('active');observer.unobserve(entry.target)}
  }),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}

function initMotion(){
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);

  if(window.Lenis){
    const lenis=new Lenis({duration:1.15,smoothWheel:true,wheelMultiplier:.9,touchMultiplier:1});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
  }

  const hero=document.querySelector('.hero');
  gsap.set('.hero-content > *',{y:50,opacity:0});
  gsap.timeline({defaults:{ease:'power4.out',overwrite:true}})
    .to('.hero-content .eyebrow',{y:0,opacity:1,duration:.7})
    .to('.hero h1',{y:0,opacity:1,duration:1.05},'-.35')
    .to('.hero-copy',{y:0,opacity:1,duration:.8},'-.65')
    .to('.hero-actions',{y:0,opacity:1,duration:.65},'-.5')
    .to('.hero-meta',{y:0,opacity:1,duration:.65},'-.45');

  gsap.to('.hero-image',{scale:1.14,yPercent:12,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
  gsap.to('.hero-content',{yPercent:-20,opacity:.12,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'70% top',scrub:true}});

  gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.fromTo(el,{y:65,opacity:0},{y:0,opacity:1,duration:.9,delay:(i%4)*.04,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));

  gsap.utils.toArray('.experience-card,.voice-card').forEach((card,i)=>{
    gsap.from(card,{y:90,rotateX:9,opacity:0,duration:.95,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 90%',once:true}});
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      gsap.to(card,{rotateY:x*7,rotateX:-y*7,transformPerspective:900,duration:.3,ease:'power2.out'});
    });
    card.addEventListener('pointerleave',()=>gsap.to(card,{rotateY:0,rotateX:0,duration:.55,ease:'elastic.out(1,.5)'}));
  });

  gsap.utils.toArray('.stat[data-target]').forEach(el=>{
    const target=Number(el.dataset.target),obj={value:0};
    ScrollTrigger.create({trigger:el,start:'top 82%',once:true,onEnter:()=>gsap.to(obj,{value:target,duration:1.8,ease:'power3.out',onUpdate:()=>{const n=Math.floor(obj.value);el.firstChild.nodeValue=target===70000000?`${Math.floor(n/1000000)}M+`:`${n}`;}})});
  });

  gsap.utils.toArray('.btn,.nav-cta').forEach(btn=>{
    btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.1,y:(e.clientY-r.top-r.height/2)*.1,duration:.25})});
    btn.addEventListener('pointerleave',()=>gsap.to(btn,{x:0,y:0,duration:.45,ease:'elastic.out(1,.4)'}));
  });

  gsap.utils.toArray('.section-label').forEach(label=>gsap.from(label,{letterSpacing:'.55em',opacity:0,duration:.8,scrollTrigger:{trigger:label,start:'top 92%',once:true}}));

  gsap.utils.toArray('.visual-card').forEach((card,i)=>{
    const img=card.querySelector('img');
    gsap.from(card,{y:90,opacity:0,rotate:i===0?-3:i===1?3:-2,duration:1,ease:'power4.out',scrollTrigger:{trigger:card,start:'top 85%',once:true}});
    if(img)gsap.to(img,{yPercent:-10,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:true}});
  });

  const horizontal=document.querySelector('.horizontal-stage');
  const track=document.querySelector('.horizontal-track');
  if(horizontal&&track&&innerWidth>760){
    const getDistance=()=>Math.max(0,track.scrollWidth-innerWidth);
    gsap.to(track,{x:()=>-getDistance(),ease:'none',scrollTrigger:{trigger:horizontal,start:'top top',end:()=>`+=${getDistance()+innerWidth}`,pin:true,scrub:1,invalidateOnRefresh:true}});
  }

  gsap.utils.toArray('.why-panel').forEach(panel=>gsap.from(panel,{scale:.94,opacity:.35,duration:.8,scrollTrigger:{trigger:panel,start:'left 80%',containerAnimation:null}}));

  gsap.to('.floating-word',{xPercent:-25,ease:'none',scrollTrigger:{trigger:'.cinematic-story',start:'top bottom',end:'bottom top',scrub:true}});

  gsap.utils.toArray('.manifesto-lines span').forEach((line,i)=>gsap.to(line,{xPercent:i%2?-18:18,ease:'none',scrollTrigger:{trigger:'.manifesto',start:'top bottom',end:'bottom top',scrub:true}}));

  const glow=document.createElement('div');
  glow.className='cursor-glow';
  document.body.appendChild(glow);
  addEventListener('pointermove',e=>gsap.to(glow,{x:e.clientX,y:e.clientY,duration:.35,ease:'power2.out'}));

  addEventListener('resize',()=>ScrollTrigger.refresh());
}

(async()=>{
  installImages();
  injectCinematicSections();
  initBasicUI();
  initFallbackMotion();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  try{
    await loadScript(CDN.gsap);
    await loadScript(CDN.scrollTrigger);
    await loadScript(CDN.lenis);
    initMotion();
  }catch(error){console.warn('Motion libraries could not be loaded.',error)}
})();
