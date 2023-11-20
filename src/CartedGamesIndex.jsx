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

  useEffect(getCartedGames, [])
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartedGames.map(cartedGame => (
        <div key={cartedGame.id} className="card">
          <div className="card-body">
            <img src={cartedGame.game.image} width="150px" height="200px" />
            <h3>{cartedGame.game.title}</h3>
            <p>Quantity: {cartedGame.quantity}</p>
            <p>Cost: ${cartedGame.game.price * cartedGame.quantity}</p>
          </div>
        </div>
      ))}
      <h4>Subtotal: ${totalCost}</h4>
    </div>
  )
}