// =========================================
// Elements
// =========================================

const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const savePassword = document.getElementById("savePassword");

// =========================================
// Show / Hide Password
// =========================================

togglePassword.addEventListener("click", () => {

    if (newPassword.type === "password") {

        newPassword.type = "text";
        togglePassword.classList.replace("bi-eye-slash", "bi-eye");

    } else {

        newPassword.type = "password";
        togglePassword.classList.replace("bi-eye", "bi-eye-slash");

    }

});

toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";
        toggleConfirmPassword.classList.replace("bi-eye-slash", "bi-eye");

    } else {

        confirmPassword.type = "password";
        toggleConfirmPassword.classList.replace("bi-eye", "bi-eye-slash");

    }

});

// =========================================
// Password Strength Checker
// =========================================

newPassword.addEventListener("input", () => {

    const password = newPassword.value;

    let score = 0;

    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    document.getElementById("lengthRule").textContent =
        (hasLength ? "✅" : "❌") + " Minimum 8 characters";

    document.getElementById("upperRule").textContent =
        (hasUpper ? "✅" : "❌") + " One Uppercase Letter";

    document.getElementById("lowerRule").textContent =
        (hasLower ? "✅" : "❌") + " One Lowercase Letter";

    document.getElementById("numberRule").textContent =
        (hasNumber ? "✅" : "❌") + " One Number";

    document.getElementById("specialRule").textContent =
        (hasSpecial ? "✅" : "❌") + " One Special Character";

    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    const percentage = (score / 5) * 100;

    strengthBar.style.width = percentage + "%";

    if (score <= 2) {

        strengthBar.className = "progress-bar bg-danger";
        strengthText.textContent = "Weak Password";

    } else if (score <= 4) {

        strengthBar.className = "progress-bar bg-warning";
        strengthText.textContent = "Medium Password";

    } else {

        strengthBar.className = "progress-bar bg-success";
        strengthText.textContent = "Strong Password";

    }

});

// =========================================
// Save Password
// =========================================

savePassword.addEventListener("click", () => {

    const password = newPassword.value;
    const confirm = confirmPassword.value;

    if (password !== confirm) {

        alert("Passwords do not match.");
        return;

    }

    if (password.length < 8) {

        alert("Password must be at least 8 characters.");
        return;

    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("No account found.");
        return;

    }

    user.password = password;

    localStorage.setItem("user", JSON.stringify(user));

    alert("Password Updated Successfully!");

    window.location.href = "login.html";

});