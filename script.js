const API_URL = "https://script.google.com/macros/s/AKfycbwpzB6tOE0ywB7NDeYwcfP7DSQcDo0GbEdZFRTImWMzMQ3jQeb54RuWeC0RBqcVEunu/exec";

let questions = [];

window.onload = async () => {
  try {
    const res = await fetch(API_URL);
    questions = await res.json();
    populateFilters();
  } catch (err) {
    console.error("Error fetching questions:", err);
  }
};

function populateFilters() {
  const langSelect = document.getElementById("languageCourse");
  const topicSelect = document.getElementById("topic");
  const yearSelect = document.getElementById("year");
  const typeSelect = document.getElementById("questionType");

  const languages = [...new Set(questions.map(q => q.LanguageCourse))];
  const topics = [...new Set(questions.map(q => q.Topic))];
  const years = [...new Set(questions.map(q => q.Year))];
  const types = [...new Set(questions.map(q => q.Type))];

  languages.forEach(l => { const opt = document.createElement("option"); opt.value = l; opt.textContent = l; langSelect.appendChild(opt); });
  topics.forEach(t => { const opt = document.createElement("option"); opt.value = t; opt.textContent = t; topicSelect.appendChild(opt); });
  years.forEach(y => { const opt = document.createElement("option"); opt.value = y; opt.textContent = y; yearSelect.appendChild(opt); });
  types.forEach(t => { const opt = document.createElement("option"); opt.value = t; opt.textContent = t; typeSelect.appendChild(opt); });
}

function getQuestion() {
  const lang = document.getElementById("languageCourse").value;
  const topic = document.getElementById("topic").value;
  const year = document.getElementById("year").value;
  const type = document.getElementById("questionType").value;

  let filtered = questions;

  if(lang) filtered = filtered.filter(q => q.LanguageCourse === lang);
  if(topic) filtered = filtered.filter(q => q.Topic === topic);
  if(year) filtered = filtered.filter(q => q.Year === year);
  if(type) filtered = filtered.filter(q => q.Type === type);

  const questionBox = document.getElementById("questionText");
  const imageEl = document.getElementById("questionImage");
  const solutionLink = document.getElementById("solutionLink");

  if(filtered.length > 0){
    const q = filtered[Math.floor(Math.random() * filtered.length)];
    questionBox.textContent = q.Question;
    imageEl.src = q.ImageLink;
    solutionLink.href = q.SolutionLink;
  } else {
    questionBox.textContent = "No question found for these filters!";
    imageEl.src = "";
    solutionLink.href = "#";
  }
}



