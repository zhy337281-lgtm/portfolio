function setLang(lang){
 if(!['en','zh','ja'].includes(lang))lang='en';
 document.documentElement.lang=lang==='zh'?'zh-CN':lang;
 document.querySelectorAll('[data-en]').forEach(el=>{el.textContent=el.dataset[lang]||el.dataset.en;});
 if(lang==='ja')document.querySelectorAll('[data-person-name]').forEach(el=>{
  el.replaceChildren();
  [['鄒','スウ'],['浩楊','コウヨウ']].forEach(([name,reading],index)=>{
   if(index)el.append(document.createTextNode(' '));
   const ruby=document.createElement('ruby'),rt=document.createElement('rt');
   ruby.append(document.createTextNode(name));rt.textContent=reading;ruby.append(rt);el.append(ruby);
  });
 });
 document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));
 try{localStorage.setItem('portfolio-language',lang);}catch{}
}
document.querySelectorAll('[data-lang]').forEach(el=>el.addEventListener('click',()=>setLang(el.dataset.lang)));
const menu=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));links.classList.toggle('open',open);});
document.querySelectorAll('.nav-link').forEach(el=>el.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){links.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
try{setLang(localStorage.getItem('portfolio-language')||'en');}catch{setLang('en');}
