// =========================================
// Resume Upload
// =========================================

// Get Elements

const analyzeBtn = document.getElementById("analyzeBtn");
const chooseFileBtn = document.getElementById("chooseFileBtn");
const resumeFile = document.getElementById("resumeFile");
const fileName = document.getElementById("fileName");

// Open File Explorer

chooseFileBtn.addEventListener("click", () => {

    resumeFile.click();

});

// When User Selects a File

resumeFile.addEventListener("change", () => {

    if (resumeFile.files.length === 0) {

        fileName.textContent = "No file selected";
        analyzeBtn.style.display = "none";

        return;

    }

    const file = resumeFile.files[0];

    // Allowed File Types

    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {

        alert("Please upload only PDF or DOC/DOCX files.");

        resumeFile.value = "";

        fileName.textContent = "No file selected";
        analyzeBtn.style.display = "none";

        return;

    }

    // Maximum File Size (5 MB)

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

        alert("File size should be less than 5 MB.");

        resumeFile.value = "";

        fileName.textContent = "No file selected";
        analyzeBtn.style.display = "none";

        return;

    }

    // Display File Name

    fileName.textContent = file.name;
    analyzeBtn.style.display = "block";

});
// Analyze Resume Button

analyzeBtn.addEventListener("click", async () => {

    const file = resumeFile.files[0];

    if (!file) {
        alert("Please select a resume first.");
        return;
    }

    const token = localStorage.getItem("access");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const formData = new FormData();

    // IMPORTANT
    formData.append("resume", file);

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/resumes/upload/",
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${token}`
                },

                body: formData
            }
        );

        const text = await response.text();

console.log(text);

const data = JSON.parse(text);

        console.log(data);

        if (response.ok) {

            localStorage.setItem("resume_id", data.resume_id);

            alert("Resume uploaded successfully!");

console.log("Before redirect");

setTimeout(() => {
    window.location.assign("resume-analysis.html");
}, 500);

console.log("After redirect");

        } else {

            alert(data.detail || data.error || "Upload failed.");

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to backend.");

    }

});