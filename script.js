const PRODUCT_DATA = [{"id": 1, "name": "Lucky Star", "price": 18000, "cat": "cute", "emoji": "☆", "bg": "#e7ddd4"}, {"id": 2, "name": "Tiny Daisy", "price": 22000, "cat": "nature", "emoji": "✿", "bg": "#e3eadf"}, {"id": 3, "name": "Love Note", "price": 20000, "cat": "cute", "emoji": "♡", "bg": "#ead9d8"}, {"id": 4, "name": "Your Initial", "price": 16000, "cat": "letter", "emoji": "N", "bg": "#e4dfd8"}, {"id": 5, "name": "Little Cloud", "price": 19000, "cat": "cute", "emoji": "☁", "bg": "#dfe7e9"}, {"id": 6, "name": "Sun Bloom", "price": 21000, "cat": "nature", "emoji": "☼", "bg": "#ece3cf"}, {"id": 7, "name": "Moon Girl", "price": 23000, "cat": "cute", "emoji": "☾", "bg": "#e2dfe7"}, {"id": 8, "name": "Wild Leaf", "price": 20000, "cat": "nature", "emoji": "❧", "bg": "#dfe8dc"}];
const products = PRODUCT_DATA;
const rupiah=n=>"Rp"+n.toLocaleString("id-ID");
const grid=document.querySelector("#productGrid"), charm=document.querySelector("#charm"), base=document.querySelector("#base");
let cart=[];
function render(filter="all"){
 grid.innerHTML=products.filter(p=>filter==="all"||p.cat===filter).map(p=>`<article class="product"><div class="art" style="background:${p.bg}">${p.emoji}</div><div class="info"><div class="name">${p.name}</div><div class="meta"><span class="price">${rupiah(p.price)}</span><button class="add" data-id="${p.id}">+</button></div></div></article>`).join("");
 document.querySelectorAll(".add").forEach(b=>b.onclick=()=>add(+b.dataset.id));
}
products.forEach(p=>{let o=document.createElement("option");o.value=p.id;o.textContent=`${p.name} — ${rupiah(p.price)}`;charm.appendChild(o)});
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)});
function add(id){let p=products.find(x=>x.id===id);cart.push({name:p.name,price:p.price});update();openCart()}
function update(){document.querySelector("#cartCount").textContent=cart.length;document.querySelector("#items").innerHTML=cart.length?cart.map((x,i)=>`<div class="cartItem"><div><b>${x.name}</b><small>${rupiah(x.price)}</small></div><button class="remove" onclick="removeItem(${i})">remove</button></div>`).join(""):"<p style='color:#8b7f76;font-size:13px;padding-top:20px'>Your bag is dreamy and empty ♡</p>";document.querySelector("#total").textContent=rupiah(cart.reduce((a,x)=>a+x.price,0))}
function removeItem(i){cart.splice(i,1);update()}
function openCart(){document.querySelector("#cart").classList.add("open");document.querySelector("#overlay").classList.add("show")}
function closeCart(){document.querySelector("#cart").classList.remove("open");document.querySelector("#overlay").classList.remove("show")}
document.querySelector("#cartBtn").onclick=openCart;document.querySelector("#close").onclick=closeCart;document.querySelector("#overlay").onclick=closeCart;
function buildPrice(){let p=products.find(x=>x.id==charm.value);document.querySelector("#buildPrice").textContent=rupiah(+base.value+p.price)}
charm.onchange=()=>{let p=products.find(x=>x.id==charm.value);document.querySelector("#previewCharm").textContent=p.emoji;buildPrice()};base.onchange=buildPrice;
document.querySelector("#addBuild").onclick=()=>{let p=products.find(x=>x.id==charm.value), name=base.options[base.selectedIndex].text.split(" — ")[0]+" Bracelet + "+p.name;cart.push({name,price:+base.value+p.price});update();openCart()};
document.querySelector("#checkout").onclick=()=>{if(!cart.length)return alert("Keranjang masih kosong ♡");let text="Halo Ndys Chram! Aku mau order:%0A"+cart.map(x=>"• "+x.name+" — "+rupiah(x.price)).join("%0A")+"%0A%0ATotal: "+rupiah(cart.reduce((a,x)=>a+x.price,0));window.open("https://wa.me/6280000000000?text="+text,"_blank")};
render();buildPrice();update();
