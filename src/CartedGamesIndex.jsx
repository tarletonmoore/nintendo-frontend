import { useState, useEffect } from "react"
import axios from "axios"
import fatality from "./assets/fatality.mp3"

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CardBody, Col, ListGroupItem } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"

export function CartedGamesIndex() {
  const [cartedGames, setCartedGames] = useState([])
  const [mkElement] = useState(new Audio(fatality))
  const [showAlert, setShowAlert] = useState(false)
  const [savedCartedGames, setSavedCartedGames] = useState([]);


  const getCartedGames = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("http://localhost:3000/carted_games.json").then(response => {
        setCartedGames(response.data)
      })
    }
  }

  const getsavedCartedGames = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("http://localhost:3000/savedindex.json").then(response => {
        setSavedCartedGames(response.data)
      })
    }
  }

  const mkAudio = () => {
    mkElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const handleDeleteGame = async (cartedGameId) => {
    try {
      await axios.delete(`http://localhost:3000/carted_games/${cartedGameId}.json`);
      // Refresh carted games after deletion
      mkAudio()
      getCartedGames();
    } catch (error) {
      console.error('Error deleting game:', error);
      // Handle errors if deletion fails
    }
  }

  const handleDeleteSavedGame = async (savedCartedGameId) => {
    try {
      await axios.delete(`http://localhost:3000/destroysaved/${savedCartedGameId}.json`);
      // Refresh saved carted games after deletion
      getsavedCartedGames();  // <-- Correct function name
    } catch (error) {
      console.error('Error deleting game:', error);
      // Handle errors if deletion fails
    }
  };


  const subtotalCost = cartedGames.reduce((total, cartedGame) => {
    const itemTotal = cartedGame.game.price * cartedGame.quantity;
    return total + itemTotal;
  }, 0);

  const tax = subtotalCost * 0.09

  const totalCost = subtotalCost + tax


  const formattedSubtotal = subtotalCost.toFixed(2);
  const formattedTax = tax.toFixed(2);
  const formattedTotal = totalCost.toFixed(2);


  const buy = async () => {
    try {
      // Check if any carted game has a quantity greater than its stock
      const invalidCartedGames = cartedGames.filter(cartedGame => cartedGame.quantity > cartedGame.game.stock);

      if (invalidCartedGames.length > 0) {
        // Show the alert if there are invalid carted games
        setShowAlert(true);
        return;
      }

      // Proceed with the purchase
      const response = await axios.post("http://localhost:3000/orders.json");
      console.log('Response data:', response.data);

      const orderId = response.data.id;
      if (orderId) {
        // Redirect to the order show page with the obtained orderId
        window.location.href = `/orders/${orderId}`;
      } else {
        console.error('Order ID not received.');
        // Handle the case where the order ID is not received
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      // Handle errors if the purchase fails
    }
  };



  const handleSaveForLater = async (cartedGameId) => {
    try {
      // Make a PATCH request to update the carted game status
      await axios.patch(
        `http://localhost:3000/saveforlater/${cartedGameId}.json`,
        { carted_game: { status: "saved" } }
      );

      getCartedGames()
      getsavedCartedGames()
    } catch (error) {
      console.error('Error saving for later:', error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  const handleAddBackToCart = async (savedCartedGameId) => {
    try {
      // Make a PATCH request to update the saved carted game status
      const response = await axios.patch(
        `http://localhost:3000/add_back_to_cart/${savedCartedGameId}.json`);

      // Check the response status or data if needed
      console.log('Add to cart response:', response.data);

      // Fetch updated carted games from your backend
      const updatedCartedGamesResponse = await axios.get('http://localhost:3000/carted_games.json');

      // Update the state with the updated carted games
      setCartedGames(updatedCartedGamesResponse.data);

      // Fetch updated saved carted games from your backend
      const updatedSavedGamesResponse = await axios.get('http://localhost:3000/savedindex.json');

      // Update the state with the updated saved carted games
      setSavedCartedGames(updatedSavedGamesResponse.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  useEffect(getCartedGames, [])
  useEffect(getsavedCartedGames, [])
  return (
    <div>
      {cartedGames.length > 0 ? (
        cartedGames.map(cartedGame => (
          < Col key={cartedGame.id} lg={6}>

            <Card
              className="game card mt-8 card-border"
              style={{ width: '90%', height: '100%' }}
            >
              <Card.Img variant="top" src={cartedGame.game.image}
                className="mx-auto mt-3"
                style={{ height: "400px", width: "500px" }}
              />
              <Card.Body>
                <div className="text-center">
                  <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{cartedGame.title}</Card.Title>
                </div>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="border-dark">Quantity: {cartedGame.quantity}</ListGroupItem>

                <ListGroup.Item className="border-dark">Cost: ${cartedGame.game.price * cartedGame.quantity}</ListGroup.Item>
                <ListGroup.Item className="border-dark">{cartedGame.game.stock > 0 ? (<p className="boldp" style={{ color: 'green' }}>In Stock</p>) : (
                  <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
                )}</ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={() => handleSaveForLater(cartedGame.id)}>Save for later</Button>
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Button onClick={() => handleDeleteGame(cartedGame.id)}>Remove from Cart</Button>

              </Card.Body>
            </Card>

          </Col>

        ))) : (

        <p className="emptycart">Nothing in cart 😢</p>

      )
      }
      {cartedGames.length > 0 && (
        <div className="cartedcost">
          <ListGroup className="list-group-flush" style={{ width: "720px" }} >
            <ListGroupItem className="boldp">Subtotal: ${formattedSubtotal}</ListGroupItem>
            <ListGroupItem className="boldp">Tax: ${formattedTax}</ListGroupItem>
            <ListGroupItem className="boldp">Total: ${formattedTotal}</ListGroupItem>
            <ListGroupItem className="d-flex justify-content-center">
              <Button onClick={buy} style={{ width: "200px" }}>Checkout</Button>
            </ListGroupItem>
          </ListGroup>

        </div>
      )}

      <div>
        <br></br>
        <h2 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>Saved For Later</h2>
        {savedCartedGames && savedCartedGames.length > 0 ? (
          savedCartedGames.map((savedCartedGame) => (
            < Col key={savedCartedGame.id} lg={6}>

              <Card
                className="game card mt-8 card-border"
                style={{ width: '90%', height: '100%' }}
              >
                <Card.Img variant="top" src={savedCartedGame.game.image}
                  className="mx-auto mt-3"
                  style={{ height: "400px", width: "500px" }}
                />
                <Card.Body>
                  <div className="text-center">
                    <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{savedCartedGame.title}</Card.Title>
                  </div>
                </Card.Body>
                <ListGroup className="list-group-flush">


                  <ListGroup.Item className="border-dark">{savedCartedGame.game.stock > 0 ? (<p className="boldp" style={{ color: 'green' }}>In Stock</p>) : (
                    <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
                  )}</ListGroup.Item>
                  {savedCartedGame.game.stock > 0 && (
                    <ListGroup.Item>

                      <Button onClick={() => handleAddBackToCart(savedCartedGame.id)}>
                        Add Back To Cart
                      </Button>
                    </ListGroup.Item>

                  )}
                </ListGroup>
                <CardBody>
                  <Button onClick={() => handleDeleteSavedGame(savedCartedGame.id)}>Remove from Saved</Button>

                </CardBody>
              </Card>

            </Col>


          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "200%" }}>No Games Saved For Later</p>
        )}
      </div>



      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: 'white' }}>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#dc3545', color: 'white' }}>
          Some items in your cart have quantities exceeding stock. Please update your cart.
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#dc3545', color: 'white' }}>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}
