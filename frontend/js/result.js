/* ==========================================
   LOAD RESULT DATA
========================================== */

const questions = JSON.parse(localStorage.getItem("questions")) || [];

const answers = JSON.parse(localStorage.getItem("assessmentAnswers")) || [];

const review = JSON.parse(localStorage.getItem("assessmentReview")) || [];

let correct = 0;
let wrong = 0;
let unanswered = 0;

questions.forEach((q, index) => {

    if (answers[index] == null) {

        unanswered++;

    }

    else if (answers[index] === q.answer) {

        correct++;

    }

    else {

        wrong++;

    }

});

const total = questions.length || 10;

const accuracy = Math.round((correct / total) * 100);
/* ==========================================
   UPDATE DASHBOARD
========================================== */

document.getElementById("correctAnswers").textContent = correct;

document.getElementById("wrongAnswers").textContent = wrong;

document.getElementById("accuracy").textContent = accuracy + "%";

document.getElementById("scoreValue").textContent = accuracy + "%";
/* ==========================================
   PERFORMANCE BAR
========================================== */

document.querySelector(".performance-fill").style.width =
accuracy + "%";
/* ==========================================
   SCORE CIRCLE
========================================== */

const circle = document.getElementById("progressCircle");

const radius = 75;

const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;

const offset = circumference - (accuracy / 100) * circumference;

circle.style.strokeDashoffset = offset;
/* ==========================================
   PERFORMANCE LEVEL
========================================== */

const heroTitle = document.querySelector(".hero-text h2");

if (accuracy >= 90) {

    heroTitle.innerHTML = "🏆 Outstanding Performance";

}

else if (accuracy >= 80) {

    heroTitle.innerHTML = "⭐ Excellent Performance";

}

else if (accuracy >= 70) {

    heroTitle.innerHTML = "👍 Very Good Performance";

}

else if (accuracy >= 60) {

    heroTitle.innerHTML = "📘 Good Performance";

}

else {

    heroTitle.innerHTML = "📚 Needs Improvement";

}
/* ==========================================
   QUESTION ANALYSIS CHART
========================================== */

new Chart(document.getElementById("questionChart"), {

    type: "doughnut",

    data: {

        labels: [

            "Correct",

            "Wrong",

            "Unanswered"

        ],

        datasets: [{

            data: [

                correct,

                wrong,

                unanswered

            ],

            backgroundColor: [

                "#10b981",

                "#ef4444",

                "#94a3b8"

            ],

            borderWidth: 0

        }]

    },

    options: {

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    }

});
/* ==========================================
   TOPIC PERFORMANCE
========================================== */

new Chart(document.getElementById("topicChart"), {

    type: "bar",

    data: {

        labels: [

            "HTML",

            "CSS",

            "JavaScript",

            "SQL",

            "Reasoning"

        ],

        datasets: [{

            label: "Performance",

            data: [

                90,

                84,

                78,

                65,

                88

            ],

            borderRadius:10,

            backgroundColor:[

                "#2563eb",

                "#10b981",

                "#f59e0b",

                "#ef4444",

                "#8b5cf6"

            ]

        }]

    },

    options: {

        responsive:true,

        plugins:{

            legend:{

                display:false

            }

        },

        scales:{

            y:{

                beginAtZero:true,

                max:100

            }

        }

    }

});
/* ==========================================
   AI FEEDBACK
========================================== */

let feedback = "";

if(accuracy >= 90){

feedback = `
Excellent performance!

You demonstrated outstanding technical knowledge.

You are interview ready for beginner developer roles.

Continue practicing advanced concepts.
`;

}

else if(accuracy >= 75){

feedback = `
Very good performance.

Your fundamentals are strong.

Focus on SQL and logical reasoning to improve further.
`;

}

else if(accuracy >= 60){

feedback = `
Good attempt.

You have basic understanding.

Practice more coding and aptitude questions before interviews.
`;

}

else{

feedback = `
Needs improvement.

Revise core concepts.

Practice daily aptitude questions.

Strengthen programming fundamentals.
`;

}

document.getElementById("aiFeedback").innerText = feedback;
/* ==========================================
   ACHIEVEMENT BADGE
========================================== */

const badge = document.querySelector(".badge");

if(accuracy >=90){

badge.innerHTML="🏆 Top Performer";

}

else if(accuracy>=80){

badge.innerHTML="⭐ Excellent Candidate";

}

else if(accuracy>=70){

badge.innerHTML="👍 Skilled Candidate";

}

else{

badge.innerHTML="📘 Keep Learning";

}
/* ==========================================
   DASHBOARD BUTTON
========================================== */

document.getElementById("homeBtn")

.addEventListener("click",()=>{

window.location.href="dashboard.html";

});
/* ==========================================
   RETAKE TEST
========================================== */

document.getElementById("retakeBtn")

.addEventListener("click",()=>{

window.location.href="aptitude-test.html";

});
/* ==========================================
   DOWNLOAD REPORT
========================================== */

document.getElementById("downloadBtn")

.addEventListener("click",()=>{

alert("PDF Report will be available after backend integration.");

});