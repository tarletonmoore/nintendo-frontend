import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function ConsolesShow(props) {
  const [console, setConsole] = useState([])
  const [consoleGames, setConsoleGames] = useState([])

  const params = useParams()
  const getConsoleData = () => {

    axios.get(`http://localhost:3000/consoles/${params.id}.json`).then((response) => {
      setConsole(response.data);
    });
  };

  const handleConsoleGames = () => {

    setConsoleGames(console.games)
  }

  useEffect(getConsoleData, [])

  return (
    <div>
      <h1>Console Info</h1>
      <h2>{console.name}</h2>
      <img src={console.image} width="200px" height="300px" />
      <h3>Year Released: {console.year}</h3>
      <br></br>
      <h2>Games For This {console.name}</h2>
      <button onClick={handleConsoleGames}>Show Games</button>
      {consoleGames.map(game => (
        <div key={game.id}>
          <div className="card">
            <div className="card-body">
              <img src={game.image} width="150px" height="200px" />
              <h3>{game.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}