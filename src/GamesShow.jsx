import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function GamesShow(props) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false)

  const getGameData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get(`http://localhost:3000/games/${id}.json`).then((response) => {
        setGame(response.data);
        checkIfFavorited()
      })
    };
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    const quantity = event.target.elements.quantity.value;
    const errorMessage = document.getElementById('errorMessage');

    if (quantity <= 0) {
      errorMessage.innerText = 'Quantity should be greater than zero.';
    } else {
      errorMessage.innerText = ''; // Clear error message if no error
      const params = new FormData(event.target);

      console.log('Adding to cart');
      axios.post("http://localhost:3000/carted_games.json", params).then(response => {
        window.location.href = '/carted_games';
      });
    }
  };



  const handleAddToFavorites = (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    axios.post("http://localhost:3000/favorites.json", params).then(response => {
      window.location.href = '/me'
    })
  }

  const handleAddReview = (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    axios.post("http://localhost:3000/reviews.json", params).then((response) => {
      const newReview = {
        id: response.data.id,
        review: params.get("review"),
        user: {
          id: props.currentUser.id,
          name: props.currentUser.name,
        },
      };

      setGame((prevGame) => ({
        ...prevGame,
        reviews: [...prevGame.reviews, newReview],
      }));
      event.target.elements.review.value = "";
    })
  }

  const checkIfFavorited = () => {
    const found = props.currentUser.favorites.some(fav => fav.game.id === game.id);
    setIsFavorited(found);
  };

  const handleDestroyReview = (review) => {
    axios.delete(`http://localhost:3000/reviews/${review.id}.json`)
      .then((response) => {

        setGame((prevGame) => ({
          ...prevGame,
          reviews: prevGame.reviews.filter((r) => r.id !== review.id),
        }));
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };


  const handleClick = (review) => {
    handleDestroyReview(review);
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
    <div className="gameshow card">
      <div className="card-body">
        <h1>{game.title}</h1>
        <img src={game.image} height="250px" />
        <div className="moveright">
          <p className="boldp">Price: ${game.price}</p>
          <p className="boldp">Console: {game.console.name}</p>
          <form onSubmit={handleAddToCart}>
            <div className="boldp">
              quantity: <input name="quantity" type="number" defaultValue={1} />
            </div>
            <div>
              <input name="game_id" type="hidden" defaultValue={game.id} />
            </div>
            <div id="errorMessage" style={{ color: 'red' }}></div>
            <br />
            <button>Add to cart</button>
          </form>
          <br></br>
          {isFavorited ? (
            <p className="boldp">This game is already in your wishlist</p>
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
        </div>
        <br></br>
        <br></br>
        <h2>Reviews:</h2>
        <form onSubmit={handleAddReview}>
          <div>
            <input name="game_id" type="hidden" defaultValue={game.id} />
          </div>
          <div>
            <input name="user_id" type="hidden" defaultValue={props.currentUser.id} />
          </div>
          <div>
            <input name="review" type="text" defaultValue={game.review} />
          </div>
          <br />
          <button>Add review</button>
        </form>
        <br></br>
        {game.reviews.length > 0 ? (
          game.reviews.map(review => (
            <div key={review.id} className="review card">
              <div className="card-body">
                <p>{review.user.name}: {review.review}</p>
                {review.user.id === props.currentUser.id && (
                  <>
                    <button onClick={() => handleClick(review)}>Delete Review</button>
                  </>
                )}
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
