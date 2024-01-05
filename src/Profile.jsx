import axios from "axios";
import { useState } from "react";
import zeldaitem from "./assets/zeldaitem.mp3"


import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap"
import Button from "react-bootstrap/Button";

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
        <Row xs={1} md={2} className="g-4">
          {props.currentUser.favorites.length > 0 ? (
            props.currentUser.favorites.map(fav => (

              < Col key={fav.id} lg={6}>

                <Card
                  className="profile card mt-8 card-border"
                  style={{ width: '90%', height: '100%' }}
                >
                  <Card.Img variant="top" src={fav.game.image}
                    className="mx-auto mt-3"
                    style={{ height: "400px", width: "500px" }}
                  />
                  <Card.Body>
                    <div className="text-center">
                      <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{fav.game.title}</Card.Title>
                    </div>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="border-dark">Price: ${fav.game.price}</ListGroup.Item>
                    <ListGroup.Item className="border-dark">{fav.game.stock > 0 ? (<p className="boldp" style={{ color: 'green' }}>In Stock</p>) : (
                      <p className="boldp" style={{ color: 'red' }}>Out of stock</p>
                    )}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button onClick={() => { handleDestroyFavorite(fav.id) }} className="removebutton">Remove</Button>
                  </Card.Body>
                </Card>

              </Col>

            ))) : (

            <p className="boldpcenter">Nothing In Wishlist 😢</p>

          )
          }

        </Row >

      </div>
    </div>
  )
}
// test contributions are working now on github