
const questions = [
    { q: "Wat is 7 × 8?", options: ["56", "48", "64", "54"], answer: "56" },
    { q: "Wat is 125 + 378?", options: ["503", "493", "501", "502"], answer: "503" },
    { q: "Wat is 1000 - 457?", options: ["543", "547", "453", "537"], answer: "543" },
    { q: "Wat is de helft van 1/2?", options: ["1/4", "1", "1/2", "2"], answer: "1/4" }
];

let currentQuestion;

function generateQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const feedback = document.getElementById("feedback");

    const q = questions[Math.floor(Math.random() * questions.length)];
    currentQuestion = q;
    questionContainer.innerHTML = "<h2>" + q.q + "</h2>";
    optionsContainer.innerHTML = "";
    feedback.innerHTML = "";

    q.options.forEach(opt => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => checkAnswer(opt);
        optionsContainer.appendChild(div);
    });
}

function checkAnswer(selected) {
    const feedback = document.getElementById("feedback");
    if (selected === currentQuestion.answer) {
        feedback.innerHTML = "✅ Goed gedaan!";
    } else {
        feedback.innerHTML = "❌ Oeps! Het juiste antwoord was: " + currentQuestion.answer;
    }
}
window.onload = generateQuestion;
