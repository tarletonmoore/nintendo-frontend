import { Link } from "react-router-dom"
import { useState } from "react";

export function GamesIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");


  const filteredGames = props.games
    .filter(
      (game) =>
        game.title.toLowerCase().includes(searchFilter.toLowerCase())
    );

  return (
    <div>
      <div className="search">
        <h4> Search filter:</h4>
        <input
          type="text"
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
          list="title"
        />
      </div>
      <h1>Games</h1>
      <div className="row row-col-2">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="col-6">
              <div className="game card">
                <div className="card-body">
                  <img src={game.image} height="200px" />
                  <br></br>
                  <br></br>
                  <h2>{game.title}</h2>
                  <p className="boldp">Price: ${game.price}</p>
                  <p className="boldp">Console: {game.console.name}</p>
                  {game.stock > 0 ? (<p className="boldp" style={{ color: 'green' }}>In Stock</p>) : (
                    <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
                  )}
                  <Link to={`/games/${game.id}`}>
                    <button>Go To Show Page</button>
                  </Link>
                </div>
              </div>
            </div>
          ))) : (

          <p className="boldpcenter">No games match the selected criteria.</p>

        )}

      </div>
    </div >
  )
}