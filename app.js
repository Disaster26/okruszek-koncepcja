(function(){
var d=document;
var rok=d.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
/* menu mobilne */
var b=d.querySelector('.burger'),p=d.getElementById('panel');
function zamknij(){p.classList.remove('on');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');d.body.style.overflow=''}
b.addEventListener('click',function(){var on=!p.classList.contains('on');if(!on)return zamknij();p.classList.add('on');b.setAttribute('aria-expanded','true');b.setAttribute('aria-label','Zamknij menu');d.body.style.overflow='hidden'});
p.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){zamknij();lbZamknij()}});
/* pasek akcji po przewinięciu za przycisk z hero */
var mob=d.getElementById('mob'),cta=d.getElementById('heroCta');
if('IntersectionObserver' in window){
new IntersectionObserver(function(en){var e=en[0];mob.classList.toggle('widac',!e.isIntersecting&&e.boundingClientRect.top<0)}).observe(cta);
var mapa=d.getElementById('mapa');
new IntersectionObserver(function(en,o){if(en[0].isIntersecting){var f=d.createElement('iframe');f.src=mapa.getAttribute('data-src');f.title='Mapa dojazdu do żłobka Okruszek';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(f);o.disconnect()}},{rootMargin:'300px'}).observe(mapa);
}
/* galeria: przeciąganie myszą, strzałki */
var tor=d.getElementById('tor'),x0=0,s0=0,ciag=false,ruch=0;
tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;ruch=0;x0=e.clientX;s0=tor.scrollLeft;tor.classList.add('drag')});
window.addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;ruch=Math.max(ruch,Math.abs(dx));tor.scrollLeft=s0-dx});
window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;tor.classList.remove('drag')});
tor.addEventListener('dragstart',function(e){e.preventDefault()});
d.querySelectorAll('.strz button').forEach(function(btn){btn.addEventListener('click',function(){var k=+btn.getAttribute('data-k');var it=tor.querySelector('button');var st=it?it.getBoundingClientRect().width+22:300;tor.scrollBy({left:k*st*2,behavior:'smooth'})})});
/* lightbox */
var lb=d.getElementById('lb'),lbi=d.getElementById('lbimg'),el=[].slice.call(tor.querySelectorAll('button')),idx=0;
function pokaz(i){idx=(i+el.length)%el.length;lbi.src=el[idx].getAttribute('data-full');lbi.alt=el[idx].querySelector('img').alt}
el.forEach(function(it,i){it.addEventListener('click',function(e){if(ruch>6){e.preventDefault();return}pokaz(i);lb.classList.add('on');d.body.style.overflow='hidden';lb.querySelector('.x').focus()})});
function lbZamknij(){if(!lb.classList.contains('on'))return;lb.classList.remove('on');d.body.style.overflow='';el[idx].focus()}
lb.querySelector('.x').addEventListener('click',lbZamknij);
lb.querySelector('.p').addEventListener('click',function(){pokaz(idx-1)});
lb.querySelector('.n').addEventListener('click',function(){pokaz(idx+1)});
lb.addEventListener('click',function(e){if(e.target===lb)lbZamknij()});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)pokaz(idx+(dx<0?1:-1))});
/* formularz pokazowy */
d.getElementById('form').addEventListener('submit',function(e){e.preventDefault();d.getElementById('ok').style.display='block'});
})();
