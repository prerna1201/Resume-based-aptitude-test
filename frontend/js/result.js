/* ==========================================
   LOAD RESULT DATA
========================================== */

const summary = JSON.parse(localStorage.getItem("resultSummary"));

getAuthenticatedUser().then(user => {
    if (!user?.full_name) {
        window.location.href = "login.html";
        return;
    }
    const nameElement = document.getElementById("loggedInUser");
    if (nameElement) nameElement.textContent = user.full_name;
});

if (!summary) {
    window.location.href = "dashboard.html";
}

const correct = summary ? summary.score : 0;
const total = summary ? summary.total_questions : 0;
const answered = JSON.parse(localStorage.getItem("assessmentAnswers")) || [];
const unanswered = Math.max(0, total - answered.filter(answer => answer !== null).length);
const wrong = Math.max(0, total - correct - unanswered);

const accuracy = total ? Math.round((correct / total) * 100) : 0;
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

document.getElementById("downloadBtn").addEventListener("click", async () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const user = await getAuthenticatedUser();

    const candidateName = user?.full_name || "Candidate";
    const email = user?.email || "Not Available";

    const percentage = accuracy;
    const score = correct;

    const skills =
        JSON.parse(localStorage.getItem("resumeSkills")) ||
        ["HTML", "CSS", "JavaScript"];

    doc.setFontSize(20);
    doc.text("AptiResume AI Report", 20, 20);

    doc.setFontSize(12);

    let y = 40;

    doc.text(`Candidate Name : ${candidateName}`,20,y);
    y+=10;

    doc.text(`Email : ${email}`,20,y);
    y+=10;

    doc.text(`Date : ${new Date().toLocaleDateString()}`,20,y);
    y+=10;

    doc.text(`Score : ${score}/${total}`,20,y);
    y+=10;

    doc.text(`Percentage : ${percentage}%`,20,y);
    y+=10;

    doc.text(`Correct Answers : ${correct}`,20,y);
    y+=10;

    doc.text(`Wrong Answers : ${wrong}`,20,y);
    y+=10;

    doc.text(`Unanswered : ${unanswered}`,20,y);
    y+=10;

    doc.text(`Skills : ${skills.join(", ")}`,20,y);
    y+=15;

    doc.setFontSize(16);
    doc.text("AI Feedback",20,y);

    y+=10;

    doc.setFontSize(11);

    const feedbackLines = doc.splitTextToSize(feedback,170);

    doc.text(feedbackLines,20,y);

    y += feedbackLines.length * 7 + 10;

    doc.setFontSize(16);
    doc.text("Recommendation",20,y);

    y+=10;

    doc.setFontSize(11);

    if(accuracy>=90){

        doc.text("Excellent performance. Keep learning advanced topics.",20,y);

    }

    else if(accuracy>=75){

        doc.text("Improve SQL and Logical Reasoning.",20,y);

    }

    else if(accuracy>=60){

        doc.text("Practice coding questions every day.",20,y);

    }

    else{

        doc.text("Revise fundamentals and solve aptitude questions regularly.",20,y);

    }

    doc.save(`AptiResume_Report_${candidateName}.pdf`);

});