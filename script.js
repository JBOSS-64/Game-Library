const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
body.classList.remove("dark-mode", "light-mode");
body.classList.add(savedTheme);
toggleBtn.textContent = savedTheme === "dark-mode" ? "🌙" : "☀️";
}

// Toggle theme on click
toggleBtn.addEventListener("click", () => {
const isDark = body.classList.contains("dark-mode");
body.classList.toggle("dark-mode");
body.classList.toggle("light-mode");
const newTheme = isDark ? "light-mode" : "dark-mode";
localStorage.setItem("theme", newTheme);
toggleBtn.textContent = isDark ? "☀️" : "🌙";
});