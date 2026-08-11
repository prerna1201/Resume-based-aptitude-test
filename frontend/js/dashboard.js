const accessToken = localStorage.getItem("access");
const welcomeText = document.getElementById("welcomeText");

if (!accessToken) {
    window.location.href = "login.html";
} else {
    getAuthenticatedUser().then(user => {
        if (!user?.full_name) {
            window.location.href = "login.html";
            return;
        }
        welcomeText.textContent = `Welcome, ${user.full_name} 👋`;
    });
}

document.getElementById("logoutCard").addEventListener("click", () => {
    clearSession();
    window.location.href = "login.html";
});

document.getElementById("uploadResume").addEventListener("click", () => {
    window.location.href = "resume-upload.html";
});
