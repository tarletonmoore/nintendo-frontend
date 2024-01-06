import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import banjo from "./assets/banjo.mp3"

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";

export function ConsolesShow(props) {
  const [console, setConsole] = useState([])
  const [consoleGames, setConsoleGames] = useState([])
  const [showGames, setShowGames] = useState(false);
  const [banjoElement] = useState(new Audio(banjo))

  const params = useParams()
  const getConsoleData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {

      axios.get(`http://localhost:3000/consoles/${params.id}.json`).then((response) => {
        setConsole(response.data);
      })
    };
  };


  const banjoAudio = () => {
    banjoElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const handleConsoleGames = () => {
    banjoAudio()
    setConsoleGames(console.games)
    setShowGames(prevState => !prevState)
  }

  useEffect(getConsoleData, [])

  return (


    <Card
      className="console card mt-8 card-border"
    >
      <Card.Img variant="top" src={console.image}
        className="mx-auto mt-3"
        style={{ height: "400px", width: "auto" }}
      />
      <Card.Body>
        <div className="text-center">
          <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{console.name}</Card.Title>
        </div>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="border-dark">Year Released:   {console.year}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <h2>Games For The {console.name}</h2>
        <Button onClick={handleConsoleGames}>{showGames ? 'Hide Games' : 'Show Games'}</Button>
        {showGames && (
          consoleGames.map(game => (
            <Card
              className="console game card mt-8 card-border"
              style={{ width: '90%', height: '100%' }}
            >
              <Card.Img variant="top" src={game.image}
                className="mx-auto mt-3"
                style={{ height: "400px", width: "500px" }}
              />
              <Card.Body>
                <div className="text-center">
                  <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{game.title}</Card.Title>
                </div>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="border-dark">Price: ${game.price}</ListGroup.Item>

                <ListGroup.Item className="border-dark">{game.stock > 0 ? (<p className="boldp" style={{ color: 'green' }}>In Stock</p>) : (
                  <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
                )}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Link to={`/games/${game.id}`}>
                  <Button variant="primary" >More Info</Button>
                </Link>
              </Card.Body>
            </Card>
          ))
        )}
      </Card.Body>
    </Card>
  )
}