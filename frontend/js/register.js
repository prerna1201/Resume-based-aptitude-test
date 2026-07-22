// ===============================
// Register Form Validation
// ===============================

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get Input Values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const branch = document.getElementById("branch").value.trim();
    const year = document.getElementById("year").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Empty Field Validation
    if (
        name === "" ||
        email === "" ||
        college === "" ||
        branch === "" ||
        year === "Select Year" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill all the fields.");
        return;
    }

    // Email Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
        alert("Please enter a valid email.");
        return;
    }

    // Password Length
    if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    // Confirm Password
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Save User in Local Storage
    const user = {
        name,
        email,
        college,
        branch,
        year,
        password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    window.location.href = "login.html";

});
// ===============================
// Show / Hide Password
// ===============================

const toggleIcons = document.querySelectorAll(".toggle-password");

toggleIcons.forEach((icon) => {

    icon.addEventListener("click", () => {

        const input = icon.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");

        } else {

            input.type = "password";

            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

        }

    });

});