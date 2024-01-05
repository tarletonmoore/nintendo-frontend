import { useState, useEffect } from "react"
import axios from "axios"
import fatality from "./assets/fatality.mp3"

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, ListGroupItem } from "react-bootstrap"
import Button from "react-bootstrap/Button";

export function CartedGamesIndex() {
  const [cartedGames, setCartedGames] = useState([])
  const [mkElement] = useState(new Audio(fatality))

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
      const response = await axios.post("http://localhost:3000/orders.json");
      console.log('Response data:', response.data); // Check the response data

      const orderId = response.data.id; // Assuming the ID is returned upon creation
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
  }

  useEffect(getCartedGames, [])
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
                <ListGroupItem>Quantity: {cartedGame.quantity}</ListGroupItem>

                <ListGroup.Item className="border-dark">Cost: ${cartedGame.game.price * cartedGame.quantity}</ListGroup.Item>


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
          <h4>Subtotal: ${formattedSubtotal}</h4>
          <h4>Tax: ${formattedTax}</h4>
          <h4>Total: ${formattedTotal}</h4>
          <Button onClick={buy}>Checkout</Button>
        </div>
      )}
    </div>

  )
}
