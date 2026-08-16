/* India Inclusive Summit — motion system */
const CDN={gsap:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',scrollTrigger:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',lenis:'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled/lenis.min.js'};
const loadScript=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
const imageSet={
 hero:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=88',
 story1:'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=86',
 story2:'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=86',
 story3:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=86',
 register:'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=2200&q=86'
};
function installImages(){
 const hero=document.querySelector('.hero-image'); if(hero){hero.src=imageSet.hero;hero.removeAttribute('fetchpriority');hero.alt='Professionals collaborating in an inclusive workplace'}
 const register=document.querySelector('.register-bg');if(register)register.style.backgroundImage=`url("${imageSet.register}")`;
 const audience=document.querySelector('.audience');if(!audience||document.querySelector('.visual-story'))return;
 const section=document.createElement('section');section.className='visual-story';section.innerHTML=`
 <div class="story-top"><div class="section-label">05 / THE HUMAN SIDE</div><h2>People first. Always.</h2><p>Inclusion becomes real when it is experienced — in teams, workplaces, technology and everyday life.</p></div>
 <div class="story-grid">
 <figure class="story-image story-large reveal"><img src="${imageSet.story1}" alt="Professionals collaborating around a table" loading="lazy"><figcaption>Collaboration</figcaption></figure>
 <figure class="story-image story-small reveal"><img src="${imageSet.story2}" alt="A diverse group having a team conversation" loading="lazy"><figcaption>Community</figcaption></figure>
 <figure class="story-image story-small story-bottom reveal"><img src="${imageSet.story3}" alt="People connecting in a professional setting" loading="lazy"><figcaption>Opportunity</figcaption></figure></div>`;
 audience.parentNode.insertBefore(section,document.querySelector('.register'));
}
function initBasicUI(){
 const header=document.getElementById('site-header'),progress=document.getElementById('scroll-progress-bar'),navToggle=document.querySelector('.nav-toggle'),nav=document.getElementById('main-nav'),form=document.getElementById('mini-registration'),formNote=document.getElementById('form-note'),year=document.getElementById('year');
 if(year)year.textContent=new Date().getFullYear();
 const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=max>0?`${scrollY/max*100}%`:'0%';header?.classList.toggle('scrolled',scrollY>40)};addEventListener('scroll',onScroll,{passive:true});onScroll();
 navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open))});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
 form?.addEventListener('submit',e=>{e.preventDefault();if(formNote)formNote.textContent='Opening the official registration form…';window.open('https://docs.google.com/forms/d/e/1FAIpQLSfWJzjauPd7oB-5D2od1ztnIsNEOAvrjZ11KawpM_9_WaOQRQ/viewform','_blank','noopener')});
}
function initMotion(){
 if(!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);
 if(window.Lenis){const lenis=new Lenis({duration:1.15,smoothWheel:true,wheelMultiplier:.9});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
 const hero=document.querySelector('.hero');gsap.set('.hero-content > *',{y:40,opacity:0});gsap.timeline({defaults:{ease:'power4.out'}}).to('.hero-content .eyebrow',{y:0,opacity:1,duration:.7}).to('.hero h1',{y:0,opacity:1,duration:1.05},'-.35').to('.hero-copy',{y:0,opacity:1,duration:.8},'-.65').to('.hero-actions',{y:0,opacity:1,duration:.65},'-.5').to('.hero-meta',{y:0,opacity:1,duration:.65},'-.45');
 gsap.to('.hero-image',{scale:1.12,yPercent:12,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});gsap.to('.hero-content',{yPercent:-18,opacity:.15,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'70% top',scrub:true}});
 gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{y:55,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
 gsap.utils.toArray('.experience-card').forEach((card,i)=>{gsap.from(card,{y:80,rotateX:8,opacity:0,duration:.9,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 90%',once:true}});card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(card,{rotateY:x*7,rotateX:-y*7,transformPerspective:800,duration:.35,ease:'power2.out'})});card.addEventListener('pointerleave',()=>gsap.to(card,{rotateY:0,rotateX:0,duration:.6,ease:'elastic.out(1,.5)'}))});
 gsap.utils.toArray('.stat[data-target]').forEach(el=>{const target=Number(el.dataset.target),obj={value:0};ScrollTrigger.create({trigger:el,start:'top 82%',once:true,onEnter:()=>gsap.to(obj,{value:target,duration:1.8,ease:'power3.out',onUpdate:()=>{const n=Math.floor(obj.value);el.firstChild.nodeValue=target===70000000?`${Math.floor(n/1000000)}M+`:`${n}`}})})});
 gsap.utils.toArray('.btn,.nav-cta').forEach(btn=>{btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.12,duration:.3})});btn.addEventListener('pointerleave',()=>gsap.to(btn,{x:0,y:0,duration:.45,ease:'elastic.out(1,.4)'}))});
 gsap.utils.toArray('.story-image img').forEach(img=>gsap.to(img,{yPercent:-10,ease:'none',scrollTrigger:{trigger:img.closest('.story-image'),start:'top bottom',end:'bottom top',scrub:true}}));
 gsap.utils.toArray('.section-label').forEach(label=>gsap.from(label,{letterSpacing:'.5em',opacity:0,duration:.8,scrollTrigger:{trigger:label,start:'top 90%',once:true}}));
 const glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);addEventListener('pointermove',e=>gsap.to(glow,{x:e.clientX,y:e.clientY,duration:.35,ease:'power2.out'}));
}
(async()=>{installImages();initBasicUI();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;try{await loadScript(CDN.gsap);await loadScript(CDN.scrollTrigger);await loadScript(CDN.lenis);initMotion()}catch(error){console.warn('Motion libraries could not be loaded.',error)}})();
