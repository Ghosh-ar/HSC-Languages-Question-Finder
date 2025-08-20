// 🔗 Replace this with your Apps Script web app URL
const apiUrl = "https://script.google.com/macros/s/AKfycbwpzB6tOE0ywB7NDeYwcfP7DSQcDo0GbEdZFRTImWMzMQ3jQeb54RuWeC0RBqcVEunu/exec";

let questionsData = [];

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    questionsData = await response.json();
    populateFilters();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateFilters() {
  const courses = [...new Set(questionsData.map(q => q.LanguageCourse).filter(Boolean))];
  const topics = [...new Set(questionsData.map(q => q.Topic).filter(Boolean))];
  const years = [...new Set(questionsData.map(q => q.Year).filter(Boolean))];
  const types = [...new Set(questionsData.map(q => q.Type).filter(Boolean))];

  fillSelect("languageCourse", courses);
  fillSelect("topic", topics);
  fillSelect("year", years);
  fillSelect("questionType", types);
}

function fillSelect(id, options) {
  const select = document.getElementById(id);
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

function getQuestion() {
  const course = document.getElementById("languageCourse").value;
  const topic = document.getElementById("topic").value;
  const year = document.getElementById("year").value;
  const type = document.getElementById("questionType").value;

  const filtered = questionsData.filter(q =>
    (!course || q.LanguageCourse === course) &&
    (!topic || q.Topic === topic) &&
    (!year || q.Year.toString() === year) &&
    (!type || q.Type === type)
  );

  if (filtered.length > 0) {
    const question = filtered[Math.floor(Math.random() * filtered.length)];
    displayQuestion(question);
  } else {
    document.getElementById("questionText").innerText = "No question found for these filters!";
    document.getElementById("questionImage").style.display = "none";
    document.getElementById("solutionLink").style.display = "none";
  }
}

function displayQuestion(record) {
  // Show question text
  document.getElementById("questionText").innerText = record.Question || "No question text";

  // Show question image
  const img = document.getElementById("questionImage");
  if (record.ImageLink) {
    img.src = record.ImageLink;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  // Show solution link
  const solution = document.getElementById("solutionLink");
  if (record.SolutionLink) {
    solution.href = record.SolutionLink;
    solution.style.display = "inline";
  } else {
    solution.style.display = "none";
  }
}

fetchData();
