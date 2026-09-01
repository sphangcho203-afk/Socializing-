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
if(!reduced){
  document.querySelectorAll('.project,.panel').forEach((el,i)=>{
    el.style.transitionDelay=`${Math.min(i*18,120)}ms`;
  });
}
