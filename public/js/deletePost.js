// delete post function
document.querySelector(".content").addEventListener("click", async (e) => {
  if (e.target.id === "delete-post") {
    e.preventDefault();

    const postElement = e.target.closest(".your-posts");
    const postId = postElement.querySelector("#post-title").dataset.postId;

    const response = await fetch(`./dashboard/${postId}`, {
      method: "DELETE",
      
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
});
