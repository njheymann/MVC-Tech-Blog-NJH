// handle get request for login link

console.log("hello");
//handle get request for login submit button

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("goodbye");
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
