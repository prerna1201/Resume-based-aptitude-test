// =========================================
// Resume Analysis
// =========================================

// Get User Data

const user = JSON.parse(localStorage.getItem("user"));

// Get Heading

const candidateName = document.getElementById("candidateName");

// Check User

if (user) {

    candidateName.textContent = `Resume Analysis - ${user.name}`;

} else {

    window.location.href = "login.html";

}

// =========================================
// Generate Test Button
// =========================================

const generateTestBtn = document.getElementById("generateTestBtn");

generateTestBtn.addEventListener("click", () => {

    window.location.href = "aptitude-test.html";

});