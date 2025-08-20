<script>
let sheetData = [];

// ✅ Load CSV file into memory
async function loadCSV() {
    const response = await fetch("data.csv"); // <-- your CSV file
    const text = await response.text();

    const rows = text.split("\n").map(r => r.trim()).filter(r => r);
    const headers = rows[0].split(",");
    sheetData = rows.slice(1).map(row => {
        const values = row.split(",");
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = values[i] ? values[i].trim() : "");
        return obj;
    });

    populateFilters(headers);
}

// ✅ Populate dropdown filters
function populateFilters(headers) {
    const yearSet = new Set();
    const topicSet = new Set();

    sheetData.forEach(row => {
        if (row["Year"]) yearSet.add(row["Year"]);
        if (row["Topic"]) topicSet.add(row["Topic"]);
    });

    let yearSelect = document.getElementById("yearFilter");
    yearSet.forEach(y => {
        yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
    });

    let topicSelect = document.getElementById("topicFilter");
    topicSet.forEach(t => {
        topicSelect.innerHTML += `<option value="${t}">${t}</option>`;
    });
}

// ✅ Main function to show a question
function findQuestion() {
    const year = document.getElementById("yearFilter").value;
    const topic = document.getElementById("topicFilter").value;

    const filteredData = sheetData.filter(row => {
        return (year === "all" || row["Year"] === year) &&
               (topic === "all" || row["Topic"] === topic);
    });

    let container = document.getElementById("questionContainer");

    if (filteredData.length > 0) {
        const q = filteredData[0]; // just show first match
        container.innerHTML = `
            <h3>Question</h3>
            ${q["Question Image"] 
                ? `<img src="${q["Question Image"]}" width="400">`
                : `<p>No image available</p>`}
            <br><br>
            <button onclick="showSolution('${q["Solution"] || ""}')">
                View Marking / Solution
            </button>
        `;
    } else {
        container.innerHTML = `<p>No question found for these filters!</p>`;
    }
}

// ✅ Show solution popup
function showSolution(sol) {
    if (!sol) {
        alert("No solution available.");
        return;
    }
    alert("Solution:\n" + sol);
}

window.onload = loadCSV;
</script>


