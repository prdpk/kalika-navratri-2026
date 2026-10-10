const days = FESTIVAL_DAYS;
const PENDING = "मानकऱ्यांची नावे लवकरच जाहीर होतील";
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const iconSVG = (id, cls = "") => `<svg class="i${cls ? " " + cls : ""}" aria-hidden="true" focusable="false"><use href="#i-${id}"/></svg>`;
// Every मानकरी is shown as "श्री. नाव" — normalises "श्री.नाव", "श्री नाव" or a missing prefix.
const withShri = name => "श्री. " + String(name).trim().replace(/^श्री\.?\s*/, "");

function namesHTML(list){
 if(!list.length) return `<p class="names-pending">${PENDING}</p>`;
 return `<ol class="names">${list.map(p=>{
  const {name, role, noPrefix} = Array.isArray(p) ? {name:p[0], role:p[1]} : typeof p === "object" ? p : {name:p};
  return `<li><span>${esc(noPrefix ? name : withShri(name))}</span>${role ? `<em>${esc(role)}</em>` : ""}</li>`;
 }).join("")}</ol>`;
}

/* ---------- Nine-day schedule ---------- */
let selected = 0;
const list = $("dayList"), dots = $("dots"), detail = $("dayDetail");
const cards = days.map((day,index)=>{
 const button = document.createElement("button");
 button.type = "button";
 button.className = "day-card";
 button.innerHTML = `<span class="day-icon">${iconSVG(day.icon)}</span><span class="day-meta">माळ ${day.number}</span><span class="day-name">${esc(day.name)}</span><span class="day-group"><span class="sr-only">, </span>${esc(day.group)}</span>`;
 button.addEventListener("click",()=>{ selectDay(index); revealDetail(); });
 list.appendChild(button);
 return button;
});
const dotEls = days.map(()=>dots.appendChild(document.createElement("span")));

function selectDay(index){
 selected = Math.max(0, Math.min(days.length-1, index));
 const day = days[selected];
 $("detailNumber").textContent = "माळ " + day.number;
 $("detailIcon").setAttribute("href", "#i-" + day.icon);
 $("detailTitle").textContent = day.name;
 $("detailGroup").textContent = day.group;
 $("detailAarti").innerHTML = namesHTML(day.aarti);
 replay(detail.querySelector(".detail-head")); replay($("detailAarti"));
 $("detailProgress").textContent = day.number + " / ९";
 $("prevDay").disabled = selected === 0;
 $("nextDay").disabled = selected === days.length-1;
 cards.forEach((card,i)=>{ card.classList.toggle("active", i===selected); card.setAttribute("aria-pressed", String(i===selected)); });
 dotEls.forEach((dot,i)=>dot.classList.toggle("on", i===selected));
}
// Restart the short fade used when the selected day changes.
function replay(el){ el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); }
// On single-column layouts the detail card sits below the grid, so bring it into view after a tap.
function revealDetail(){
 if(!window.matchMedia("(max-width: 860px)").matches) return;
 const rect = detail.getBoundingClientRect();
 if(rect.top < 70 || rect.bottom > window.innerHeight) detail.scrollIntoView({behavior:"smooth", block:"start"});
}
$("prevDay").addEventListener("click",()=>selectDay(selected-1));
$("nextDay").addEventListener("click",()=>selectDay(selected+1));
let touchX = null;
detail.addEventListener("touchstart",e=>{ touchX = e.touches[0].clientX; },{passive:true});
detail.addEventListener("touchend",e=>{
 if(touchX === null) return;
 const dx = e.changedTouches[0].clientX - touchX; touchX = null;
 if(Math.abs(dx) > 50) selectDay(selected + (dx < 0 ? 1 : -1));
});

/* ---------- आरतीचे मानकरी (all days) ---------- */
// Collapsible on phones (one माळ at a time), always open from tablet width up.
const mankariGrid = $("mankariGrid");
mankariGrid.innerHTML = days.map(day=>`
 <details class="mankari-card${day.aarti.length ? "" : " is-pending"}">
  <summary><span class="day-icon">${iconSVG(day.icon)}</span><div><h3>माळ ${day.number}</h3><p>${esc(day.name)}${day.aarti.length ? ` · ${day.aarti.length.toLocaleString("mr-IN")} मानकरी` : ""}</p></div><svg class="i chev" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></summary>
  ${namesHTML(day.aarti)}
 </details>`).join("");
const mankariCards = [...mankariGrid.querySelectorAll("details")];
const wide = window.matchMedia("(min-width: 768px)");
function syncMankari(){ mankariCards.forEach(card=>{ card.open = wide.matches; }); }
syncMankari();
wide.addEventListener("change", syncMankari);
mankariCards.forEach(card=>card.querySelector("summary").addEventListener("click",e=>{ if(wide.matches) e.preventDefault(); }));

/* ---------- Mobile menu ---------- */
const nav = $("nav"), menuToggle = $("menuToggle");
function setMenu(open){
 nav.classList.toggle("open", open);
 menuToggle.setAttribute("aria-expanded", String(open));
 menuToggle.setAttribute("aria-label", open ? "मेन्यू बंद करा" : "मेन्यू उघडा");
}
menuToggle.addEventListener("click",()=>setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a,button").forEach(el=>el.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{ if(e.key==="Escape" && nav.classList.contains("open")){ setMenu(false); menuToggle.focus(); } });

/* ---------- Share ---------- */
const toast = $("toast"); let toastTimer;
function showToast(message){
 toast.textContent = message; toast.classList.add("show");
 clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove("show"), 3200);
}
const shareUrl = () => location.origin + location.pathname;
async function shareInvite(){
 const shareData = {title:"नवरात्रोत्सव २०२६ | कालिका देवी, पाटोदा",text:"॥ श्री कालिका देवी सुप्रसन्न ॥\nश्री. कालिका देवी नवरात्र उत्सव मंडळ, पाटोदा\nनवरात्रोत्सव २०२६ — भक्ती • संस्कृती • आनंद • एकत्रित उत्सव\n\nनऊ माळांचे उपक्रम, आरतीचे मानकरी, वेळ व स्थळ पाहण्यासाठी हे डिजिटल आमंत्रण उघडा:",url:shareUrl()};
 if(navigator.share){ try{ await navigator.share(shareData); }catch(e){ if(e.name!=="AbortError") showToast("शेअर करता आले नाही. कृपया लिंक कॉपी करा."); } }
 else if(navigator.clipboard && location.protocol!=="file:"){ try{ await navigator.clipboard.writeText(shareUrl()); showToast("आमंत्रणाची लिंक कॉपी झाली. आता WhatsApp वर शेअर करा."); }catch(e){ fallbackCopy(); } }
 else fallbackCopy();
}
function fallbackCopy(){
 const area = document.createElement("textarea"); area.value = shareUrl(); document.body.appendChild(area); area.select();
 try{ document.execCommand("copy"); showToast("लिंक कॉपी झाली. आता WhatsApp वर शेअर करा."); }catch(e){ showToast("वेबसाइट प्रकाशित झाल्यावर हा शेअर पर्याय वापरा."); }
 area.remove();
}
["shareTop","shareHero","shareBottom"].forEach(id=>$(id).addEventListener("click",shareInvite));

/* ---------- Reveal sections on scroll ---------- */
if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
 const io = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){ entry.target.classList.add("in"); io.unobserve(entry.target); }
 }),{rootMargin:"0px 0px -8% 0px"});
 document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
 window.addEventListener("beforeprint",()=>document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in")));
}else document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in"));

selectDay(0);
// The first render shouldn't play the "day changed" fade.
document.querySelectorAll(".swap").forEach(el=>el.classList.remove("swap"));
