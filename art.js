// Colour illustrations (64×64, inline SVG). Parts with an a-* class are animated in styles.css.
// Use art("id") to get markup; data.js refers to activity art by these ids.
const ART = (() => {
 const svg = (id, body) => `<svg class="art art-${id}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${body}</svg>`;
 const ring = (n, cy, rx, ry, fill) => Array.from({length:n}, (_, k) =>
  `<ellipse cx="32" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" transform="rotate(${k * 360 / n} 32 28)"/>`).join("");
 const star = (x, y, s, fill, cls = "a-twinkle") =>
  `<path class="${cls}" fill="${fill}" d="M${x} ${y - s}l${s * .35} ${s * .65} ${s * .65} ${s * .35}-${s * .65} ${s * .35}-${s * .35} ${s * .65}-${s * .35}-${s * .65}-${s * .65}-${s * .35} ${s * .65}-${s * .35}z"/>`;

 return {
  // लिंबू-चमचा व फुगे खेळ — lemon on a spoon, with a balloon
  lemon: svg("lemon", `
   <g class="a-bob"><path d="M47 30.5q-2 5 0 8t-1 6" stroke="#b9a58a" stroke-width="1.2" fill="none"/>
    <ellipse cx="47" cy="18" rx="9" ry="11" fill="#e8453c"/><ellipse cx="44" cy="13.5" rx="2.6" ry="4" fill="#fff" opacity=".45"/>
    <path d="M45.2 28.6h3.6l-1.8 2.6z" fill="#c2302a"/></g>
   <path d="M8 57 27 38" stroke="#a9b2bc" stroke-width="4.6" stroke-linecap="round"/>
   <path d="M9.6 54.6 25.8 38.4" stroke="#eef2f5" stroke-width="1.2" stroke-linecap="round"/>
   <ellipse cx="33" cy="32" rx="12" ry="8.5" transform="rotate(-45 33 32)" fill="#dfe5ea" stroke="#9aa4ae" stroke-width="1.5"/>
   <g class="a-wobble">
    <ellipse cx="33" cy="30.5" rx="8.5" ry="6.5" transform="rotate(-45 33 30.5)" fill="#ffd43b" stroke="#e3a600" stroke-width="1.2"/>
    <circle cx="39" cy="24.5" r="1.6" fill="#e9b800"/><circle cx="27" cy="36.5" r="1.6" fill="#e9b800"/>
    <ellipse cx="31" cy="28" rx="3" ry="1.6" transform="rotate(-45 31 28)" fill="#fff" opacity=".55"/>
    <path d="M39.5 24.2q4-3.5 7.5-1.8-3.4 3.4-7.5 1.8z" fill="#4caf50"/></g>`),

  // संगीत खुर्ची — chair with floating music notes
  chair: svg("chair", `
   <ellipse cx="30" cy="58" rx="18" ry="2.2" fill="#000" opacity=".1"/>
   <rect x="14" y="8" width="7" height="49" rx="2.5" fill="#8d4b2b"/>
   <rect x="15.6" y="11" width="3.8" height="17" rx="1.5" fill="#b8693e"/>
   <rect x="18" y="47" width="24" height="3" rx="1.5" fill="#a4592f"/>
   <rect x="40" y="39" width="5" height="18" rx="2" fill="#7a3f22"/>
   <rect x="14" y="36.5" width="32" height="4.5" rx="1.5" fill="#8d4b2b"/>
   <rect x="14" y="30.5" width="32" height="7" rx="3" fill="#c62f45"/>
   <rect x="16" y="31" width="28" height="2" rx="1" fill="#e45a6d"/>
   <g class="a-note1" fill="#7b3fe4"><ellipse cx="40" cy="22" rx="3.6" ry="2.8" transform="rotate(-20 40 22)"/><rect x="42.6" y="9" width="1.8" height="13" rx=".9"/><path d="M44.4 9q5 2 4 7-1-3-4-3.5z"/></g>
   <g class="a-note2" fill="#1e88e5"><ellipse cx="50" cy="16" rx="3" ry="2.3" transform="rotate(-20 50 16)"/><ellipse cx="58" cy="13.5" rx="3" ry="2.3" transform="rotate(-20 58 13.5)"/><rect x="52.2" y="4" width="1.6" height="12" rx=".8"/><rect x="60.2" y="1.6" width="1.6" height="11.8" rx=".8"/><path d="M52.2 4l9.6-2.6v2.8l-9.6 2.6z"/></g>`),

  // दांडिया — a pair of striped dandiya sticks tapping together
  dandiya: svg("dandiya", `
   <g transform="rotate(-24 32 40)"><g class="a-tap-l">
    <rect x="29" y="6" width="6" height="50" rx="3" fill="#d63447"/>
    <rect x="29" y="14" width="6" height="3" fill="#ffd23f"/><rect x="29" y="21" width="6" height="2.4" fill="#2e9e57"/>
    <rect x="29" y="38" width="6" height="2.4" fill="#2e9e57"/><rect x="29" y="44" width="6" height="3" fill="#ffd23f"/>
    <circle cx="32" cy="6.5" r="3.2" fill="#ffd23f"/><path d="M32 55l-3.2 7h6.4z" fill="#ff9800"/></g></g>
   <g transform="rotate(24 32 40)"><g class="a-tap-r">
    <rect x="29" y="6" width="6" height="50" rx="3" fill="#1e7fd6"/>
    <rect x="29" y="14" width="6" height="3" fill="#ff9800"/><rect x="29" y="21" width="6" height="2.4" fill="#ff5c8a"/>
    <rect x="29" y="38" width="6" height="2.4" fill="#ff5c8a"/><rect x="29" y="44" width="6" height="3" fill="#ff9800"/>
    <circle cx="32" cy="6.5" r="3.2" fill="#ff9800"/><path d="M32 55l-3.2 7h6.4z" fill="#ffd23f"/></g></g>
   ${star(32, 9, 6, "#ffcf3f", "a-spark")}`),

  // नृत्य स्पर्धा — dancer in a flared ghagra
  dance: svg("dance", `
   <ellipse cx="32" cy="60" rx="15" ry="2" fill="#000" opacity=".12"/>
   <g class="a-sway">
    <path d="M25 31h14l11 23q-18 7-36 0z" fill="#1f8a5b"/>
    <path d="M29 31l-5 25M35 31l5 25M32 31v26" stroke="#17704a" stroke-width="1.3"/>
    <path d="M15.5 51q16.5 6 33 0" stroke="#d6334a" stroke-width="1.5" fill="none"/>
    <path d="M14 54q18 7 36 0" stroke="#f4c430" stroke-width="3.5" fill="none"/>
    <rect x="25" y="28.8" width="14" height="3.6" rx="1.5" fill="#f4c430"/>
    <path d="M37.5 20q10 3 13 16-6-6-12-8z" fill="#ff8fb0"/>
    <path d="M26.5 19.5q5.5-3 11 0l1 10h-13z" fill="#d6334a"/>
    <path d="M27 21 19 12M37 21l8-9.5" stroke="#9c5b34" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="21" cy="14.2" r="1.7" fill="none" stroke="#f4c430" stroke-width="1.2"/><circle cx="43" cy="14.2" r="1.7" fill="none" stroke="#f4c430" stroke-width="1.2"/>
    <rect x="30.8" y="14.5" width="2.4" height="4.5" fill="#9c5b34"/>
    <circle cx="32" cy="11" r="5" fill="#9c5b34"/>
    <path d="M27 11a5 5 0 0 1 10 0q-1-4.2-5-4.2T27 11z" fill="#2b1810"/>
    <circle cx="36.6" cy="6.4" r="2.6" fill="#2b1810"/><circle cx="38.6" cy="8.4" r="1.3" fill="#fff"/>
    <circle cx="32" cy="10.4" r=".75" fill="#d6334a"/></g>`),

  // ग्लास गेम — a playful pyramid of glasses
  glass: svg("glass", `
   <ellipse cx="32" cy="59.5" rx="22" ry="2" fill="#000" opacity=".1"/>
   <g><path d="M11 36h19l-2 22H13z" fill="#d9eef9" stroke="#7fb7d6" stroke-width="1.2"/><path d="M11.9 45h17.2l-1.2 13H13.1z" fill="#ff7043"/><path d="M14.2 38.5l1 17" stroke="#fff" stroke-width="1.3" opacity=".75"/></g>
   <g><path d="M34 36h19l-2 22H36z" fill="#d9eef9" stroke="#7fb7d6" stroke-width="1.2"/><path d="M34.9 45h17.2l-1.2 13H36.1z" fill="#ec407a"/><path d="M37.2 38.5l1 17" stroke="#fff" stroke-width="1.3" opacity=".75"/></g>
   <g class="a-hop"><path d="M22.5 12h19l-2 22h-15z" fill="#d9eef9" stroke="#7fb7d6" stroke-width="1.2"/><path d="M23.4 21h17.2l-1.2 13H24.6z" fill="#66bb6a"/><path d="M25.7 14.5l1 17" stroke="#fff" stroke-width="1.3" opacity=".75"/></g>
   ${star(52, 12, 4.5, "#ffcf3f")}${star(12, 20, 3.4, "#ff9800", "a-twinkle2")}`),

  // निबंध लेखन स्पर्धा — paper with a pen writing
  essay: svg("essay", `
   <rect x="12" y="10" width="34" height="46" rx="3" fill="#eadcc0"/>
   <rect x="9" y="7" width="34" height="46" rx="3" fill="#fffdf6" stroke="#d9c9a8" stroke-width="1.5"/>
   <path d="M15 15h14" stroke="#e57373" stroke-width="2" stroke-linecap="round"/>
   <path d="M15 22h22M15 28h22M15 34h22M15 40h18" stroke="#9ec5e8" stroke-width="1.5" stroke-linecap="round"/>
   <path class="a-ink" d="M15 47q2.5-3 5 0t5 0 5 0 5 0" stroke="#283593" stroke-width="1.6" fill="none" stroke-linecap="round"/>
   <g class="a-write">
    <path d="M37 45 52 26l5 4-15 19z" fill="#1e5bd6"/><path d="M49.3 29.6l4.2 3.3" stroke="#ffd23f" stroke-width="2.2"/>
    <path d="M37 45l5 4-6.6 4.4z" fill="#f4c430"/><path d="M35.6 53.2l1.2-2.2" stroke="#333" stroke-width="1"/></g>`),

  // खेळ पैठणी — folded paithani with zari border and peacock motif
  saree: svg("saree", `
   <ellipse cx="32" cy="57" rx="25" ry="2.4" fill="#000" opacity=".12"/>
   <rect x="7" y="34" width="50" height="20" rx="3" fill="#6a1b9a"/>
   <rect x="7" y="45" width="50" height="8" fill="#e6b422"/>
   <path d="M7 45l3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3" stroke="#a87908" stroke-width="1" fill="none"/>
   <path d="M7 51h50" stroke="#c62f45" stroke-width="1.2"/>
   <rect x="12" y="16" width="40" height="20" rx="3" fill="#c2185b"/>
   <rect x="12" y="29" width="40" height="7" fill="#f0c03a"/>
   <path d="M12 32.5h40" stroke="#2e9e57" stroke-width="1.6" stroke-dasharray="3 2"/>
   <path d="M30 20.6q-4 3.6-1.4 7.4h4.6q2.2-3.8-1.4-7.4z" fill="#1565c0"/><circle cx="32" cy="19.6" r="1.6" fill="#1565c0"/>
   <path d="M32 18.2l1.4-1.6M32 18.2l-1.4-1.6" stroke="#1565c0" stroke-width=".8"/>
   <circle cx="24.5" cy="25" r="2" fill="#2e9e57"/><circle cx="24.5" cy="25" r=".9" fill="#1565c0"/>
   <circle cx="25.5" cy="20.8" r="2" fill="#2e9e57"/><circle cx="25.5" cy="20.8" r=".9" fill="#1565c0"/>
   <circle cx="39.5" cy="25" r="2" fill="#2e9e57"/><circle cx="39.5" cy="25" r=".9" fill="#1565c0"/>
   <circle cx="38.5" cy="20.8" r="2" fill="#2e9e57"/><circle cx="38.5" cy="20.8" r=".9" fill="#1565c0"/>
   ${star(55, 11, 4.5, "#ffcf3f")}${star(8, 26, 3.4, "#ffe082", "a-twinkle2")}`),

  // दिवा — clay diya with a flickering flame
  diya: svg("diya", `
   <circle class="a-glow" cx="32" cy="26" r="16" fill="#ffb300" opacity=".18"/>
   <g class="a-flame"><path d="M32 12q8 10 0 24-8-14 0-24z" fill="#ff9800"/><path d="M32 20q4 7 0 15-4-8 0-15z" fill="#ffeb3b"/><path d="M32 28q1.5 3 0 7-1.5-4 0-7z" fill="#fff8e1"/></g>
   <rect x="31.3" y="35" width="1.4" height="3.4" fill="#5d4037"/>
   <path d="M9 38h46q-2 14-23 14T9 38z" fill="#c9632d"/>
   <ellipse cx="32" cy="38" rx="23" ry="3.6" fill="#e07b39"/><ellipse cx="32" cy="38" rx="18.5" ry="2.2" fill="#7a3510"/>
   <circle cx="19" cy="44" r="1.3" fill="#ffd23f"/><circle cx="25.5" cy="46.4" r="1.3" fill="#ffd23f"/><circle cx="32" cy="47.2" r="1.3" fill="#ffd23f"/><circle cx="38.5" cy="46.4" r="1.3" fill="#ffd23f"/><circle cx="45" cy="44" r="1.3" fill="#ffd23f"/>
   <path d="M24 51.5h16l-2 4.5H26z" fill="#a14f22"/>`),

  // पारितोषिके — gold trophy
  trophy: svg("trophy", `
   <path d="M20 14h-5q0 10 8 11M44 14h5q0 10-8 11" stroke="#e3ac1c" stroke-width="3" fill="none" stroke-linecap="round"/>
   <path d="M20 9h24v9q0 13-12 15-12-2-12-15z" fill="#f4c430"/>
   <path d="M32 9h12v9q0 13-12 15z" fill="#e3ac1c"/>
   ${star(32, 19, 5, "#fff8dc", "a-none")}
   <rect x="29" y="32" width="6" height="8" fill="#e3ac1c"/>
   <rect x="22" y="40" width="20" height="5" rx="1.5" fill="#8d4b2b"/>
   <rect x="19" y="45" width="26" height="9" rx="2" fill="#6d3a20"/><rect x="26" y="48" width="12" height="3" rx="1" fill="#f4c430"/>
   ${star(52, 8, 4.5, "#ffe082")}${star(11, 30, 3.4, "#ffe082", "a-twinkle2")}`),

  // संस्कृती — kalash with mango leaves and coconut
  kalash: svg("kalash", `
   <ellipse cx="32" cy="59" rx="15" ry="2" fill="#000" opacity=".12"/>
   <path d="M32 21q-12-2-17-9 10 0 17 9zM32 21q12-2 17-9-10 0-17 9z" fill="#2e7d32"/>
   <path d="M32 21q-8-6-9-14 7 4 9 14zM32 21q8-6 9-14-7 4-9 14z" fill="#43a047"/>
   <ellipse cx="32" cy="14" rx="6" ry="7.5" fill="#8d5524"/><path d="M32 6.6q-2-3-4.5-3 3 .4 4.5 2.2 1.5-1.8 4.5-2.2-2.5 0-4.5 3z" fill="#5d3417"/>
   <path d="M26.5 15.5h11" stroke="#d6334a" stroke-width="1.6"/>
   <rect x="24" y="22" width="16" height="6" rx="2" fill="#c46f1f"/><ellipse cx="32" cy="22.5" rx="10.5" ry="2.6" fill="#e8973a"/>
   <path d="M18 36q0-7 7-9h14q7 2 7 9 0 17-14 21-14-4-14-21z" fill="#d9822b"/>
   <path d="M32 27h7q7 2 7 9 0 17-14 21z" fill="#c46f1f" opacity=".55"/>
   <path d="M18.8 40q13.2 4.5 26.4 0" stroke="#f4c430" stroke-width="2.6" fill="none"/>
   <circle cx="25" cy="47" r="1.3" fill="#ffd23f"/><circle cx="32" cy="48.5" r="1.3" fill="#ffd23f"/><circle cx="39" cy="47" r="1.3" fill="#ffd23f"/>`),

  // आनंद — marigold (झेंडू)
  marigold: svg("marigold", `
   <path d="M32 42q-13 3-20 15 12-1 20-15zM32 42q13 3 20 15-12-1-20-15z" fill="#43a047"/>
   <path d="M32 42v18" stroke="#2e7d32" stroke-width="2"/>
   <g class="a-spin">${ring(14, 13, 4.6, 9, "#f57c00")}${ring(12, 18, 4, 7, "#ff9800")}${ring(10, 22, 3.4, 5.4, "#ffb300")}
    <circle cx="32" cy="28" r="4.6" fill="#e65100"/><circle cx="30.6" cy="26.6" r="1.2" fill="#ffcc80"/></g>`)
 };
})();
const art = id => ART[id] || "";
