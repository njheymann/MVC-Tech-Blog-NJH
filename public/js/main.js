// handle get request for login link

document.querySelector("#login").addEventListener("click", function () {
  document.location.replace("/login");
});

// handle get request for signup link
document.querySelector("#signup").addEventListener("click", function () {
  document.location.replace("/signup");
});

//handle get request for login submit button

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const password2 = document.getElementById("password2").value.trim();

    if (username && password && password2) {
      const response = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ username, password, password2 }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to sign up");
      }
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to log in");
      }
    }
  });
}
