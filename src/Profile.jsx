import axios from "axios";

export function Profile(props) {
  const handleDestroyFavorite = (id) => {
    axios.delete(`http://localhost:3000/favorites/${id}.json`).then((response) => {
      const updatedFavorites = props.currentUser.favorites.filter(
        (fav) => fav.id !== id
      );
      props.setCurrentUser({
        ...props.currentUser,
        favorites: updatedFavorites,
      });
    });
  };
  console.log(props.currentUser)


  return (
    <div>
      <h1>{props.currentUser.name}'s Profile</h1>
      <div>
        <h1>Your Wishlist:</h1>
        {props.currentUser.favorites.map(fav => (
          <div key={fav.id} className="card">
            <div className="card-body">
              <h2>{fav.game.title}</h2>
              <img src={fav.game.image} height="250px" />
              <br></br>
              <br></br>
              <p>Price: ${fav.game.price}</p>
              <button onClick={() => { handleDestroyFavorite(fav.id) }} className="removebutton">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}