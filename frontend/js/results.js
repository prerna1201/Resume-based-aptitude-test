// =========================================
// Results Page
// =========================================

// Get User

const user = JSON.parse(localStorage.getItem("user"));

const score = Number(localStorage.getItem("score"));

const totalQuestions = Number(localStorage.getItem("totalQuestions"));

// Get Elements

const candidateName = document.getElementById("candidateName");
const scoreText = document.getElementById("score");
const percentageText = document.getElementById("percentage");
const performanceText = document.getElementById("performance");

// Display User

if(user){

    candidateName.textContent = `Congratulations, ${user.name}!`;

}

// Display Score

scoreText.textContent = `${score} / ${totalQuestions}`;

// Calculate Percentage

const percentage = Math.round((score / totalQuestions) * 100);

percentageText.textContent = `${percentage}%`;

// Performance

if(percentage >= 80){

    performanceText.textContent = "Excellent ⭐⭐⭐⭐⭐";

}else if(percentage >= 60){

    performanceText.textContent = "Good ⭐⭐⭐⭐";

}else if(percentage >= 40){

    performanceText.textContent = "Average ⭐⭐⭐";

}else{

    performanceText.textContent = "Needs Improvement ⭐⭐";

}

// Buttons

document.getElementById("retakeBtn").addEventListener("click",()=>{

    window.location.href="aptitude-test.html";

});

document.getElementById("dashboardBtn").addEventListener("click",()=>{

    window.location.href="dashboard.html";

});