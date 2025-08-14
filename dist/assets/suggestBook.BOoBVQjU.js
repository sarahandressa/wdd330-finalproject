import{g as c}from"./api.CXQ0jshO.js";import{s as i}from"./club.CNW-i2_q.js";const o=document.getElementById("searchBookForm"),r=document.getElementById("searchResults");function l(s,n){if(r.innerHTML="",s.length===0){r.innerHTML="<p>No books found.</p>";return}s.forEach(t=>{const e=document.createElement("div");e.classList.add("book-result"),e.innerHTML=`
      <img src="${t.thumbnail}" alt="${t.title}" />
      <h4>${t.title}</h4>
      <p>${t.authors.join(", ")}</p>
      <p>${t.description.slice(0,100)}...</p>
      <button class="suggest-btn">Suggest to Club</button>
    `,e.querySelector(".suggest-btn").addEventListener("click",()=>{const u=i(n,t);alert(u?`Book "${t.title}" suggested to the club!`:"Failed to suggest book.")}),r.appendChild(e)})}o&&o.addEventListener("submit",async s=>{s.preventDefault();const n=o.querySelector('input[type="text"]').value.trim();if(!n)return;const t=o.dataset.clubId,e=await c(n,10);l(e,t)});
