import { Link } from "react-router-dom"
import { useState } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap"
import Button from "react-bootstrap/Button";

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

      <Row xs={1} md={2} className="g-4">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (

            < Col key={game.id} lg={6}>

              <Card
                className="game card mt-8 card-border"
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
                  <ListGroup.Item className="border-dark">Console: {game.console.name}</ListGroup.Item>
                  <ListGroup.Item className="border-dark">{game.stock > 0 ? (<p className="boldp" style={{ color: 'green' }}>In Stock</p>) : (
                    <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
                  )}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Link to={`/games/${game.id}`}>
                    <Button variant="primary" >Go To Show Page</Button>
                  </Link>
                </Card.Body>
              </Card>

            </Col>

          ))) : (

          <p className="boldpcenter">No games match the selected criteria. 😢</p>

        )
        }

      </Row >
    </div >

  )
}