const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const branch = document.getElementById("branch").value.trim();
    const year = document.getElementById("year").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
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

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8000/api/users/register/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: name,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            alert(data.error || "Registration failed.");

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to backend.");

    }

});

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