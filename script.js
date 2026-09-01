const repair=document.createElement('link');repair.rel='stylesheet';repair.href='repair.css';document.head.appendChild(repair);
const sections=[...document.querySelectorAll('main section[id]')];
const nav=[...document.querySelectorAll('.nav nav a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id))},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.15,.4]});
sections.forEach(s=>observer.observe(s));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');revealObserver.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>revealObserver.observe(e));
const art=document.querySelector('.hero-art');if(art){art.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;art.querySelectorAll('.portrait').forEach((el,i)=>{const n=[10,-8,7,-5][i]||4;el.style.marginLeft=`${x*n}px`;el.style.marginTop=`${y*n}px`})});art.addEventListener('pointerleave',()=>art.querySelectorAll('.portrait').forEach(el=>{el.style.marginLeft='';el.style.marginTop=''}))}}
