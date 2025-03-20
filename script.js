// Simulated user database (stored in localStorage)
let users = JSON.parse(localStorage.getItem("users")) || {};

// Show a specific page and hide others
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
}

// Handle registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    if (users[username]) {
        alert("Username already exists!");
        return;
    }

    users[username] = { password, balance: 0.0, walletAddress: "" };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please log in.");
    showPage("login");
});

// Handle login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users[username];
    if (!user || user.password !== password) {
        alert("Invalid username or password!");
        return;
    }

    localStorage.setItem("loggedInUser", username);
    showDashboardSection("dashboard");
    showPage("dashboard");
});

// Show dashboard sections
function showDashboardSection(sectionId) {
    document.querySelectorAll(".dashboard-section").forEach(section => section.classList.add("hidden"));
    document.getElementById(`${sectionId}-section`).classList.remove("hidden");
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showDashboardSection("dashboard");
        showPage("dashboard");
    } else {
        showPage("home");
    }
});