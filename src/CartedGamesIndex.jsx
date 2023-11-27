import { useState, useEffect } from "react"
import axios from "axios"

export function CartedGamesIndex() {
  const [cartedGames, setCartedGames] = useState([])

  const getCartedGames = () => {
    axios.get("http://localhost:3000/carted_games.json").then(response => {
      console.log(response.data)
      setCartedGames(response.data)
    })
  }

  const totalCost = cartedGames.reduce((total, cartedGame) => {
    const itemTotal = cartedGame.game.price * cartedGame.quantity;
    return total + itemTotal;
  }, 0);


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
      <h1>Shopping Cart</h1>
      {cartedGames.length > 0 ? (
        cartedGames.map(cartedGame => (
          <div key={cartedGame.id} className="card">
            <div className="card-body">
              <img src={cartedGame.game.image} width="150px" height="200px" />
              <h3>{cartedGame.game.title}</h3>
              <p>Quantity: {cartedGame.quantity}</p>
              <p>Cost: ${cartedGame.game.price * cartedGame.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Nothing in cart</p>
      )}
      {cartedGames.length > 0 && (
        <div>
          <h4>Subtotal: ${totalCost}</h4>
          <button onClick={buy}>Checkout</button>
        </div>
      )}
    </div>
  )
}