async function loadData(){

const response=await fetch(CSV_URL);

const csv=await response.text();

const rows=csv.trim().split("\n");

const headers=rows.shift().split(",");

const data=rows.map(r=>{

const values=r.split(",");

let obj={};

headers.forEach((h,i)=>obj[h]=values[i]);

return obj;

});

render(data);

document
.getElementById("search")
.addEventListener("input",e=>{

const text=e.target.value.toLowerCase();

const filtered=data.filter(item=>

Object.values(item)

.join(" ")

.toLowerCase()

.includes(text)

);

render(filtered);

});

}

function render(data){

const cards=document.getElementById("cards");

cards.innerHTML="";

data.forEach(item=>{

cards.innerHTML+=`

<div class="card">

<img src="${item.Image}">

<div class="content">

<h2>${item.Name}</h2>

<p><strong>Area:</strong> ${item.Area}</p>

<p><strong>Price:</strong> ${item.Price}</p>

<p><strong>Rating:</strong> ⭐ ${item.Rating}</p>

<p><strong>Sleeps:</strong> ${item.Sleeps}</p>

<p>${item.Notes}</p>

<a
class="button"
href="${item.Link}"
target="_blank">

View Listing

</a>

</div>

</div>

`;

});

}

loadData();