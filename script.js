<script>
let allData = [];
let filteredData = [];

// Load the CSV file
async function loadCSV() {
    const response = await fetch("questions.csv");
    const text = await response.text();
    const rows = text.split("\n").map(r => r.split(","));
    
    const headers = rows[0];
    allData = rows.slice(1).map(r => {
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = r[i]?.trim());
        return obj;
    });

    populateFilters();
}

// Populate dropdown filters dynamically
function populateFilters() {
    const subjects = [...new Set(allData.map(q => q.Subject))];
    const topics = [...new Set(allData.map(q => q.Topic))];
    const years = [...new Set(allData.map(q => q.Year))];

    populateDropdown("subjectSelect", subjects);
    populateDropdown("topicSelect", topics);
    populateDropdown("yearSelect", years);
}

function populateDropdown(id, items) {
    const select = document.getElementById(id);
    select.innerHTML = `<option value="">All</option>`;
    items.forEach(i => {
        if (i) select.innerHTML += `<option value="${i}">${i}</option>`;
    });
}

// Apply filters and display one question
function findQuestion() {
    const subject = document.getElementById("subjectSelect").value;
    const topic = document.getElementById("topicSelect").value;
    const year = document.getElementById("yearSelect").value;

    filteredData = allData.filter(q =>
        (!subject || q.Subject === subject) &&
        (!topic || q.Topic === topic) &&
        (!year || q.Year === year)
    );

    if (filteredData.length > 0) {
        const q = filteredData[0];
        document.getElementById("questionContainer").innerHTML = `
            <h3>Question Image</h3>
            ${q["Question Image"] ? `<img src="${q["Question Image"]}" width="400">` : "No image available"}
            <br><br>
            <button onclick="showSolution('${q["Solution"] || ""}')">View Marking / Solution</button>
        `;
    } else {
        document.getElementById("questionContainer").innerHTML = `
            <p>No question found for these filters!</p>
        `;
    }
}

// Show the solution in an alert or new window
function showSolution(solution) {
    if (solution) {
        alert("Solution:\n\n" + solution);
    } else {
        alert("No solution available for this question.");
    }
}

window.onload = loadCSV;
</script>

