import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import mario from "./assets/mario.mp3"
import navi from "./assets/navi.mp3"
import { GamesUpdate } from "./GamesUpdate";
import { Modal } from "./Modal";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import { CardBody, ListGroupItem, Form, FormGroup, FormControl } from "react-bootstrap";


export function GamesShow(props) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false)
  const [audioElement] = useState(new Audio(navi))
  const [marioElement] = useState(new Audio(mario))
  const [isGameUpdateVisible, setIsGameUpdateVisible] = useState(false);

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

  const handleUpdateGame = (id, params) => {
    axios
      .patch(`http://localhost:3000/games/${id}.json`, params)
      .then((response) => {
        const updatedGameData = response.data;

        setGame(updatedGameData);

        setIsGameUpdateVisible(false);
      })
      .catch((error) => {
        console.error('Error updating game:', error);
      });
  };


  const handleAddToCart = async (event) => {
    event.preventDefault();
    const quantity = event.target.elements.quantity.value;
    const gameId = event.target.elements.game_id.value; // Assuming this input holds the game ID
    const errorMessage = document.getElementById('errorMessage');

    try {
      // Fetch the game information, including its stock quantity
      const gameResponse = await axios.get(`http://localhost:3000/games/${gameId}.json`);
      const game = gameResponse.data;

      if (quantity <= 0 || quantity > game.stock) {
        errorMessage.innerText = 'Invalid quantity or insufficient stock.';
      } else {
        errorMessage.innerText = ''; // Clear error message if no error
        const params = new FormData(event.target);

        console.log('Adding to cart');
        await axios.post("http://localhost:3000/carted_games.json", params);
        window.location.href = '/carted_games';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleAddToFavorites = (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    axios.post("http://localhost:3000/favorites.json", params).then(response => {
      window.location.href = '/me'
    })
  }

  const playAudio = () => {
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const marioAudio = () => {
    marioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

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
      playAudio()
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
        marioAudio()
        setGame((prevGame) => ({
          ...prevGame,
          reviews: prevGame.reviews.filter((r) => r.id !== review.id),
        }));
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };

  const handleShowGame = (game) => {
    setIsGameUpdateVisible(true);
    setGame(game);
  };

  const handleClose = () => {
    setIsGameUpdateVisible(false);
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
    <Card
      className="game card mt-8 card-border"
      style={{ width: '90%', height: '100%' }}
    >
      <Card.Img variant="top" src={game.image}
        className="mx-auto mt-3"
        style={{ height: "400px", width: "500px" }}
      />
      <Card.Body>
        <div className="text-center">
          <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{game.title}</Card.Title>
        </div>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="border-dark">Price: ${game.price}</ListGroup.Item>
        <ListGroup.Item className="border-dark">Console: {game.console.name}</ListGroup.Item>
        <ListGroup.Item className="border-dark">
          {game.stock > 0 ? (
            <Form onSubmit={handleAddToCart}>
              <FormGroup>
                <Form.Label>Quantity:</Form.Label>
                <FormControl name="quantity" type="number" defaultValue={1} />
              </FormGroup>
              <p className="boldp">Stock: {game.stock}</p>
              <FormGroup>
                <FormControl name="game_id" type="hidden" defaultValue={game.id} />
              </FormGroup>
              <div id="errorMessage" style={{ color: 'red' }}></div>
              <Button type="submit">Add to cart</Button>
            </Form>
          ) : (
            <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
          )}
        </ListGroup.Item>
        <ListGroupItem> {props.currentUser.admin ? (
          <Button onClick={() => handleShowGame(game)} >Update Game</Button>) : null}
          <Modal show={isGameUpdateVisible} onClose={handleClose}>
            <GamesUpdate game={game} onUpdateGame={handleUpdateGame} />
          </Modal></ListGroupItem>
        <ListGroupItem>
          {isFavorited ? (
            <p className="boldp">This game is already in your wishlist</p>
          ) : (
            <Form onSubmit={handleAddToFavorites}>
              <FormGroup>
                <FormControl name="game_id" type="hidden" defaultValue={game.id} />
              </FormGroup>

              <FormGroup>
                <FormControl name="user_id" type="hidden" defaultValue={props.currentUser.id} />
              </FormGroup>
              <br />
              <Button type="submit">Add to wishlist</Button>
            </Form>
          )}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
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
      </Card.Body>
      <CardBody>
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
      </CardBody>
    </Card>



    // <div className="gameshow card">
    //   <div className="card-body">
    //     <h1>{game.title}</h1>
    //     <img src={game.image} height="250px" />
    //     <div className="moveright">
    //       <p className="boldp">Price: ${game.price}</p>
    //       <p className="boldp">Console: {game.console.name}</p>
    //       {game.stock > 0 ? (
    //         <form onSubmit={handleAddToCart}>
    //           <div className="boldp">
    //             Quantity: <input name="quantity" type="number" defaultValue={1} />
    //           </div>
    //           <br />
    //           <p className="boldp">Stock: {game.stock}</p>
    //           <div>
    //             <input name="game_id" type="hidden" defaultValue={game.id} />
    //           </div>
    //           <div id="errorMessage" style={{ color: 'red' }}></div>
    //           <br />
    //           <button>Add to cart</button>
    //         </form>
    //       ) : (
    //         <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
    //       )}
    //       <br></br>
    //       {props.currentUser.admin ? (
    //         <button onClick={() => handleShowGame(game)} >Update Game</button>) : null}
    //       <Modal show={isGameUpdateVisible} onClose={handleClose}>
    //         <GamesUpdate game={game} onUpdateGame={handleUpdateGame} />
    //       </Modal>
    //       <br></br>
    //       <br></br>
    //       {isFavorited ? (
    //         <p className="boldp">This game is already in your wishlist</p>
    //       ) : (
    //         <form onSubmit={handleAddToFavorites}>
    //           <div>
    //             <input name="game_id" type="hidden" defaultValue={game.id} />
    //           </div>
    //           <div>
    //             <input name="user_id" type="hidden" defaultValue={props.currentUser.id} />
    //           </div>
    //           <br />
    //           <button>Add to wishlist</button>
    //         </form>
    //       )}
    //     </div>
    //     <br></br>
    //     <br></br>
    //     <h2>Reviews:</h2>
    //     <form onSubmit={handleAddReview}>
    //       <div>
    //         <input name="game_id" type="hidden" defaultValue={game.id} />
    //       </div>
    //       <div>
    //         <input name="user_id" type="hidden" defaultValue={props.currentUser.id} />
    //       </div>
    //       <div>
    //         <input name="review" type="text" defaultValue={game.review} />
    //       </div>
    //       <br />
    //       <button>Add review</button>
    //     </form>
    //     <br></br>
    //     {game.reviews.length > 0 ? (
    //       game.reviews.map(review => (
    //         <div key={review.id} className="review card">
    //           <div className="card-body">
    //             <p>{review.user.name}: {review.review}</p>
    //             {review.user.id === props.currentUser.id && (
    //               <>
    //                 <button onClick={() => handleClick(review)}>Delete Review</button>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       ))
    //     ) : (
    //       <p>No reviews yet</p>
    //     )}
    //   </div>
    // </div>
  );
}
