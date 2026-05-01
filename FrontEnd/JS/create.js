document.addEventListener("DOMContentLoaded", () => {

const API = "https://recipe-backend-8s7p.onrender.com/api/recipes";
const token = localStorage.getItem("token");

/* ==================================
   LOGIN CHECK
================================== */
if(!token){
location.href = "login.html";
return;
}

/* ==================================
   ELEMENTS
================================== */
const form = document.getElementById("form");
const ingredientList = document.getElementById("ingredientList");
const addIngredientBtn = document.getElementById("addIngredientBtn");
const draftBtn = document.getElementById("draftBtn");
const logoutBtn = document.getElementById("logoutBtn");

/* ==================================
   ADD INGREDIENT ROW
================================== */
if(addIngredientBtn){

addIngredientBtn.addEventListener("click", () => {

const row = document.createElement("div");
row.className = "ingredient-row";

row.innerHTML = `
<input
type="text"
class="ingredient-name"
placeholder="Ingredient"
>

<input
type="number"
class="ingredient-qty"
placeholder="Qty"
>

<select class="ingredient-unit">
<option value="g">g</option>
<option value="kg">kg</option>
<option value="ml">ml</option>
<option value="l">l</option>
<option value="cup">cup</option>
<option value="pcs">pcs</option>
</select>
`;

ingredientList.appendChild(row);

});

}

/* ==================================
   SAVE DRAFT
================================== */
if(draftBtn){

draftBtn.addEventListener("click", () => {

const draft = {
title: document.getElementById("title")?.value || "",
cuisine: document.getElementById("cuisine")?.value || "",
difficulty: document.getElementById("difficulty")?.value || "",
category: document.getElementById("category")?.value || "",
prepTime: document.getElementById("prepTime")?.value || "",
description: document.getElementById("description")?.value || "",
isVeg: document.getElementById("isVeg")?.checked || false,
isPopular: document.getElementById("isPopular")?.checked || false,
videoLink:
document.getElementById("videoLink")?.value || "",
};

localStorage.setItem(
"recipeDraft",
JSON.stringify(draft)
);

alert("Draft Saved!");

});

}

/* ==================================
   LOAD DRAFT
================================== */
const savedDraft =
localStorage.getItem("recipeDraft");

if(savedDraft){

try{

const d = JSON.parse(savedDraft);

if(document.getElementById("title"))
document.getElementById("title").value =
d.title || "";

if(document.getElementById("cuisine"))
document.getElementById("cuisine").value =
d.cuisine || "";

if(document.getElementById("difficulty"))
document.getElementById("difficulty").value =
d.difficulty || "";

if(document.getElementById("category"))
document.getElementById("category").value =
d.category || "";

if(document.getElementById("prepTime"))
document.getElementById("prepTime").value =
d.prepTime || "";

if(document.getElementById("description"))
document.getElementById("description").value =
d.description || "";

if(document.getElementById("isVeg"))
document.getElementById("isVeg").checked =
d.isVeg || false;

if(document.getElementById("isPopular"))
document.getElementById("isPopular").checked =
d.isPopular || false;

}catch(err){
console.log(err);
}

}

/* ==================================
   PUBLISH RECIPE
================================== */
if(form){

form.addEventListener("submit", async (e) => {

e.preventDefault();

try{

const names =
document.querySelectorAll(".ingredient-name");

const qtys =
document.querySelectorAll(".ingredient-qty");

const units =
document.querySelectorAll(".ingredient-unit");

let ingredients = [];

for(let i=0;i<names.length;i++){

const name =
names[i].value.trim();

const qty =
qtys[i].value.trim();

const unit =
units[i].value;

if(name){
ingredients.push(
`${name} ${qty}${unit}`
);
}

}

const recipe = {

title:
document.getElementById("title").value.trim(),

cuisine:
document.getElementById("cuisine").value.trim(),

difficulty:
document.getElementById("difficulty").value,

category:
document.getElementById("category").value,

prepTime:Number(
document.getElementById("prepTime").value
),

description:
document.getElementById("description").value.trim(),

isVeg:
document.getElementById("isVeg").checked,

isPopular:
document.getElementById("isPopular").checked,

videoLink:
document.getElementById("videoLink")?.value || "",

ingredients

};

if(!recipe.title){
alert("Please enter recipe title.");
return;
}

const res = await fetch(API, {

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + token
},

body: JSON.stringify(recipe)

});

if(!res.ok){
throw new Error("Publish failed");
}

localStorage.removeItem("recipeDraft");

alert("Recipe Published Successfully!");

location.href = "index.html";

}catch(err){

console.log(err);
alert("Publishing failed.");

}

});

}

/* ==================================
   LOGOUT
================================== */
if(logoutBtn){

logoutBtn.addEventListener("click",(e)=>{

e.preventDefault();

localStorage.removeItem("token");

location.href = "login.html";

});

}

});