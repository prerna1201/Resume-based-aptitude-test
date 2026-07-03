// =========================================
// Aptitude Test
// =========================================

// Get Logged-in User

const user = JSON.parse(localStorage.getItem("user"));

const userName = document.getElementById("userName");

if(user){

    userName.textContent = `Welcome, ${user.name}`;

}else{

    window.location.href = "login.html";

}

// =========================================
// Questions
// =========================================

const questions = [

    {
        question:"Which HTML tag is used to create a hyperlink?",
        options:["<link>","<a>","<href>","<url>"],
        answer:1
    },

    {
        question:"Which CSS property changes text color?",
        options:["font-color","color","text-color","background"],
        answer:1
    },

    {
        question:"Which keyword declares a variable in JavaScript?",
        options:["int","variable","let","define"],
        answer:2
    },

    {
        question:"Which company developed React?",
        options:["Google","Meta","Microsoft","Amazon"],
        answer:1
    },

    {
        question:"Which HTML tag inserts an image?",
        options:["<picture>","<img>","<image>","<src>"],
        answer:1
    },

    {
        question:"Which symbol is used for comments in JavaScript?",
        options:["//","#","<!-- -->","**"],
        answer:0
    },

    {
        question:"Which CSS property makes text bold?",
        options:["font-style","font-weight","text-bold","bold"],
        answer:1
    },

    {
        question:"What does CSS stand for?",
        options:[
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        answer:1
    },

    {
        question:"Which HTML tag creates a line break?",
        options:["<break>","<lb>","<br>","<newline>"],
        answer:2
    },

    {
        question:"Which method prints data in the browser console?",
        options:[
            "console.log()",
            "print()",
            "echo()",
            "document.write()"
        ],
        answer:0
    }

];

let currentQuestion = 0;
let selectedAnswers = new Array(questions.length).fill(null);
// =========================================
// Timer
// =========================================

let timeLeft = 30 * 60; // 30 minutes
// =========================================
// Get Elements
// =========================================

const questionText = document.getElementById("question");

const optionButtons = document.querySelectorAll(".option");

const questionNumber = document.getElementById("questionNumber");

const totalQuestions = document.getElementById("totalQuestions");

// =========================================
// Load Question
// =========================================

function loadQuestion(){

    const current = questions[currentQuestion];

    questionNumber.textContent = currentQuestion + 1;

    totalQuestions.textContent = questions.length;

    questionText.textContent = current.question;

    optionButtons.forEach((button,index)=>{

    button.textContent = current.options[index];

    button.classList.remove("selected");

    if(selectedAnswers[currentQuestion] === index){

        button.classList.add("selected");

    }

});

}

loadQuestion();
// =========================================
// Navigation Buttons
// =========================================

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

// Next Button

nextBtn.addEventListener("click", () => {

    if(currentQuestion < questions.length - 1){

        currentQuestion++;

        loadQuestion();

    }

});

// Previous Button

prevBtn.addEventListener("click", () => {

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

});
// =========================================
// Option Selection
// =========================================

optionButtons.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        selectedAnswers[currentQuestion]=index;

        loadQuestion();

    });

});
// =========================================
// Countdown Timer
// =========================================

const timer = document.getElementById("time");

function startTimer(){

    const countdown = setInterval(()=>{

        let minutes = Math.floor(timeLeft / 60);

        let seconds = timeLeft % 60;

        timer.textContent =
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

        if(timeLeft <= 0){

            clearInterval(countdown);

            alert("Time is over! Test submitted automatically.");

        }

        timeLeft--;

    },1000);

}

startTimer();
// =========================================
// Submit Test
// =========================================

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {

    let score = 0;

    questions.forEach((question, index) => {

        if(selectedAnswers[index] === question.answer){

            score++;

        }

    });

    // Save Result

    localStorage.setItem("score", score);

    localStorage.setItem("totalQuestions", questions.length);

    window.location.href = "results.html";

});