
const commentForms = document.querySelectorAll(".add-comment-form");


commentForms.forEach((form) => {
  const addButton = form.querySelector("#add-comment"); 

  addButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("You clicked!");

    
    const commentInput = form.querySelector("#comment"); 
    const postInput = form.querySelector("#post-id"); 

    const comment_text = commentInput.value.trim();
    const post_id = postInput.value.trim();

    console.log("Post id:", post_id);
    console.log("Comment text:", comment_text);

    if (comment_text && post_id) {
      const response = await fetch("/", {
        method: "POST",
        body: JSON.stringify({ comment_text, post_id }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  });
});
