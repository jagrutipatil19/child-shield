(function () {
  const authClient = window.childShildSupabase;

  function showMessage(message, isError = false) {
    const output = document.getElementById("authMessage");

    if (output) {
      output.textContent = message;
      output.style.color = isError ? "red" : "green";
    }
  }

  // REGISTER
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const fullNameInput = document.getElementById("fullName");
      const emailInput = document.getElementById("registerEmail");
      const passwordInput = document.getElementById("registerPassword");
      const confirmPasswordInput = document.getElementById("confirmPassword");

      const fullName = fullNameInput ? fullNameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

      if (confirmPasswordInput && password !== confirmPassword) {
        showMessage("Passwords do not match!", true);
        return;
      }

      if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", true);
        return;
      }

      if (!authClient || !authClient.auth) {
        showMessage("Supabase client is not ready. Please configure Backend/supabase.js.", true);
        return;
      }

      showMessage("Creating account...");

      try {
        const { data, error } = await authClient.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: new URL(
              "login.html",
              window.location.href
            ).href
          }
        });

        if (error) {
          showMessage(error.message, true);
          return;
        }

        if (data.session) {
          showMessage("Account created successfully!");
          window.location.href = "index.html";
        } else {
          showMessage("Check your email to confirm your account.");
          registerForm.reset();
        }
      } catch (err) {
        showMessage("Registration error: " + err.message, true);
      }
    });
  }

  // LOGIN
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      if (!authClient || !authClient.auth) {
        showMessage("Supabase client is not ready. Please configure Backend/supabase.js.", true);
        return;
      }

      showMessage("Logging in...");

      try {
        const { data, error } = await authClient.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          showMessage("Login failed: " + error.message, true);
          return;
        }

        if (data.session) {
          window.location.href = "index.html";
        }
      } catch (err) {
        showMessage("Login error: " + err.message, true);
      }
    });
  }

  // LOGOUT
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      if (!authClient || !authClient.auth) {
        window.location.href = "login.html";
        return;
      }

      const { error } = await authClient.auth.signOut();

      if (error) {
        showMessage(error.message, true);
        return;
      }

      window.location.href = "login.html";
    });
  }
})();