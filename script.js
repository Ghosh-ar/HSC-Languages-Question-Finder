const API_URL = "https://script.google.com/macros/s/AKfycbwpzB6tOE0ywB7NDeYwcfP7DSQcDo0GbEdZFRTImWMzMQ3jQeb54RuWeC0RBqcVEunu/exec";

let questions = [];

// Fetch questions from the Google Sheets API
async function fetchQuestions() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    questions = data;

    populateFilters();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

// Fill dropdown filters
function populateFilters() {
  const subjects = [...new Set(questions.map(q => q.Subject))];
  const difficulties = [...new Set(questions.map(q => q.Difficulty))];

  const subjectSelect = document.getElementById("subject");
  const difficultySelect = document.getElementById("difficulty");

  subjects.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    subjectSelect.appendChild(opt);
  });

  difficulties.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    difficultySelect.appendChild(opt);
  });
}

// Get a filtered question
function getQuestion() {
  const subject = document.getElementById("subject").value;
  const difficulty = document.getElementById("difficulty").value;

  const filtered = questions.filter(q =>
    (!subject || q.Subject === subject) &&
    (!difficulty || q.Difficulty === difficulty)
  );

  const questionBox = document.getElementById("questionBox");
  if (filtered.length > 0) {
    const randomQ = filtered[Math.floor(Math.random() * filtered.length)];
    questionBox.textContent = randomQ.Question;
  } else {
    questionBox.textContent = "No questions found for that filter!";
  }
}

// Load questions when page opens
fetchQuestions();
