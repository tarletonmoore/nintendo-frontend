import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem } from "react-bootstrap"

export function OrdersShow() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({ carted_games: [] })

  const getOrderData = () => {
    axios.get(`http://localhost:3000/orders/${orderId}.json`).then(response => {
      setOrder(response.data)
    })
  }
  useEffect(getOrderData, [])


  return (
    <div>
      <h1>Thanks for Shopping!</h1>

      {order.carted_games.map(carted_game => (

        <Card key={carted_game.id}
          className="game card mt-8 card-border"
          style={{ width: '90%', height: '100%' }}
        >
          <Card.Img variant="top" src={carted_game.game.image}
            className="mx-auto mt-3"
            style={{ height: "400px", width: "500px" }}
          />
          <Card.Body>
            <div className="text-center">
              <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{carted_game.game.title}</Card.Title>
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Quantity: {carted_game.quantity}</ListGroupItem>

            <ListGroup.Item className="border-dark">Cost: ${carted_game.game.price * carted_game.quantity}</ListGroup.Item>


          </ListGroup>

        </Card>


      ))}
      <div className="order cost">
        <ListGroup className="list-group-flush" style={{ width: "600px" }} >
          <ListGroupItem className="boldp">Subtotal: ${order.subtotal}</ListGroupItem>
          <ListGroupItem className="boldp">Tax: ${order.tax}</ListGroupItem>
          <ListGroupItem className="boldp">Total: ${order.total}</ListGroupItem>
        </ListGroup>
      </div>
    </div>
  )
}