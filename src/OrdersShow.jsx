import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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
        <div key={carted_game.id}>
          <div className="order card">
            <div className="card-body">
              <img src={carted_game.game.image} height="200px" />
              <h2>{carted_game.game.title}</h2>
              <p>Price of Game: ${carted_game.game.price}</p>
              <p>Quantity: {carted_game.quantity}</p>
              <p>Price: ${carted_game.game.price * carted_game.quantity}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="order cost">
        <h3>Subtotal: ${order.subtotal}</h3>
        <h3>Tax: ${order.tax}</h3>
        <h3>Total: ${order.total}</h3>
      </div>
    </div>
  )
}