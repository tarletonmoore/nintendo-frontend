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

  const handleDeleteGame = async (cartedGameId) => {
    try {
      await axios.delete(`http://localhost:3000/carted_games/${cartedGameId}.json`);
      // Refresh carted games after deletion
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

  const totalcost = subtotalCost + tax


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
          <div key={cartedGame.id} className="cart card">
            <div className="card-body">
              <img src={cartedGame.game.image} width="150px" height="200px" />
              <h3>{cartedGame.game.title}</h3>
              <p>Quantity: {cartedGame.quantity}</p>
              <p>Cost: ${cartedGame.game.price * cartedGame.quantity}</p>
              <button onClick={() => handleDeleteGame(cartedGame.id)}>Remove from Cart</button>
            </div>
          </div>
        ))
      ) : (
        <p className="emptycart">Nothing in cart</p>
      )}
      {cartedGames.length > 0 && (
        <div className="cartedcost">
          <h4>Subtotal: ${subtotalCost}</h4>
          <h4>Tax: ${tax}</h4>
          <h4>Total: ${totalcost}</h4>
          <button onClick={buy}>Checkout</button>
        </div>
      )}
    </div>
  )
}