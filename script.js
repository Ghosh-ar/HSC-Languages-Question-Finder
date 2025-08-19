const API_URL = "https://script.google.com/macros/s/AKfycbwpzB6tOE0ywB7NDeYwcfP7DSQcDo0GbEdZFRTImWMzMQ3jQeb54RuWeC0RBqcVEunu/exec";

let questions = [];

// Load questions from Google Sheets API
window.onload = async () => {
  try {
    const res = await fetch(API_URL);
    questions = await res.json();
    populateSubjects();
  } catch (err) {
    console.error("Error fetching questions:", err);
  }
};

// Populate Subject dropdown
function populateSubjects() {
  const subjectSelect = document.getElementById("subject");
  const subjects = [...new Set(questions.map(q => q.Subject))];
  subjects.forEach(s => {
    const option = document.createElement("option");
    option.value = s;
    option.textContent = s;
    subjectSelect.appendChild(option);
  });

  subjectSelect.addEventListener("change", populateTopics);
}

// Populate Topic dropdown based on selected subject
function populateTopics() {
  const topicSelect = document.getElementById("topic");
  topicSelect.innerHTML = "<option value=''>Select Topic</option>";
  const subject = document.getElementById("subject").value;

  const topics = [...new Set(
    questions.filter(q => q.Subject === subject).map(q => q.Topic)
  )];

  topics.forEach(t => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t;
    topicSelect.appendChild(option);
  });
}

// Get filtered question
function getQuestion() {
  const subject = document.getElementById("subject").value;
  const topic = document.getElementById("topic").value;
  const difficulty = document.getElementById("difficulty").value;

  let filtered = questions;

  if (subject) filtered = filtered.filter(q => q.Subject === subject);
  if (topic) filtered = filtered.filter(q => q.Topic === topic);
  if (difficulty) filtered = filtered.filter(q => q.Difficulty === difficulty);

  const box = document.getElementById("questionBox");

  if (filtered.length > 0) {
    const q = filtered[Math.floor(Math.random() * filtered.length)];
    box.textContent = q.Question;
  } else {
    box.textContent = "No questions found for these filters!";
  }
}

