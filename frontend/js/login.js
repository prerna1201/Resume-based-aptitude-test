// ===============================
// Login Form
// ===============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get user input

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    // Get registered user from Local Storage

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if user exists

    if (!storedUser) {

        alert("No account found! Please register first.");

        return;

    }

    // Check email and password

    if (email === storedUser.email && password === storedUser.password) {

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password!");

    }

});