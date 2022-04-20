// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        // Soal nomer 1
        question: "Benda apa ini?",
        imgSrc: "question1.jpg",
        choiceA: "Motorboat",
        choiceB: "Ship",
        choiceC: "Boat",
        correct: "A"
    }, {
        // Soal nomer 2
        question: "Apa Verb2 dari aktivitas di gambar?",
        imgSrc: "question2.jpg",
        choiceA: "eaten",
        choiceB: "ate",
        choiceC: "eat",
        correct: "B"
    }, {
        // Soal nomer 3
        question: "Dimanakah tempat di samping?",
        imgSrc: "question3.jpg",
        choiceA: "Market",
        choiceB: "Garden",
        choiceC: "Yard",
        correct: "A"
    }, {
        // Soal nomer 4 (gaada gambar)
        question: "Benda apakah ini?",
        imgSrc: "question4.jpg",
        choiceA: "Socks",
        choiceB: "Scraf",
        choiceC: "Shoes",
        correct: "C"
    }, {
        // Soal nomer 5
        question: "Apa Verb3 dari aktivitas berikut?",
        imgSrc: "question5.jpg",
        choiceA: "drive",
        choiceB: "drove",
        choiceC: "driven",
        correct: "C"
    }, {
        // Soal nomer 6
        question: "Yang manakah yang merupakan verb 1 dari gambar di samping?",
        imgSrc: "question6.jpg",
        choiceA: "write",
        choiceB: "wrote",
        choiceC: "written",
        correct: "A"
    }, {
        // Soal nomer 7
        question: "Apa kata yang paling tepat untuk melengkapi kalimat tersebut?",
        imgSrc: "question7.png",
        choiceA: "gone",
        choiceB: "go",
        choiceC: "went",
        correct: "C"
    }, {
        // Soal nomer 8
        question: "Manakah pemilihan kata yang paling tepat?",
        imgSrc: "question8.png",
        choiceA: "In",
        choiceB: "On",
        choiceC: "At",
        correct: "B"
    }, {
        // Soal nomer 9 (gaada gambar)
        question: "Siapa kah George bagi Addison?",
        imgSrc: "question9.jpg",
        choiceA: "Nephew",
        choiceB: "Cousin",
        choiceC: "Brother",
        correct: "B"
    }, {
        // Soal nomer 10
        question: "Jam berapakah ini?",
        imgSrc: "question10.png",
        choiceA: "3.15",
        choiceB: "3.45",
        choiceC: "2.45",
        correct: "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 200; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#597d35";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#7e2811";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "emoji1.png" :
        (scorePerCent >= 60) ? "emoji2.png" :
            (scorePerCent >= 40) ? "emoji3.png" :
                (scorePerCent >= 20) ? "emoji4.png" :
                    "emoji5.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}