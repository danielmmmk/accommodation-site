async function loadData() {

    const response = await fetch(CSV_URL);
    const csv = await response.text();

    const rows = csv.trim().split("\n");

    const headers = rows.shift().split(",");

    const data = rows.map(row => {

        const values = row.split(",");

        let obj = {};

        headers.forEach((header, index) => {

            obj[header.trim()] = values[index]?.trim() || "";

        });

        return obj;

    });

    render(data);

    document
        .getElementById("search")
        .addEventListener("input", function(e){

            const search=e.target.value.toLowerCase();

            const filtered=data.filter(item=>

                Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search)

            );

            render(filtered);

        });

}

function render(data){

    const container=document.getElementById("cards");

    container.innerHTML="";

    data.forEach(item=>{

        container.innerHTML +=`

<div class="card">

<img src="${item.Image}" loading="lazy">

<div class="content">

<h2>${item.Name}</h2>

<div class="info">

📍 ${item.Area}<br>

💲 ${item.Price}<br>

⭐ ${item.Rating}<br>

🛏 Sleeps ${item.Sleeps}<br>

🏠 ${item.Bedrooms} Bedrooms

<p>

${item.Notes}

</p>

</div>

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