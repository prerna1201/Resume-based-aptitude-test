// ===============================
// Dashboard Welcome Message
// ===============================

// Get user data from Local Storage
const user = JSON.parse(localStorage.getItem("user"));

// Get the welcome heading
const welcomeText = document.getElementById("welcomeText");

// Check if user exists
if (user) {

    welcomeText.textContent = `Welcome, ${user.name} 👋`;

} else {

    // If no user is found, send them back to login
    window.location.href = "login.html";

}
// ===============================
// Logout
// ===============================

const logoutCard = document.getElementById("logoutCard");

logoutCard.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("user");

        alert("Logged out successfully!");

        window.location.href = "login.html";

    }

});
// ===============================
// Resume Upload Navigation
// ===============================

const uploadResume = document.getElementById("uploadResume");

uploadResume.addEventListener("click", () => {

    window.location.href = "resume-upload.html";

});