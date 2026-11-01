(function(){
var C=window.SITE||{},$=function(i){return document.getElementById(i)},all=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
var IMG={bg:"bg",bg2:"bg2",sc:"sc",gw:"gw",mil:"mil",hya:"hya"};function src(k){return"/img/"+k+".jpg"}
function link(t,u){var a=document.createElement("a");a.href=u;a.target="_blank";a.rel="noopener";a.textContent=t;return a}
/* reviews, socials, email from config.js */
all(".js-reviews").forEach(function(a){if(C.GOOGLE_REVIEWS)a.href=C.GOOGLE_REVIEWS;else{a.removeAttribute("target");a.outerHTML="<span>"+a.textContent+"</span>"}});
var soc=[["Instagram",C.INSTAGRAM],["Facebook",C.FACEBOOK]].filter(function(x){return x[1]});
all(".js-social").forEach(function(el){
  soc.forEach(function(x,k){if(k)el.appendChild(document.createTextNode(" · "));el.appendChild(link(x[0],x[1]))});
  if(soc.length){el.hidden=false;var dt=el.previousElementSibling;if(dt&&dt.classList.contains("js-soc-dt"))dt.hidden=false}
});
if(C.EMAIL){
  var ea=$("c-email");if(ea){ea.href="mailto:"+C.EMAIL;ea.textContent=C.EMAIL;$("c-email-dt").hidden=false;$("c-email-dd").hidden=false}
  var eb=$("c-email-btn");if(eb){eb.href="mailto:"+C.EMAIL+"?subject="+encodeURIComponent("Macaw adoption question");eb.hidden=false}
}
/* offline notice + broken photos */
var net=$("net");function nc(){net.hidden=navigator.onLine!==false}window.addEventListener("online",nc);window.addEventListener("offline",nc);nc();
document.addEventListener("error",function(e){var t=e.target;if(t&&t.tagName==="IMG"&&t.parentElement)t.parentElement.classList.add("noimg")},true);

/* ===== Home: carousel ===== */
var slide=$("slide");
if(slide){
  var S=[{n:"Blue-and-gold macaw",d:"Friendly, bold and a classic family favorite.",s:"Ara ararauna",k:"bg"},{n:"Military macaw",d:"Calm green giant with a gentle, curious nature.",s:"Ara militaris",k:"mil"},{n:"Hyacinth macaw",d:"The largest parrot: deep cobalt, gentle and affectionate.",s:"Anodorhynchus hyacinthinus",k:"hya"},{n:"Scarlet macaw",d:"Brilliant red, yellow and blue with a big personality.",s:"Ara macao",k:"sc"}];
  var i=0,dots=$("dots");
  slide.innerHTML="";
  var L=S.map(function(s,k){var im=document.createElement("img");im.alt="";im.decoding="async";im.width=800;im.height=800;if(k)im.loading="lazy";im.src=src(s.k);slide.appendChild(im);dots.appendChild(document.createElement("span"));return im});
  slide.insertAdjacentHTML("beforeend",'<span class="cap"><b></b><small></small><em></em></span>');
  var draw=function(){var s=S[i];L.forEach(function(im,k){im.classList.toggle("on",k===i)});
    slide.querySelector("b").textContent=s.n;slide.querySelector("small").textContent=s.s;slide.querySelector("em").textContent=s.d;
    slide.setAttribute("aria-label",s.n+". Show next macaw");
    all("#dots span").forEach(function(d,k){d.classList.toggle("on",k===i)})};
  var go=function(n){i=(i+n+S.length)%S.length;draw()};
  slide.addEventListener("click",function(){go(1)});$("next").addEventListener("click",function(){go(1)});$("prev").addEventListener("click",function(){go(-1)});
  document.querySelector(".stage").addEventListener("keydown",function(e){if(e.key==="ArrowLeft")go(-1);else if(e.key==="ArrowRight")go(1)});
  draw();
}

/* ===== Available: birds (SAMPLE listings, replace with real birds) ===== */
var grid=$("birds");
if(grid){
  var BIRDS=[
    {id:"b1",species:"Blue-and-gold macaw",sci:"Ara ararauna",img:"bg",age:"Baby, about 4 months",status:"available"},
    {id:"b2",species:"Military macaw",sci:"Ara militaris",img:"mil",age:"Baby, about 5 months",status:"available"},
    {id:"b3",species:"Scarlet macaw",sci:"Ara macao",img:"sc",age:"Baby, about 3 months",status:"available"},
    {id:"b4",species:"Hyacinth macaw",sci:"Anodorhynchus hyacinthinus",img:"hya",age:"Baby, about 6 months",status:"reserved"},
    {id:"b5",species:"Blue-and-gold macaw",sci:"Ara ararauna",img:"bg2",age:"Juvenile, about 1 year",status:"reserved"},
    {id:"b6",species:"Green-winged macaw",sci:"Ara chloropterus",img:"gw",age:"Juvenile, about 8 months",status:"sold"}];
  var LABEL={available:"Available",reserved:"Reserved",sold:"Sold"},filter="all",cnt=$("av-count"),emp=$("av-empty");
  var render=function(){
    var list=BIRDS.filter(function(b){return filter==="all"||b.status===filter});grid.innerHTML="";
    list.forEach(function(b){
      var art=document.createElement("article");art.className="bird"+(b.status==="sold"?" sold":"");art.id="bird-"+b.id;
      var note=b.status==="sold"?"I'm interested in a "+b.species+" like the one listed as sold.":"I'm asking about the "+b.species+" ("+b.age+", "+LABEL[b.status].toLowerCase()+").";
      art.innerHTML='<div class="ph"><img loading="lazy" decoding="async" width="800" height="800"><span class="badge s-'+b.status+'"></span></div><div class="bb"><h3></h3><small></small><p class="age"></p><a class="btn"></a></div>';
      var im=art.querySelector("img");im.src=src(b.img);im.alt=b.species;
      art.querySelector(".badge").textContent=LABEL[b.status];art.querySelector("h3").textContent=b.species;art.querySelector("small").textContent=b.sci;art.querySelector(".age").textContent=b.age;
      var a=art.querySelector(".btn");if(b.status==="sold")a.classList.add("alt");a.textContent=b.status==="sold"?"Ask about similar birds":"Ask about this bird";
      a.href="/contact?bird="+encodeURIComponent(b.species)+"&note="+encodeURIComponent(note);
      grid.appendChild(art)});
    cnt.textContent=list.length+(list.length===1?" bird":" birds")+(filter==="all"?"":" · "+LABEL[filter]);emp.hidden=list.length>0};
  $("filters").addEventListener("click",function(e){var c=e.target.closest(".chip");if(!c)return;filter=c.getAttribute("data-f");
    all(".chip").forEach(function(x){x.setAttribute("aria-pressed",x===c?"true":"false")});render()});
  render();
  var hl=function(){var m=/^#bird-([\w-]+)$/.exec(location.hash),g=$("av-gone");if(!m){g.hidden=true;return}
    var c=$("bird-"+m[1]);if(c){g.hidden=true;c.scrollIntoView({block:"center"});c.classList.add("hl");setTimeout(function(){c.classList.remove("hl")},2500)}else g.hidden=false};
  window.addEventListener("hashchange",hl);hl();
}

/* ===== Contact form ===== */
var sendB=$("m-send");
if(sendB){
  var sel=$("m-bird"),txt=$("m-text"),nameEl=$("m-name"),st=$("m-status"),emailBtn=$("m-email"),q=new URLSearchParams(location.search);
  var qb=q.get("bird");if(qb)all("#m-bird option").forEach(function(o){if(o.text===qb)sel.value=o.text});
  if(q.get("note"))txt.value=q.get("note").slice(0,400);
  if(C.EMAIL){emailBtn.hidden=false;emailBtn.className="btn";sendB.className="btn alt"}
  else document.querySelector(".msg small").textContent="Texting opens the Messages app on a phone. On a computer, copy the message or call. Nothing is sent until you press send.";
  var say=function(t){st.textContent=t;if(t)setTimeout(function(){if(st.textContent===t)st.textContent=""},6000)};
  var setErr=function(inp,id,t){$(id).textContent=t;if(t)inp.setAttribute("aria-invalid","true");else inp.removeAttribute("aria-invalid")};
  nameEl.addEventListener("input",function(){if(nameEl.value.trim())setErr(nameEl,"e-name","")});
  txt.addEventListener("input",function(){if(txt.value.trim())setErr(txt,"e-text","")});
  var valid=function(){var a=!!nameEl.value.trim(),b=!!txt.value.trim();
    setErr(nameEl,"e-name",a?"":"Please add your name so Megan knows who is writing.");setErr(txt,"e-text",b?"":"Please write a short message. One line is fine.");
    if(!a)nameEl.focus();else if(!b)txt.focus();if(!(a&&b))say("");return a&&b};
  var msg=function(){return"Hi Megan, this is "+nameEl.value.trim()+". I’m interested in: "+sel.value+". "+txt.value.trim()};
  var phone=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Macintosh/.test(navigator.userAgent));
  sendB.addEventListener("click",function(){if(!valid())return;
    if(!phone){say("Texting only works from a phone. "+(C.EMAIL?"Use email, copy the message, or call":"Copy the message or call")+" +1 805-259-3980.");return}
    location.href="sms:"+C.PHONE+"?&body="+encodeURIComponent(msg());say("Opening your messages app.")});
  emailBtn.addEventListener("click",function(){if(!valid())return;
    location.href="mailto:"+C.EMAIL+"?subject="+encodeURIComponent("Macaw adoption question")+"&body="+encodeURIComponent(msg());
    say("Opening your email app. If nothing opens, copy the message and email "+C.EMAIL+".")});
  $("m-copy").addEventListener("click",function(){if(!valid())return;var m=msg();
    var fb=function(){var ta=document.createElement("textarea");ta.value=m;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}document.body.removeChild(ta);say(ok?"Message copied.":"Could not copy. Select the text and copy it by hand.")};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(m).then(function(){say("Message copied.")},fb);else fb()});
}

/* ===== Error variants (404.html) ===== */
var ec=$("err-code");
if(ec){
  var E={"403":["That area is private","There is nothing to log in to here. This is a simple site: browse the birds or get in touch."],"410":["That bird has found a home","That listing isn’t here any more. See who is available now, or ask Megan about upcoming babies."],"500":["Something went wrong","Please try again, or call or text Megan at +1 805-259-3980."],"503":["Back shortly","The site is briefly unavailable. Please try again soon."]};
  var p=location.pathname.toLowerCase(),qe=new URLSearchParams(location.search).get("e");
  var k=qe&&E[qe]?qe:/\/(admin|login|wp-admin|dashboard|cpanel)/.test(p)?"403":/\/(bird|birds|listing|listings|sold)/.test(p)?"410":null;
  if(k){ec.textContent=k;$("err-title").textContent=E[k][0];$("err-msg").textContent=E[k][1];document.title=E[k][0]+" | Megan’s Macaw Aviary"}
}
})();
