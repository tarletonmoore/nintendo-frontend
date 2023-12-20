import { Link } from "react-router-dom"


export function GamesIndex(props) {

  return (
    <div>
      <h1>Games</h1>
      <div className="row row-col-2">
        {props.games.map(game => (
          <div key={game.id} className="col-6">
            <div className="game card">
              <div className="card-body">
                <img src={game.image} height="200px" />
                <br></br>
                <br></br>
                <h2>{game.title}</h2>
                <p className="boldp">Price: ${game.price}</p>
                <p className="boldp">Console: {game.console.name}</p>
                <Link to={`/games/${game.id}`}>
                  <button>Go To Show Page</button>
                </Link>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div >
  )
}