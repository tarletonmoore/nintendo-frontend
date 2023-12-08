export function Profile(props) {

  return (
    <div>
      <h1>{props.currentUser.name}'s Profile</h1>
      <h2>Wishlist:</h2>
      {props.favorites.map(fav => (
        <div key={fav.id} className="card">
          <div className="card-body">
            <img src={fav.game.image} height="200px" />
            <h2>{fav.game.title}</h2>
            <p>Price: ${fav.game.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}