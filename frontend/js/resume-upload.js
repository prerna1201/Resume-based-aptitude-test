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

analyzeBtn.addEventListener("click", () => {

    window.location.href = "resume-analysis.html";

});