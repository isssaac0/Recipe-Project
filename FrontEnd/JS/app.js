document.addEventListener("DOMContentLoaded", () => {

const API = "https://recipe-backend-8s7p.onrender.com/api/recipes";

/* ===================================
   IMAGE MAP
=================================== */
const imageMap = {
"Paneer Butter Masala":"images/paneer.jpg",
 "Chocolate Cake":"images/cake.jpg", 
 "Veg Biryani":"images/biryani.jpg",
  "Burger":"images/burger.jpg", 
  "Noodles":"images/noodles.jpg", 
  "Tea":"images/tea.jpg",
   "Samosa":"images/samosa.jpg",
    "Margherita Pizza":"images/pizza.jpg",
     "Kheer":"images/kheer.jpg", 
     "Fried Rice":"images/friedrice.jpg", 
     "Croissant":"images/croissant.jpg",
      "Sushi Rolls":"images/sushi.jpg", 
      "Tacos":"images/tacos.jpg",
 "Chicken Alfredo Pasta":"images/pasta.jpg", 
 "Fruit Custard":"images/custard.jpg",
 "Masala Dosa":"images/dosa.jpg",
 "Veg Sandwich":"/images/sandwich.jpg"
};

/* ===================================
   INDEX PAGE
=================================== */
if(document.getElementById("recipes")){

let currentPage = 1;
const limit = 8;

/* LOAD NORMAL */
async function getRecipes(){

const cuisine =
document.getElementById("filterCuisine")?.value || "";

const difficulty =
document.getElementById("filterDifficulty")?.value || "";

const search =
document.getElementById("searchInput")?.value.trim() || "";

let url = `${API}?page=${currentPage}&limit=${limit}`;

if(cuisine)
url += `&cuisine=${encodeURIComponent(cuisine)}`;

if(difficulty)
url += `&difficulty=${difficulty}`;

if(search)
url += `&search=${encodeURIComponent(search)}`;

loadRecipes(url);

}

/* UNIVERSAL LOAD */
async function loadRecipes(url){

try{

const res = await fetch(url);
const recipes = await res.json();

const container =
document.getElementById("recipes");

container.innerHTML = "";

recipes.forEach(r=>{

const img =
imageMap[r.title] || "images/default.jpg";

container.innerHTML += `
<div class="card image-card"

onclick="playVideo(
'${encodeURIComponent(r.videoLink || "")}',
'${encodeURIComponent(r.title)}'
)"

style="
background-image:url('${img}');
background-size:cover;
background-position:center;
cursor:pointer;
">

<div class="overlay">
<h3>${r.title}</h3>
<p>${r.cuisine || "-"}</p>
<p>${r.prepTime || "-"} min</p>
<p>${r.isVeg ? "Vegetarian":"Non-Veg"}</p>
</div>

</div>
`;

});

document.getElementById("totalRecipes").innerText =
recipes.length;

document.getElementById("pageNumber").innerText =
"Page " + currentPage;

}catch(err){
console.log(err);
}

}

/* FIRST LOAD */
getRecipes();

/* SEARCH */
document.getElementById("searchInput")
?.addEventListener("input",()=>{
currentPage = 1;
getRecipes();
});

/* APPLY FILTER */
document.getElementById("filterBtn")
?.addEventListener("click",()=>{
currentPage = 1;
getRecipes();
});

/* QUICK MEALS */
document.getElementById("quickMealsBtn")
?.addEventListener("click",()=>{
currentPage = 1;
loadRecipes(`${API}?maxTime=30&page=1&limit=${limit}`);
});

/* HEALTHY */
document.getElementById("healthyBtn")
?.addEventListener("click",()=>{
currentPage = 1;
loadRecipes(`${API}?category=healthy&page=1&limit=${limit}`);
});

/* DESSERT */
document.getElementById("dessertsBtn")
?.addEventListener("click",()=>{
currentPage = 1;
loadRecipes(`${API}?category=dessert&page=1&limit=${limit}`);
});

/* VEG */
document.getElementById("vegBtn")
?.addEventListener("click",()=>{
currentPage = 1;
loadRecipes(`${API}?isVeg=true&page=1&limit=${limit}`);
});

/* UNDER 30 */
document.getElementById("quickBtn")
?.addEventListener("click",()=>{
currentPage = 1;
loadRecipes(`${API}?maxTime=30&page=1&limit=${limit}`);
});

/* POPULAR */
document.getElementById("popularBtn")
?.addEventListener("click",()=>{
currentPage = 1;
loadRecipes(`${API}?isPopular=true&page=1&limit=${limit}`);
});

/* ALL */
document.getElementById("allRecipesBtn")
?.addEventListener("click",()=>{
currentPage = 1;
getRecipes();
});

/* PAGINATION */
document.getElementById("nextPage")
?.addEventListener("click",()=>{
currentPage++;
getRecipes();
});

document.getElementById("prevPage")
?.addEventListener("click",()=>{
if(currentPage>1){
currentPage--;
getRecipes();
}
});

}

/* ===================================
   VIDEO INSIDE WEBSITE
=================================== */
window.playVideo = function(video,title){

if(!video || video === "undefined"){
alert("No video added for this recipe.");
return;
}

video = decodeURIComponent(video).trim();

/* watch?v= to embed */
if(video.includes("watch?v=")){
video = video.replace("watch?v=","embed/");
}

/* youtu.be to embed */
if(video.includes("youtu.be/")){
const id = video.split("youtu.be/")[1].split("?")[0];
video = "https://www.youtube.com/embed/" + id;
}

/* Remove old modal */
const old = document.getElementById("videoModal");
if(old) old.remove();

const modal = document.createElement("div");

modal.id = "videoModal";

modal.innerHTML = `
<div style="
position:fixed;
inset:0;
background:rgba(0,0,0,.75);
z-index:9999;
display:flex;
align-items:center;
justify-content:center;
padding:30px;
">

<div style="
width:min(950px,100%);
background:#111;
border-radius:22px;
overflow:hidden;
position:relative;
">

<button id="closeVideo"
style="
position:absolute;
top:10px;
right:10px;
width:42px;
height:42px;
border:none;
border-radius:50%;
cursor:pointer;
font-size:22px;
z-index:5;
">×</button>

<div style="
padding:16px;
color:#fff;
font-size:22px;
font-weight:700;
">
${decodeURIComponent(title)}
</div>

<iframe
width="100%"
height="520"
src="${video}?autoplay=1"
frameborder="0"
allow="autoplay; encrypted-media"
allowfullscreen>
</iframe>

</div>
</div>
`;

document.body.appendChild(modal);

document.getElementById("closeVideo")
.onclick = ()=> modal.remove();

};

/* ===================================
   LOGOUT
=================================== */
document.getElementById("logoutBtn")
?.addEventListener("click",(e)=>{
e.preventDefault();
localStorage.removeItem("token");
location.href = "login.html";
});

});