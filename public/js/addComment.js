const submitComment = async () => {
  const textarea = document.querySelector(".comment-textarea");
  const commentText = textarea.value.trim();
  const postId = document.querySelector(".comments-section").dataset.postId;

  if (commentText) {
    try {
      // Send a POST request to the server to create a new comment
      const response = await fetch(`/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment_text: commentText, post_id: postId }),
      });

      if (response.ok) {
        // Comment was successfully created on the server
        const commentData = await response.json();

        // Update the DOM to display the new comment
        const commentsList = document.querySelector(".comments-list");
        const newCommentElement = document.createElement("li");
        newCommentElement.textContent = `${commentText} - ${commentData.user.username}`;
        commentsList.appendChild(newCommentElement);

        // Clear the textarea
        textarea.value = "";
      } else {
        alert("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }
};

// Event listener for the comment submit button
document
  .querySelector(".comment-submit")
  .addEventListener("click", submitComment);
