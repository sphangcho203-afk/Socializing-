const clock = document.getElementById('clock');
const heroTime = document.getElementById('hero-time');
function tick(){
  const now = new Date();
  const t = now.toLocaleTimeString('en-IN',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Asia/Kolkata'});
  const short = t.slice(0,5);
  if(clock) clock.textContent=t;
  if(heroTime) heroTime.textContent=short;
}
tick(); setInterval(tick,1000);

const sections=[...document.querySelectorAll('main section[id]')];
const nav=[...document.querySelectorAll('.nav-link')];
const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id));
},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.15,.4]});
sections.forEach(s=>observer.observe(s));

const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Second-pass interaction layer: quiet, tactile, editorial — never game-like. */
const style=document.createElement('style');
style.textContent=`
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .reveal.is-visible{opacity:1;transform:none}
  .hero-copy>*{opacity:0;transform:translateY(24px);animation:heroIn .9s cubic-bezier(.16,1,.3,1) forwards}
  .hero-copy .eyebrow{animation-delay:.05s}.hero-copy h1{animation-delay:.12s}.hero-copy h2{animation-delay:.19s}.hero-copy .lead{animation-delay:.26s}.hero-copy .hero-actions{animation-delay:.33s}
  @keyframes heroIn{to{opacity:1;transform:none}}
  .hero-visual{perspective:900px}
  .hero-frame,.orb-main,.orb-small{will-change:transform}
  .project,.tags span,.interest-row span{transition:transform .45s cubic-bezier(.16,1,.3,1),background-color .3s,border-color .3s}
  .project:hover{transform:translateY(-8px) rotate(-.25deg)}
  .tags span:hover{transform:translateY(-3px)}
  .interest-row span:hover{transform:translateY(-3px);background:var(--paper-2)}
  .btn{position:relative;overflow:hidden}
  .btn:after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.16) 50%,transparent 65%);transform:translateX(-120%);transition:transform .65s ease;pointer-events:none}
  .btn:hover:after{transform:translateX(120%)}
  .sidebar{transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .3s}
  .sidebar.is-hidden{transform:translate(-50%,-115%);opacity:.35}
  @media(prefers-reduced-motion:reduce){.reveal,.hero-copy>*{opacity:1;transform:none;animation:none!important}.sidebar{transition:none}}
`;
document.head.appendChild(style);

if(!reduced){
  document.querySelectorAll('.project,.panel,.quick-row>div,.timeline-list>div,.interest-row').forEach((el,i)=>{
    el.classList.add('reveal');
    el.style.transitionDelay=`${Math.min(i*35,180)}ms`;
  });

  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  const visual=document.querySelector('.hero-visual');
  const frames=document.querySelectorAll('.hero-frame');
  const mainOrb=document.querySelector('.orb-main');
  const smallOrb=document.querySelector('.orb-small');
  if(visual){
    visual.addEventListener('pointermove',e=>{
      const r=visual.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      frames.forEach((el,i)=>{
        const base=i===0?'rotate(-8deg)':'rotate(4deg)';
        el.style.transform=`${base} translate3d(${x*(i===0?-10:15)}px,${y*(i===0?-7:12)}px,0)`;
      });
      if(mainOrb) mainOrb.style.transform=`translate3d(${x*18}px,${y*14}px,0)`;
      if(smallOrb) smallOrb.style.transform=`translate3d(${x*-24}px,${y*-18}px,0)`;
    });
    visual.addEventListener('pointerleave',()=>{
      frames.forEach((el,i)=>el.style.transform=i===0?'rotate(-8deg)':'rotate(4deg)');
      if(mainOrb) mainOrb.style.transform='';
      if(smallOrb) smallOrb.style.transform='';
    });
  }

  const sidebar=document.querySelector('.sidebar');
  let lastY=window.scrollY;
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(sidebar && y>120) sidebar.classList.toggle('is-hidden',y>lastY+8);
    if(sidebar && y<80) sidebar.classList.remove('is-hidden');
    lastY=y;
  },{passive:true});
}
