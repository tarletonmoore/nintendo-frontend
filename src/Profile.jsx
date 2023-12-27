import axios from "axios";
import { useState } from "react";
import zeldaitem from "./assets/zeldaitem.mp3"

export function Profile(props) {
  const [zeldaElement] = useState(new Audio(zeldaitem))

  const zeldaAudio = () => {
    zeldaElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const handleDestroyFavorite = (id) => {
    axios.delete(`http://localhost:3000/favorites/${id}.json`).then((response) => {
      const updatedFavorites = props.currentUser.favorites.filter(
        (fav) => fav.id !== id
      );
      zeldaAudio()
      props.setCurrentUser({
        ...props.currentUser,
        favorites: updatedFavorites,
      });
    });
  };


  return (
    <div>
      <h1>{props.currentUser.name}'s Profile</h1>
      <div>
        <h1>Your Wishlist:</h1>
        <div className="row row-col-2">
          {props.currentUser.favorites.map(fav => (
            <div key={fav.id} className="col-6">
              <div className="profile card">
                <div className="card-body">
                  <h2>{fav.game.title}</h2>
                  <img src={fav.game.image} height="250px" />
                  <br></br>
                  <br></br>
                  <p>Price: ${fav.game.price}</p>
                  {fav.game.stock > 0 ? (<p className="boldp" style={{ color: 'green' }}>In Stock</p>) : (
                    <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
                  )}
                  <button onClick={() => { handleDestroyFavorite(fav.id) }} className="removebutton">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}