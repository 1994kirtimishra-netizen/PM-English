/* ============================================================
   PM English — site data & behaviour
   To add more lessons later: find the grade's entry in LESSONS
   below and add a new object to its array. Set ready: true and
   fill vocab / story / questions once the lesson is written.
   ============================================================ */

const GRADES = [
  { id: "nursery", label: "Nursery", color: "#E8A33D" },
  { id: "lkg",     label: "LKG",     color: "#C1443B" },
  { id: "ukg",     label: "UKG",     color: "#1E3A5F" },
  { id: "1",       label: "Class 1", color: "#24463B" },
  { id: "2",       label: "Class 2", color: "#C9821F" },
  { id: "3",       label: "Class 3", color: "#1E3A5F" },
  { id: "4",       label: "Class 4", color: "#C1443B" },
  { id: "5",       label: "Class 5", color: "#24463B" },
  { id: "6",       label: "Class 6", color: "#1E3A5F" },
  { id: "7",       label: "Class 7", color: "#C9821F" },
  { id: "8",       label: "Class 8", color: "#24463B" },
  { id: "9",       label: "Class 9", color: "#C1443B" },
  { id: "10",      label: "Class 10", color: "#1E3A5F" },
];

const LESSONS = {
  "3": [
    {
      title: "Naming Words (Nouns)",
      ready: true,
      vocab: ["teacher", "mango", "river", "kindness", "Bihar", "classroom"],
      story:
        "Riya walked into the classroom and placed her bag on the desk. Outside, a river flowed near the school, and a mango tree stood by the gate. Her teacher smiled and said, \"Good morning, everyone.\"",
      questions: [
        { q: "Find one naming word for a place in the story.", a: "classroom / river" },
        { q: "Find one naming word for a person.", a: "teacher / Riya" },
        { q: "Find one naming word for a thing.", a: "bag / desk / mango tree" },
      ],
    },
    { title: "Action Words (Verbs)", ready: false },
    { title: "Describing Words (Adjectives)", ready: false },
    { title: "Simple Sentences", ready: false },
  ],
};

const FALLBACK_TOPICS = [
  { title: "Lessons for this class are being written", ready: false },
];

function initTopicList(){
  const list = document.querySelector("[data-topic-list]");
  if(!list) return;

  const params = new URLSearchParams(location.search);
  const gradeId = params.get("grade") || "3";
  const grade = GRADES.find(g => g.id === gradeId) || GRADES.find(g => g.id === "3");
  const topics = LESSONS[grade.id] || FALLBACK_TOPICS;

  document.querySelectorAll("[data-grade-label]").forEach(el => el.textContent = grade.label);

  list.innerHTML = "";

  topics.forEach((topic, i) => {
    const li = document.createElement("li");
    li.className = "topic-item" + (topic.ready ? " is-ready" : "");

    const btn = document.createElement("button");
    btn.className = "topic-btn";
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = `<span>${topic.title}</span><span class="status">${topic.ready ? "Open lesson" : "Coming soon"}</span>`;

    const body = document.createElement("div");
    body.className = "topic-body";

    if(topic.ready){
      body.innerHTML = `
        <h3>Words to know</h3>
        <ul class="vocab-grid">${topic.vocab.map(w => `<li>${w}</li>`).join("")}</ul>
        <h3>Read this</h3>
        <p class="story-box">${topic.story}</p>
        <h3>Try it</h3>
        <ol class="qa-list">
          ${topic.questions.map(item => `<li>${item.q}<span class="answer">Answer: ${item.a}</span></li>`).join("")}
        </ol>
      `;
      btn.addEventListener("click", () => {
        const isOpen = li.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });
    } else {
      btn.disabled = false;
      btn.addEventListener("click", () => {
        const isOpen = li.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });
      body.innerHTML = `<p>This lesson hasn't been added yet. Check back soon.</p>`;
    }

    li.appendChild(btn);
    li.appendChild(body);
    list.appendChild(li);
  });
}

function initShelf(){
  const shelf = document.querySelector("[data-shelf]");
  if(!shelf) return;
  shelf.innerHTML = GRADES.map(g => `
    <a class="spine" style="background:${g.color}" href="class.html?grade=${g.id}">
      ${g.label}
      <span class="lvl">${(LESSONS[g.id] && LESSONS[g.id].some(t => t.ready)) ? "Lessons ready" : "Coming soon"}</span>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initShelf();
  initTopicList();
});
