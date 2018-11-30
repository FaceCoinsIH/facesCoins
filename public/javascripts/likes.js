document.querySelectorAll(".like-icon").forEach(function(element) {
  element.onclick = function(event) {
    var coin = event.currentTarget.getAttribute("value");
    event.currentTarget.setAttribute("class", "fas fa-heart like-icon");
    insertFavCoin({ coin: coin });
  };
});

function insertFavCoin(favCoin) {
  return axios
    .post("/new-like", favCoin)
    .then(comment => {
      return comment;
    })
    .catch(err => console.log(err));
}
