const token = localStorage.getItem("access");

if (!token) {
    location.href = "login.html";
}

getAuthenticatedUser().then(user => {
    if (!user?.full_name) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById("candidateName").textContent =
        `Resume Analysis - ${user.full_name}`;
});

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
.addEventListener("click", async () => {

    const generateButton = document.getElementById("generateTestBtn");

    const resumeId = localStorage.getItem("resume_id");

    if (!resumeId) {
        alert("Resume not found.");
        return;
    }

    try {

        generateButton.disabled = true;
        generateButton.textContent = "Generating test...";

        const response = await fetch(
            `http://127.0.0.1:8000/api/tests/generate/${resumeId}/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.status === 401) {
            clearSession();
            alert("Your session has expired. Please log in again.");
            window.location.href = "login.html";
            return;
        }

        if (response.ok && data.questions && data.test_id) {

            localStorage.setItem("questions", JSON.stringify(data.questions));
            localStorage.setItem("test_id", String(data.test_id));

            // Build the URL from the current page so this works under both
            // http://localhost:5500/ and http://localhost:5500/frontend/.
            window.location.replace(
                new URL("aptitude-test.html", window.location.href).href
            );

        } else {

            alert(data.detail || "Failed to generate test.");

        }

    } catch (err) {

        console.error(err);
        alert("Cannot connect to backend.");

    } finally {

        // This runs only if navigation did not happen.
        generateButton.disabled = false;
        generateButton.textContent = "Generate Aptitude Test";

    }

});
