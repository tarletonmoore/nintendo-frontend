import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function GamesShow() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  // const [reviews, setReviews] = useState([])

  const getGameData = () => {
    axios.get(`http://localhost:3000/games/${id}.json`).then((response) => {
      console.log(response.data)
      setGame(response.data);
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

  const getReviews = () => {
    axios.get("http://localhost:3000/reviews.json").then(response => {
      console.log(response.data)
      setReviews(response.data)
    })
  }


  useEffect(() => {
    getGameData();
  }, [id]);

  // useEffect(getReviews, [])

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
