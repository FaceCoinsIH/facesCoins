
document.querySelectorAll(".btn-delete").forEach(function(element) {
  element.onclick = function(event) {
   
    var coin = event.currentTarget.getAttribute("value");
    var fav_coin = deleteFavCoin({ coin: coin })

    fav_coin.then(coin => printDelete(coin.data));
  };
});

function deleteFavCoin(favCoin) {
   

  return axios
    .post("/delete-like", favCoin)
    .then(coin => {
      return coin;
    })
    .catch(err => console.log(err));
}


function printDelete(coin_data){
    var node = document.getElementById(coin_data);
    var parent = node.parentNode;
    parent.removeChild(node);
}

