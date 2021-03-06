document.getElementById("button-comment").onclick = function() {
  var title = document.getElementsByName("content")[0].value;
  var content = document.getElementsByName("content")[1].value;
  var postId = document.getElementsByName("content")[2].value;

  var comment = insertCommnent({
    title: title,
    content: content,
    postId: postId
  });

  comment.then(comment => printComment(comment.data));
};

function insertCommnent(commentData) {
  return axios
    .post(`/new-comment`, commentData)
    .then(comment => {
      return comment;
    })
    .catch(err => console.log(err));
}

function printComment(comment) {
  var divcomment = document.createElement("div");
  divcomment.innerHTML += `
        <div class="comment-container">
            <h2>${comment.author.username}</h2>
            <p>${comment.title}</p>
            <div>${comment.content}</div>
        </h2>`;
  document.querySelector(".comments-container").append(divcomment);
}
