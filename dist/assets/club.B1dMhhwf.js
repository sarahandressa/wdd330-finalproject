const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/surpriseBook.fNSXazCg.js","assets/club.C9QPlMqF.js","assets/suggestBook.Bv1RKLU1.js","assets/api.DABdBofW.js"])))=>i.map(i=>d[i]);
import"./styles.2Y5MNT98.js";import{_ as d,g as c,u}from"./club.C9QPlMqF.js";function l(){return new URLSearchParams(window.location.search).get("id")}function p(){const t=l(),e=c().find(r=>r.id===t),n=document.getElementById("clubDetails");if(!n)return;if(!e){n.innerHTML="<p>Club not found.</p>";return}n.innerHTML=`
    <h2>${e.name}</h2>
    <p>${e.description}</p>
    <h3>Members</h3>
    <ul>${e.members.map(r=>`<li>${r}</li>`).join("")}</ul>
    <h3>Book Suggestions</h3>
    <div id="suggestionsList"></div>
    <button id="surpriseBookBtn">Surprise Me!</button>
  `,a(e);const s=document.getElementById("surpriseBookBtn");s&&s.addEventListener("click",()=>{d(()=>import("./surpriseBook.fNSXazCg.js"),__vite__mapDeps([0,1])).then(r=>r.surpriseBook(e.id))});const i=document.getElementById("searchBookForm");i&&(i.dataset.clubId=e.id)}function a(t){const o=document.getElementById("suggestionsList");if(o.innerHTML="",t.suggestions.length===0){o.innerHTML="<p>No book suggestions yet.</p>";return}t.suggestions.forEach(e=>{const n=document.createElement("div");n.classList.add("book-suggestion"),n.innerHTML=`
      <img src="${e.thumbnail}" alt="${e.title}">
      <h4>${e.title}</h4>
      <p>${e.authors.join(", ")}</p>
      <p>${e.description}</p>
      <span>Votes: ${e.votes}</span>
    `,m(t,e,n),o.appendChild(n)})}function m(t,o,e){["available","reading","completed"].forEach(s=>{const i=document.createElement("button");i.textContent=s,i.className=o.status===s?"active":"",i.addEventListener("click",()=>{u(t.id,o.id,s),a(t)}),e.appendChild(i)})}document.addEventListener("DOMContentLoaded",p);d(()=>import("./suggestBook.Bv1RKLU1.js"),__vite__mapDeps([2,3,1]));const _=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{_ as c};
