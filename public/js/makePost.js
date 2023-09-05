const createdPost = document.getElementById("created-post");

createdPost.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title && content) {
    const response = await fetch("./dashboard", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
});

document.querySelector(".content").addEventListener("click", async (e) => {
  if (e.target.id === "save-button") {
    e.preventDefault();

    const postElement = e.target.closest(".your-posts");
    const postId = postElement.querySelector("#post-title").dataset.postId;
    const postTitle = postElement.querySelector("#post-title").textContent;
    const postContent = postElement.querySelector("#post-content").value.trim();

    if (postTitle && postContent) {
      const response = await fetch(`./dashboard/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ title: postTitle, content: postContent }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update post");
      }
    }
  }
});
