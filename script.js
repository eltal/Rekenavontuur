
const questions = {
    optellen: [
        { q: "123 + 456 = ?", options: ["579", "589", "599", "609"], answer: "579" },
        { q: "987 + 123 = ?", options: ["1110", "1010", "1100", "1200"], answer: "1110" }
    ],
    tafels: [
        { q: "7 × 8 = ?", options: ["56", "64", "48", "54"], answer: "56" },
        { q: "6 × 9 = ?", options: ["54", "56", "64", "52"], answer: "54" }
    ],
    breuken: [
        { q: "Wat is de helft van 1/2?", options: ["1/4", "1/2", "1", "2"], answer: "1/4" },
        { q: "Wat is 1/3 + 1/3?", options: ["2/3", "1/6", "1", "3/6"], answer: "2/3" }
    ]
};

let currentQuestion, currentTopic, score = 0, timer, timeLeft;

function startGame() {
    const avatar = document.getElementById("avatar-select").value;
    currentTopic = document.getElementById("topic-select").value;
    document.getElementById("avatar-display").textContent = avatar;
    document.getElementById("setup-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    score = localStorage.getItem("score") || 0;
    document.getElementById("score").textContent = score;
    generateQuestion();
}

function generateQuestion() {
    const list = questions[currentTopic];
    currentQuestion = list[Math.floor(Math.random() * list.length)];
    document.getElementById("question-container").innerHTML = "<h2>" + currentQuestion.q + "</h2>";
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    document.getElementById("feedback").innerHTML = "";

    currentQuestion.options.forEach(opt => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => checkAnswer(opt);
        optionsContainer.appendChild(div);
    });

    startTimer();
}

function checkAnswer(selected) {
    clearInterval(timer);
    const feedback = document.getElementById("feedback");
    if (selected === currentQuestion.answer) {
        score = parseInt(score) + 10;
        localStorage.setItem("score", score);
        feedback.innerHTML = "✅ Goed gedaan!";
    } else {
        feedback.innerHTML = "❌ Oeps! Het juiste antwoord was: " + currentQuestion.answer;
    }
    document.getElementById("score").textContent = score;
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").textContent = "⏱️ " + timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = "⏱️ " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("feedback").innerHTML = "⏰ Tijd is om! Het juiste antwoord was: " + currentQuestion.answer;
        }
    }, 1000);
}
