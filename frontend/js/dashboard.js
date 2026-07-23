const accessToken = localStorage.getItem("access");

if (!accessToken) {
    window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

const welcomeText = document.getElementById("welcomeText");

if (user) {
    welcomeText.textContent = `Welcome, ${user.name} 👋`;
}

const logoutCard = document.getElementById("logoutCard");

logoutCard.addEventListener("click", () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

const uploadResume = document.getElementById("uploadResume");

uploadResume.addEventListener("click", () => {

    window.location.href = "resume-upload.html";

});