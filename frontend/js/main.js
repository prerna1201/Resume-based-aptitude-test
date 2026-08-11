// =========================================
// Navbar Authentication
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const authSection = document.getElementById("authSection");

    if (!authSection) return;

    const token = localStorage.getItem("access");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {

        authSection.innerHTML = `
            <div class="dropdown">

                <button class="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown">

                    👤 ${user.full_name}

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

        document.getElementById("logoutBtn").addEventListener("click", (e) => {

            e.preventDefault();

            clearSession();

            window.location.href = "login.html";

        });

    }

});
