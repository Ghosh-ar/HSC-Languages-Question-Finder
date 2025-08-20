// Use your new deployed Apps Script URL
const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLg52YLxdDB9-8P4C2Rr5AoTpRuwkcvZBr0vYrAnyG9D9tG3mEEeZCo97Y7mK2p6LiwV9zCl6FX6J0ub_-J3K4glQWaQoXMDf5uIRa1RfY9TCcf50kg6rKniAZ4S-0-awGg1KlQ8OwDCyKaa4YmXDS3-9X0rkzzPhT2PbKlcyMm39eneg3EXcKAqgPGmcBJ28SbhZMeTUmj-6_lYjPXYjOFAkpqPfFnojSST8EJ3fqNSOU0-mSkHBP7Gch4J0lXLP-5k4xdriHLkaZMIXO_FcIwm1jBnWg&lib=MGtuZOK-HqxDQ8MVPbSrVgphRpv1Jlb43";

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
    
    // Show text
    questionBox.textContent = q.Question || "Question text not available";

    // Show image (if any)
    if (q.ImageLink) {
      imageEl.src = q.ImageLink;
      imageEl.style.display = "block";
    } else {
      imageEl.src = "";
      imageEl.style.display = "none";
    }

    // Show solution link
    if (q.SolutionLink) {
      solutionLink.href = q.SolutionLink;
      solutionLink.style.display = "inline";
    } else {
      solutionLink.href = "#";
      solutionLink.style.display = "none";
    }
  } else {
    questionBox.textContent = "No question found for these filters!";
    imageEl.src = "";
    solutionLink.href = "#";
    solutionLink.style.display = "none";
  }
}
