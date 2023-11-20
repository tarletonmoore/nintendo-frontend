import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function GamesShow() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

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


  useEffect(() => {
    getGameData();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.image} width="200px" height="250px" />
      <p>Price: {game.price}</p>
      <p>Console: {game.console.name}</p>
      <form onSubmit={handleAddToCart}>
        <div>
          quantity: <input name="quantity" type="number" />
        </div>
        <div>
          <input name="game_id" type="hidden" defaultValue={game.id} />
        </div>

        <button>Add to cart</button>
      </form>
    </div>
  );
}
