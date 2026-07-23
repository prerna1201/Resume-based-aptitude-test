const token = localStorage.getItem("access");

if (!token) {
    location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("candidateName").textContent =
        `Resume Analysis - ${user.name}`;
}

const skills = JSON.parse(localStorage.getItem("skills")) || [];

const container = document.querySelector(".skills-container");

container.innerHTML = "";

skills.forEach(skill => {

    const span = document.createElement("span");

    span.className = "skill";

    span.textContent = skill;

    container.appendChild(span);

});

document
.getElementById("generateTestBtn")
.addEventListener("click", () => {

    location.href = "aptitude-test.html";

});