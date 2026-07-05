import { doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js'
import { auth, db } from './firebase-config.js'

window.vote = async function(accommodationId, voteValue) {

    const user = auth.currentUser;

    if (!user) {
        console.error("User not signed in");
        return;
    }

    await setDoc(
        doc(db, "accommodations", accommodationId, "votes", user.uid),
        {
            vote: voteValue,
            updatedAt: serverTimestamp()
        }
    );

    console.log("Vote saved");
};

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

<div class="image-wrapper">
    <img src="${item.Image}" loading="lazy">
</div>

<div class="content">

<h2>${item.Name}</h2>

<div class="info">

ID: ${item.ID}<br>
📍 ${item.Area}<br>
💲 ${item.Price}<br>
⭐ ${item.Rating}<br>
🛏 Sleeps ${item.Sleeps}<br>
🏠 ${item.Bedrooms} Bedrooms

<p>
${item.Notes}
</p>

</div>

<div class="vote-section">
    <div class="vote-counts">
        👍 <span id="yes-${item.ID}">0</span>
        &nbsp;&nbsp;
        👎 <span id="no-${item.ID}">0</span>
    </div>

    <div class="vote-buttons">
        <button
            onclick="vote('${item.ID}','yes')">
            👍 Yes
        </button>
        <button
            onclick="vote('${item.ID}','no')">
            👎 No
        </button>
    </div>

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
