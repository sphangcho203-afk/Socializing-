const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav nav a')];
const setActive=()=>{let current='home';for(const section of sections){if(window.scrollY+window.innerHeight*.32>=section.offsetTop)current=section.id}navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+current))};
window.addEventListener('scroll',setActive,{passive:true});setActive();
if(!reduced){
 const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}})},{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
 const cursor=document.querySelector('.cursor');
 if(cursor){window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'},{passive:true});document.querySelectorAll('a,button,.planet,.project,.word-field span').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-active'));el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-active'))})}
 const stage=document.querySelector('.hero-stage');
 if(stage){stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stage.style.transform=`perspective(1200px) rotateX(${y*-3}deg) rotateY(${x*4}deg)`;const orb=stage.querySelector('.glass-orb');if(orb)orb.style.margin=`${y*-12}px ${x*12}px`});stage.addEventListener('pointerleave',()=>{stage.style.transform='';const orb=stage.querySelector('.glass-orb');if(orb)orb.style.margin=''})}
 document.querySelectorAll('.project').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) translateY(-7px) rotateX(${y*-2}deg) rotateY(${x*2}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
}
