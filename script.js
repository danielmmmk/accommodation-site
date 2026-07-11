import { doc, setDoc, serverTimestamp, collection, getDocs, onSnapshot, query } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js'
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

// Update the vote totals shown on the page
function updateVoteDisplay(accommodationId, yesCount, noCount) {
    const yesElement = document.getElementById(`yes-count-${accommodationId}`);
    const noElement = document.getElementById(`no-count-${accommodationId}`);

    if (yesElement) {
        yesElement.textContent = yesCount;
    }

    if (noElement) {
        noElement.textContent = noCount;
    }
}

// Listen for live vote updates for one accommodation
function listenForVotes(accommodationId) {
    const votesRef = collection(db, "accommodations", accommodationId, "votes");

    onSnapshot(votesRef, (snapshot) => {
        let yesCount = 0;
        let noCount = 0;

        snapshot.forEach((voteDoc) => {
            const vote = voteDoc.data().vote;

            if (vote === "yes") {
                yesCount++;
            } else if (vote === "no") {
                noCount++;
            }
        });

        updateVoteDisplay(accommodationId, yesCount, noCount);
    });
}

async function loadData() {
  
    const response = await fetch(CSV_URL);
    const csv = await response.text();
    
    const results = Papa.parse(csv, {
        header: true,          // Use the first row as object property names
        skipEmptyLines: true,  // Ignore blank rows
        transformHeader: header => header.trim()
    });
    
    const data = results.data.filter(item =>
        item.Active?.trim().toLowerCase() === "yes"
    );
    
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

        listenForVotes(item.ID);
        container.innerHTML +=`

<div class="card">

<div class="image-wrapper">
    <img src="${item.Image}" loading="lazy">
</div>

<div class="content">

<h2>${item.Name}</h2>

<div class="info">

💲 ${item.TotalPrice}<br>
📍 Area: ${item.Area}<br>
🚆 Nearest Station: ${item.NearestStation}<br>
🏠 Layout: ${item.Layout}

<p>
Notes: ${item.Notes}
</p>

</div>

<div class="vote-section">
    <div class="vote-counts">
        👍 <span id="yes-count-${item.ID}">0</span>
        &nbsp;&nbsp;
        👎 <span id="no-count-${item.ID}">0</span>
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
        <button
            onclick="vote('${item.ID}','clear')">
            ☐ Clear
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
