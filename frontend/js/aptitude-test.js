/* =========================================================
   AptiResume AI
   Professional Assessment Portal
========================================================= */


/* =========================================================
   SAMPLE QUESTIONS
   (Later these will come from Django + Gemini)
========================================================= */

const questions = [

    {

        question: "Which HTML tag is used to create a hyperlink?",

        options: [

            "<a>",

            "<link>",

            "<url>",

            "<href>"

        ],

        answer: 0,

        topic: "HTML"

    },

    {

        question: "Which CSS property changes text color?",

        options: [

            "font-color",

            "text-color",

            "color",

            "background"

        ],

        answer: 2,

        topic: "CSS"

    },

    {

        question: "Which keyword declares a variable in JavaScript?",

        options: [

            "int",

            "let",

            "define",

            "string"

        ],

        answer: 1,

        topic: "JavaScript"

    },

    {

        question: "Which SQL command retrieves data?",

        options: [

            "INSERT",

            "DELETE",

            "SELECT",

            "UPDATE"

        ],

        answer: 2,

        topic: "SQL"

    }

];


/* =========================================================
   VARIABLES
========================================================= */

let currentQuestion = 0;

let answers = new Array(questions.length).fill(null);

let review = new Array(questions.length).fill(false);


/* =========================================================
   GET HTML ELEMENTS
========================================================= */

const questionText =
document.getElementById("questionText");

const optionsContainer =
document.getElementById("optionsContainer");

const questionPalette =
document.getElementById("questionPalette");

const progressFill =
document.getElementById("progressFill");

const answeredCount =
document.getElementById("answeredCount");

const reviewCount =
document.getElementById("reviewCount");

const remainingCount =
document.getElementById("remainingCount");

const questionNumber =
document.getElementById("questionNumber");

const questionCount =
document.getElementById("questionCount");

const totalQuestions =
document.getElementById("totalQuestions");


/* =========================================================
   INITIAL VALUES
========================================================= */

questionCount.textContent = questions.length;

totalQuestions.textContent = questions.length;
/* =========================================================
   DISPLAY QUESTION
========================================================= */

function displayQuestion() {

    const q = questions[currentQuestion];

    // Question Number
    questionNumber.textContent = currentQuestion + 1;

    // Question Text
    questionText.textContent = q.question;

    // Update Topic (if element exists)
    const topicElement = document.getElementById("questionTopic");
    if (topicElement) {
        topicElement.textContent = q.topic;
    }

    // Clear Previous Options
    optionsContainer.innerHTML = "";

    // Create Options
    q.options.forEach((option, index) => {

        const optionDiv = document.createElement("div");

        optionDiv.className = "option";

        optionDiv.textContent = option;

        // Restore Selected Answer
        if (answers[currentQuestion] === index) {
            optionDiv.classList.add("active");
        }

        optionDiv.addEventListener("click", () => {

            // Save Answer
            answers[currentQuestion] = index;

            // Remove Active Class
            document.querySelectorAll(".option").forEach(opt => {
                opt.classList.remove("active");
            });

            // Highlight Selected
            optionDiv.classList.add("active");

            // Update UI
            updatePalette();

            updateProgress();

        });

        optionsContainer.appendChild(optionDiv);

    });

}
/* =========================================================
   CREATE QUESTION PALETTE
========================================================= */

function createPalette() {

    questionPalette.innerHTML = "";

    questions.forEach((q, index) => {

        const btn = document.createElement("button");

        btn.className = "palette-btn";

        btn.textContent = index + 1;

        btn.addEventListener("click", () => {

            currentQuestion = index;

            displayQuestion();

            updatePalette();

        });

        questionPalette.appendChild(btn);

    });

}
/* =========================================================
   UPDATE QUESTION PALETTE
========================================================= */

function updatePalette() {

    const buttons = document.querySelectorAll(".palette-btn");

    buttons.forEach((btn, index) => {

        btn.className = "palette-btn";

        if (index === currentQuestion) {
            btn.classList.add("active");
        }

        if (answers[index] !== null) {
            btn.classList.add("answered");
        }

        if (review[index]) {
            btn.classList.add("review");
        }

    });

}
/* =========================================================
   INITIALIZE
========================================================= */

createPalette();

displayQuestion();

updatePalette();
/* =========================================================
   PREVIOUS BUTTON
========================================================= */

document.getElementById("prevBtn").addEventListener("click", () => {

    if(currentQuestion > 0){

        currentQuestion--;

        displayQuestion();

        updatePalette();

        updateProgress();

    }

});


/* =========================================================
   NEXT BUTTON
========================================================= */

document.getElementById("nextBtn").addEventListener("click", () => {

    if(currentQuestion < questions.length - 1){

        currentQuestion++;

        displayQuestion();

        updatePalette();

        updateProgress();

    }

});


/* =========================================================
   MARK FOR REVIEW
========================================================= */

document.getElementById("reviewBtn").addEventListener("click", () => {

    review[currentQuestion] = !review[currentQuestion];

    updatePalette();

    updateProgress();

});
/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress(){

    const answered = answers.filter(a => a !== null).length;

    const reviewQuestions = review.filter(r => r).length;

    const remaining = questions.length - answered;

    answeredCount.textContent = answered;

    reviewCount.textContent = reviewQuestions;

    remainingCount.textContent = remaining;

    progressFill.style.width =
        ((answered / questions.length) * 100) + "%";

}
/* =========================================================
   INITIAL PROGRESS
========================================================= */

updateProgress();
/* =========================================================
   TIMER
========================================================= */

let totalTime = 30 * 60; // 30 Minutes

const timer = document.getElementById("timer");

function startTimer() {

    const interval = setInterval(() => {

        const minutes = Math.floor(totalTime / 60);

        const seconds = totalTime % 60;

        timer.textContent =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        totalTime--;

        if (totalTime < 0) {

            clearInterval(interval);

            alert("Time's Up! Your assessment will be submitted.");

            submitAssessment();

        }

    }, 1000);

}

startTimer();
/* =========================================================
   SUBMIT MODAL
========================================================= */

const submitBtn = document.getElementById("submitBtn");

const submitModal = document.getElementById("submitModal");

const cancelSubmit = document.getElementById("cancelSubmit");

const confirmSubmit = document.getElementById("confirmSubmit");

submitBtn.addEventListener("click", () => {

    submitModal.style.display = "flex";

});

cancelSubmit.addEventListener("click", () => {

    submitModal.style.display = "none";

});
/* =========================================================
   SUBMIT ASSESSMENT
========================================================= */

function submitAssessment() {

    localStorage.setItem(

        "assessmentAnswers",

        JSON.stringify(answers)

    );

    localStorage.setItem(

        "assessmentReview",

        JSON.stringify(review)

    );

    localStorage.setItem(

        "assessmentScore",

        answers.filter((ans, index) => ans === questions[index].answer).length

    );

    window.location.href = "result.html";

}

confirmSubmit.addEventListener("click", submitAssessment);