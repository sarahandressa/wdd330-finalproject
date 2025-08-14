const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/suggestBook.BOoBVQjU.js","assets/api.CXQ0jshO.js","assets/club.CNW-i2_q.js"])))=>i.map(i=>d[i]);
import{_ as r,g as d}from"./club.CNW-i2_q.js";/* empty css               */function c(){return new URLSearchParams(window.location.search).get("id")}function a(){const n=c(),e=d().find(i=>i.id===n),t=document.getElementById("clubDetails");if(t){if(!e){t.innerHTML="<p>Club not found.</p>";return}t.innerHTML=`
    <h2>${e.name}</h2>
    <p>${e.description}</p>
    <h3>Members</h3>
    <ul>${e.members.map(i=>`<li>${i}</li>`).join("")}</ul>
    <h3>Book Suggestions</h3>
    <div id="suggestionsList"></div>
  `,u(e)}}function u(n){const o=document.getElementById("suggestionsList");if(o.innerHTML="",n.suggestions.length===0){o.innerHTML="<p>No book suggestions yet.</p>";return}n.suggestions.forEach(e=>{const t=document.createElement("div");t.classList.add("book-suggestion"),t.innerHTML=`
      <img src="${e.thumbnail}" alt="${e.title}">
      <h4>${e.title}</h4>
      <p>${e.authors.join(", ")}</p>
      <p>${e.description}</p>
      <span>Votes: ${e.votes}</span>
    `,o.appendChild(t)})}const s=document.getElementById("searchBookForm");s&&(s.dataset.clubId=club.id);r(()=>import("./suggestBook.BOoBVQjU.js"),__vite__mapDeps([0,1,2]));document.addEventListener("DOMContentLoaded",a);
