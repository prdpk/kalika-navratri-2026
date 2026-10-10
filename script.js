const days = [
 {number:"१",name:"लिंबू-चमचा व फुगे खेळ",group:"लहान गट (मुले / मुली)"},
 {number:"२",name:"संगीत खुर्ची",group:"लहान गट (मुले / मुली)"},
 {number:"३",name:"दांडिया",group:"ज्येष्ठ गट महिला"},
 {number:"४",name:"संगीत खुर्ची",group:"ज्येष्ठ गट महिला"},
 {number:"५",name:"नृत्य स्पर्धा",group:"लहान गट (मुले / मुली)"},
 {number:"६",name:"दांडिया",group:"लहान गट (मुले / मुली)"},
 {number:"७",name:"ग्लास गेम",group:"ज्येष्ठ गट पुरुष"},
 {number:"८",name:"निबंध लेखन स्पर्धा",group:"लहान गट (मुले / मुली)"},
 {number:"९",name:"खेळ पैठणी",group:"ज्येष्ठ गट महिला"}
];
let selected = 0;
const $ = id => document.getElementById(id);
const list = $("dayList"), dots = $("dots"), detail = $("dayDetail");
const cards = days.map((day,index)=>{
 const button=document.createElement("button");
 button.type="button";
 button.className="day-card";
 button.setAttribute("aria-label",`माळ ${day.number}: ${day.name}`);
 button.innerHTML=`<span class="day-num">${day.number}</span><span class="day-meta">माळ ${day.number}</span><span class="day-name">${day.name}</span>`;
 button.addEventListener("click",()=>{selectDay(index);revealDetail();});
 list.appendChild(button);
 return button;
});
const dotEls = days.map(()=>dots.appendChild(document.createElement("span")));
function selectDay(index){
 selected=Math.max(0,Math.min(days.length-1,index));
 const day=days[selected];
 $("detailNumber").textContent="माळ "+day.number;
 $("detailNumeral").textContent=day.number;
 $("detailTitle").textContent=day.name;
 $("detailGroup").textContent=day.group;
 $("detailProgress").textContent=day.number+" / ९";
 $("prevDay").disabled=selected===0;
 $("nextDay").disabled=selected===days.length-1;
 cards.forEach((card,i)=>{card.classList.toggle("active",i===selected);card.setAttribute("aria-pressed",String(i===selected));});
 dotEls.forEach((dot,i)=>dot.classList.toggle("on",i===selected));
}
// On single-column layouts the detail card sits below the grid, so bring it into view after a tap.
function revealDetail(){
 if(!window.matchMedia("(max-width: 860px)").matches)return;
 const rect=detail.getBoundingClientRect();
 if(rect.top<70||rect.bottom>window.innerHeight)detail.scrollIntoView({behavior:"smooth",block:"start"});
}
$("prevDay").addEventListener("click",()=>selectDay(selected-1));
$("nextDay").addEventListener("click",()=>selectDay(selected+1));
let touchX=null;
detail.addEventListener("touchstart",e=>{touchX=e.touches[0].clientX},{passive:true});
detail.addEventListener("touchend",e=>{
 if(touchX===null)return;
 const dx=e.changedTouches[0].clientX-touchX;touchX=null;
 if(Math.abs(dx)>50)selectDay(selected+(dx<0?1:-1));
});

const nav=$("nav"),menuToggle=$("menuToggle");
function setMenu(open){nav.classList.toggle("open",open);menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"मेन्यू बंद करा":"मेन्यू उघडा");}
menuToggle.addEventListener("click",()=>setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a,button").forEach(el=>el.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false);});

const toast=$("toast");let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);}
async function shareInvite(){
 const shareData={title:"नवरात्रोत्सव २०२६ | कालिका देवी, पाटोदा",text:"॥ श्री कालिका देवी सुप्रसन्न ॥\nश्री. कालिका देवी नवरात्र उत्सव मंडळ, पाटोदा\nनवरात्रोत्सव २०२६ — भक्ती • संस्कृती • आनंद • एकत्रित उत्सव\n\nनऊ माळांचे उपक्रम, वेळ व स्थळ पाहण्यासाठी हे डिजिटल आमंत्रण उघडा:",url:location.href};
 if(navigator.share){try{await navigator.share(shareData)}catch(e){if(e.name!=="AbortError")showToast("शेअर करता आले नाही. कृपया लिंक कॉपी करा.")}}
 else if(navigator.clipboard && location.protocol!=="file:"){try{await navigator.clipboard.writeText(location.href);showToast("आमंत्रणाची लिंक कॉपी झाली. आता WhatsApp वर शेअर करा.")}catch(e){fallbackCopy()}}
 else fallbackCopy();
}
function fallbackCopy(){
 const area=document.createElement("textarea");area.value=location.href;document.body.appendChild(area);area.select();
 try{document.execCommand("copy");showToast("लिंक कॉपी झाली. आता WhatsApp वर शेअर करा.")}catch(e){showToast("वेबसाइट प्रकाशित झाल्यावर हा शेअर पर्याय वापरा.")}
 area.remove();
}
["shareTop","shareHero","shareBottom"].forEach(id=>$(id).addEventListener("click",shareInvite));
selectDay(0);
