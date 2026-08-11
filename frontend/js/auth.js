const API_BASE_URL = "http://127.0.0.1:8000";

function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        return null;
    }
}

function clearSession() {
    ["access", "refresh", "user", "resume_id", "skills", "questions", "test_id", "resultSummary"].forEach(
        key => localStorage.removeItem(key)
    );
}

function decodeJwtPayload(token) {
    try {
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

async function getAuthenticatedUser() {
    const token = localStorage.getItem("access");
    if (!token) return null;

    try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 401) {
            clearSession();
            return null;
        }

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }
    } catch (error) {
        console.warn("Could not refresh the user profile.", error);
    }

    const cachedUser = getStoredUser();
    const tokenPayload = decodeJwtPayload(token);
    return cachedUser || (tokenPayload?.user_id ? { user_id: tokenPayload.user_id } : null);
}
