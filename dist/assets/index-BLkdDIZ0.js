(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function e(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=e(a);fetch(a.href,i)}})();const f=[{id:"rebirth-hoodie",name:"The Rebirth Hoodie",price:2999,category:"apparel",image:"images/hoodie.png",meta:"Organic Cotton Fleece",description:"Designed as a symbol of starting fresh. Crafted from ultra-heavyweight 450 GSM GOTS-certified organic cotton, with a double-lined hood and relaxed silhouette. Dyed with eco-friendly non-toxic vegetable dyes. Every thread represents a path forward.",materials:["100% GOTS Organic Cotton","450 GSM heavy fleece","Chemical-free natural dyes","Ethically made in small batches"]},{id:"new-leaf-tee",name:"New Leaf Tee",price:1499,category:"apparel",image:"images/tee.png",meta:"Organic Hemp Blend",description:"Lightweight, breathable, and raw. Our signature tee is made from a premium organic hemp and cotton blend that softens with every wash. An everyday essential carrying the quiet message of turning over a new leaf.",materials:["55% Hemp, 45% Organic Cotton","180 GSM light slub","Undyed natural colorway","Carbon-neutral manufacturing"]},{id:"resilience-tote",name:"Resilience Tote",price:999,category:"accessories",image:"images/tote.png",meta:"Upcycled Heavy Canvas",description:"A rugged daily companion built from upcycled thick canvas sheets that were destined for landfills. Extremely spacious, double-stitched for durability, and featuring an internal zipper pocket. Carry your essentials and your values.",materials:["100% Upcycled Industrial Canvas","Reinforced shoulder straps","Internal keys/phone pocket","Hand-screen printed logo"]},{id:"restoration-pants",name:"Restoration Sweatpants",price:2499,category:"apparel",image:"images/pants.png",meta:"Organic Cotton Fleece",description:"True comfort for peaceful days. These lounge pants feature an elasticized waist with drawcords, hidden side-seam pockets, and elastic cuffs. Perfect for slow mornings, reflection, and recovery.",materials:["100% GOTS Organic Cotton","380 GSM loopback fleece","Natural beige undertone","Fair-trade certified workshop"]}],$="918056066050";let c=JSON.parse(localStorage.getItem("second_chance_cart"))||[],s="M";const I=document.getElementById("main-header"),S=document.getElementById("product-grid"),q=document.getElementById("filter-controls"),x=document.getElementById("menu-toggle"),h=document.getElementById("mobile-menu-drawer"),b=document.getElementById("mobile-menu-overlay"),z=document.getElementById("close-mobile-menu"),T=document.querySelectorAll(".mobile-nav-link"),A=document.getElementById("product-modal"),L=document.getElementById("modal-overlay"),N=document.getElementById("close-modal"),l=document.getElementById("modal-product-content"),P=document.getElementById("cart-btn"),B=document.getElementById("cart-drawer"),E=document.getElementById("cart-drawer-overlay"),H=document.getElementById("close-cart"),y=document.getElementById("cart-items"),C=document.getElementById("cart-subtotal"),D=document.getElementById("cart-badge"),r=document.getElementById("checkout-btn"),g=document.getElementById("toast");function M(){O("all"),u(),X(),J()}function O(o){S.innerHTML="",(o==="all"?f:f.filter(e=>e.category===o)).forEach(e=>{const n=document.createElement("div");n.className="product-card",n.setAttribute("data-id",e.id),n.innerHTML=`
      <div class="product-image-container">
        <img src="${e.image}" alt="${e.name}" class="product-card-img" loading="lazy">
        <div class="product-quickview-btn">View Details</div>
      </div>
      <div class="product-info">
        <span class="product-meta">${e.meta}</span>
        <h3 class="product-title">${e.name}</h3>
        <span class="product-price">₹${e.price.toLocaleString("en-IN")}</span>
      </div>
    `,n.addEventListener("click",()=>R(e.id)),S.appendChild(n)})}function R(o){const t=f.find(n=>n.id===o);if(!t)return;s="M",l.innerHTML=`
    <div class="modal-image-col">
      <img src="${t.image}" alt="${t.name}">
    </div>
    <div class="modal-info-col">
      <span class="modal-tag">${t.meta}</span>
      <h2 class="modal-title">${t.name}</h2>
      <p class="modal-price">₹${t.price.toLocaleString("en-IN")}</p>
      
      <p class="modal-description">${t.description}</p>
      
      <div class="modal-selectors">
        <span class="selector-label">Select Size</span>
        <div class="size-options">
          <button class="size-btn ${s==="S"?"active":""}" data-size="S">S</button>
          <button class="size-btn ${s==="M"?"active":""}" data-size="M">M</button>
          <button class="size-btn ${s==="L"?"active":""}" data-size="L">L</button>
          <button class="size-btn ${s==="XL"?"active":""}" data-size="XL">XL</button>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="modal-add-to-cart" id="add-to-cart-action">Add to Cart</button>
        <button class="modal-buy-now" id="buy-now-action">Buy Now (WhatsApp)</button>
      </div>
    </div>
  `;const e=l.querySelectorAll(".size-btn");e.forEach(n=>{n.addEventListener("click",()=>{e.forEach(a=>a.classList.remove("active")),n.classList.add("active"),s=n.getAttribute("data-size")})}),l.querySelector("#add-to-cart-action").addEventListener("click",()=>{G(t,s),m()}),l.querySelector("#buy-now-action").addEventListener("click",()=>{U(t,s)}),A.classList.add("active"),L.classList.add("active"),document.body.style.overflow="hidden"}function m(){A.classList.remove("active"),L.classList.remove("active"),document.body.style.overflow=""}function G(o,t){const e=c.findIndex(n=>n.id===o.id&&n.size===t);e>-1?c[e].quantity+=1:c.push({id:o.id,name:o.name,price:o.price,image:o.image,size:t,quantity:1}),w(),u(),V(`${o.name} (${t}) added to cart`)}function k(o,t,e){const n=c.findIndex(a=>a.id===o&&a.size===t);n!==-1&&(c[n].quantity+=e,c[n].quantity<=0&&c.splice(n,1),w(),u())}function _(o,t){c=c.filter(e=>!(e.id===o&&e.size===t)),w(),u()}function w(){localStorage.setItem("second_chance_cart",JSON.stringify(c))}function u(){const o=c.reduce((e,n)=>e+n.quantity,0);if(D.textContent=o,o===0){y.innerHTML=`
      <div class="cart-empty-message">
        <svg class="icon" style="width:48px; height:48px; color:var(--text-secondary); margin-bottom:15px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Your cart is empty.</p>
      </div>
    `,C.textContent="₹0.00",r.style.opacity="0.6",r.style.pointerEvents="none";return}r.style.opacity="1",r.style.pointerEvents="auto",y.innerHTML="";let t=0;c.forEach(e=>{const n=e.price*e.quantity;t+=n;const a=document.createElement("div");a.className="cart-item",a.innerHTML=`
      <div class="cart-item-image">
        <img src="${e.image}" alt="${e.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${e.name}</h4>
        <span class="cart-item-meta">Size: ${e.size}</span>
        <span class="cart-item-price">₹${e.price.toLocaleString("en-IN")}</span>
        <div class="cart-item-quantity-control">
          <button class="qty-btn dec-qty" aria-label="Decrease Quantity">&minus;</button>
          <span class="qty-val">${e.quantity}</span>
          <button class="qty-btn inc-qty" aria-label="Increase Quantity">&plus;</button>
        </div>
      </div>
      <button class="remove-item-btn" aria-label="Remove Item">&times;</button>
    `,a.querySelector(".dec-qty").addEventListener("click",()=>k(e.id,e.size,-1)),a.querySelector(".inc-qty").addEventListener("click",()=>k(e.id,e.size,1)),a.querySelector(".remove-item-btn").addEventListener("click",()=>_(e.id,e.size)),y.appendChild(a)}),C.textContent=`₹${t.toLocaleString("en-IN")}`}function U(o,t){const e=`Hello SECOND CHANCE team! %0A%0AI'd like to place an immediate order for:%0A- *${o.name}* [Size: ${t}] - ₹${o.price.toLocaleString("en-IN")}%0A%0APlease guide me on payment details. Thank you!`,n=`https://wa.me/${$}?text=${e}`;window.open(n,"_blank")}function F(){if(c.length===0)return;let o="",t=0;c.forEach(a=>{const i=a.price*a.quantity;t+=i,o+=`- ${a.quantity}x *${a.name}* [Size: ${a.size}] - ₹${i.toLocaleString("en-IN")}%0A`});const e=`Hello SECOND CHANCE team!%0A%0AI'd like to place an order for the following items:%0A%0A*ORDER DETAILS:*%0A${o}%0A*TOTAL PRICE:* ₹${t.toLocaleString("en-IN")}%0A(Shipping: Free)%0A%0APlease let me know how I can complete the payment. Thank you!`,n=`https://wa.me/${$}?text=${e}`;window.open(n,"_blank")}function V(o){g.textContent=o,g.classList.add("active"),setTimeout(()=>{g.classList.remove("active")},3e3)}function Q(){h.classList.toggle("active"),b.classList.toggle("active"),document.body.style.overflow=h.classList.contains("active")?"hidden":""}function d(){h.classList.remove("active"),b.classList.remove("active"),document.body.style.overflow=""}function W(){B.classList.add("active"),E.classList.add("active"),document.body.style.overflow="hidden"}function v(){B.classList.remove("active"),E.classList.remove("active"),document.body.style.overflow=""}function X(){window.addEventListener("scroll",()=>{window.scrollY>50?I.classList.add("scrolled"):I.classList.remove("scrolled")});const o=q.querySelectorAll(".filter-btn");o.forEach(t=>{t.addEventListener("click",e=>{o.forEach(a=>a.classList.remove("active")),e.target.classList.add("active");const n=e.target.getAttribute("data-filter");O(n)})}),x.addEventListener("click",Q),z.addEventListener("click",d),b.addEventListener("click",d),T.forEach(t=>{t.addEventListener("click",d)}),P.addEventListener("click",W),H.addEventListener("click",v),E.addEventListener("click",v),r.addEventListener("click",F),L.addEventListener("click",m),N.addEventListener("click",m),window.addEventListener("keydown",t=>{t.key==="Escape"&&(m(),v(),d())})}function J(){const o=document.querySelectorAll(".fade-in-element"),t={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},e=new IntersectionObserver((n,a)=>{n.forEach(i=>{i.isIntersecting&&(i.target.classList.add("appear"),a.unobserve(i.target))})},t);o.forEach(n=>e.observe(n))}document.addEventListener("DOMContentLoaded",M);(document.readyState==="complete"||document.readyState==="interactive")&&M();
