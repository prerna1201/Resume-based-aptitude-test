// =========================================
// Navbar Authentication
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const authSection = document.getElementById("authSection");

    if (!authSection) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn === "true" && user) {

        authSection.innerHTML = `
            <div class="dropdown">

                <button class="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown">

                    👤 ${user.name}

                </button>

                <ul class="dropdown-menu">

                    <li>
                        <a class="dropdown-item" href="dashboard.html">
                            Dashboard
                        </a>
                    </li>

                    <li>
                        <a class="dropdown-item" href="profile.html">
                            Profile
                        </a>
                    </li>

                    <li>
                        <a class="dropdown-item" href="#" id="logoutBtn">
                            Logout
                        </a>
                    </li>

                </ul>

            </div>
        `;

        const logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.removeItem("isLoggedIn");

            window.location.href = "index.html";

        });

    }

});