// ===============================
// CHILDSHILD WEBSITE JAVASCRIPT
// ===============================

// 1. MOBILE MENU TOGGLE
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
        navLinks.classList.toggle("show");
    }
}

// 2. AUTOMATIC FOOTER YEAR
document.addEventListener("DOMContentLoaded", function () {
    const yearEl = document.querySelector("#year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

// 3. LOGGED-IN STATUS HELPER (NAVBAR)
document.addEventListener("DOMContentLoaded", async function () {
    if (window.childShildSupabase && window.childShildSupabase.auth) {
        try {
            const { data: { user } } = await window.childShildSupabase.auth.getUser();
            if (user) {
                // If user is logged in, optionally update the Login nav link to show Logout
                const loginNavLinks = document.querySelectorAll('a[href="login.html"]');
                loginNavLinks.forEach((link) => {
                    link.textContent = "Logout";
                    link.href = "#";
                    link.addEventListener("click", async (e) => {
                        e.preventDefault();
                        await window.childShildSupabase.auth.signOut();
                        window.location.reload();
                    });
                });
            }
        } catch (e) {
            // Silently continue if Supabase is not yet configured
        }
    }
});