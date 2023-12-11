import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function GamesShow(props) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false)

  const getGameData = () => {
    axios.get(`http://localhost:3000/games/${id}.json`).then((response) => {
      console.log(response.data)
      setGame(response.data);
      checkIfFavorited()
    });
  };

  const handleAddToCart = (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    console.log('adding to cart')
    axios.post("http://localhost:3000/carted_games.json", params).then(response => {
      console.log(response.data)
      window.location.href = '/carted_games'
    })
  }



  const handleAddToFavorites = (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    console.log('adding to cart')
    axios.post("http://localhost:3000/favorites.json", params).then(response => {
      console.log(response.data)
      window.location.href = '/me'
    })
  }

  const checkIfFavorited = () => {
    const found = props.currentUser.favorites.some(fav => fav.game.id === game.id);
    setIsFavorited(found);
  };

  useEffect(() => {
    getGameData();
  }, [id]);

  useEffect(() => {
    if (game) {
      checkIfFavorited();
    }
  }, [game]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1>{game.title}</h1>
        <img src={game.image} height="250px" />
        <p>Price: {game.price}</p>
        <p>Console: {game.console.name}</p>
        <form onSubmit={handleAddToCart}>
          <div>
            quantity: <input name="quantity" type="number" />
          </div>
          <div>
            <input name="game_id" type="hidden" defaultValue={game.id} />
          </div>
          <br></br>
          <button>Add to cart</button>
        </form>

        {isFavorited ? (
          <p>This game is already in your wishlist</p>
        ) : (
          <form onSubmit={handleAddToFavorites}>
            <div>
              <input name="game_id" type="hidden" defaultValue={game.id} />
            </div>
            <div>
              <input name="user_id" type="hidden" defaultValue={props.currentUser.id} />
            </div>
            <br />
            <button>Add to wishlist</button>
          </form>
        )}
        <br></br>
        <h2>Reviews:</h2>
        {game.reviews.length > 0 ? (
          game.reviews.map(review => (
            <div key={review.id} className="card">
              <div className="card-body">
                <p>{review.user.name}: {review.review}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
}
