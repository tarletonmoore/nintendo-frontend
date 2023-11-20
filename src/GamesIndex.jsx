import { Link } from "react-router-dom"


export function GamesIndex(props) {

  return (
    <div>
      <h1>Games</h1>
      {props.games.map(game => (
        <div key={game.id}>
          <div className="card">
            <div className="card-body">
              <img src={game.image} width="150px" height="200px" />
              <h2>{game.title}</h2>
              <p>Price: ${game.price}</p>
              <p>Console: {game.console.name}</p>
              <Link to={`/games/${game.id}`}>
                <button>Go To Show Page</button>
              </Link>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  )
}