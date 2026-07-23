const loginForm = document.getElementById("loginForm");

console.log("login.js loaded");

loginForm.addEventListener("submit", async function (event) {

    console.log("Login button clicked");

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    console.log(username);

    try {

        console.log("Sending request...");

        const response = await fetch(
            "http://127.0.0.1:8000/api/users/login/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );

        console.log("Response received", response.status);

        const data = await response.json();

        console.log(data);

      if (response.ok) {

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // IMPORTANT
    localStorage.setItem("user", JSON.stringify({
        name: username
    }));

    alert("Login Successful!");

    window.location.href = "dashboard.html";
}
        } else {

            alert(data.error);

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to backend.");

    }

});