const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/events";

// Fetch and display parties
async function fetchParties() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayParties(data);
    } catch (error) {
        console.error("Error fetching parties:", error);
    }
}

// Display parties in the DOM
function displayParties(parties) {
    const partyList = document.getElementById("party-list");
    partyList.innerHTML = "";
    parties.forEach(party => {
        const partyDiv = document.createElement("div");
        partyDiv.classList.add("party");
        partyDiv.innerHTML = `
            <h3>${party.name}</h3>
            <p><strong>Date:</strong> ${party.date}</p>
            <p><strong>Time:</strong> ${party.time}</p>
            <p><strong>Location:</strong> ${party.location}</p>
            <p><strong>Description:</strong> ${party.description}</p>
            <button onclick="deleteParty('${party.id}')">Delete</button>
        `;
        partyList.appendChild(partyDiv);
    });
}

document.getElementById("party-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const newParty = {
        name: document.getElementById("name").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newParty)
        });

        if (!response.ok) {
            throw new Error("Failed to add party");
        }

        fetchParties(); 
        event.target.reset(); 
    } catch (error) {
        console.error("Error adding party:", error);
    }
});

async function deleteParty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Failed to delete party");
        }
        fetchParties(); 
    } catch (error) {
        console.error("Error deleting party:", error);
    }
}

fetchParties();
