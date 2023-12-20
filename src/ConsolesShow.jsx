import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function ConsolesShow(props) {
  const [console, setConsole] = useState([])
  const [consoleGames, setConsoleGames] = useState([])
  const [showGames, setShowGames] = useState(false);


  const params = useParams()
  const getConsoleData = () => {

    axios.get(`http://localhost:3000/consoles/${params.id}.json`).then((response) => {
      setConsole(response.data);
    });
  };

  const handleConsoleGames = () => {

    setConsoleGames(console.games)
    setShowGames(prevState => !prevState)
  }

  useEffect(getConsoleData, [])

  return (
    <div className="consoleshow card">
      <div className="card-body">
        <h1>Console Info</h1>
        <h2>{console.name}</h2>
        <img src={console.image} width="200px" height="300px" />
        <br></br>
        <br></br>
        <h3>Year Released: {console.year}</h3>
        <br></br>
        <h2>Games For The {console.name}</h2>
        <button onClick={handleConsoleGames}>{showGames ? 'Hide Games' : 'Show Games'}</button>
        <br></br>
        <br></br>
        {showGames && (
          consoleGames.map(game => (
            <div key={game.id}>
              <div className="card">
                <div className="card-body">
                  <img src={game.image} height="200px" />
                  <br></br>
                  <br></br>
                  <h3>{game.title}</h3>
                  <Link to={`/games/${game.id}`}>
                    <button>Go To Show Page</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}