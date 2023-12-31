import { Link } from "react-router-dom"

import Carousel from 'react-bootstrap/Carousel';
import nes from "./assets/nes.webp"
import snes from "./assets/snes.jpeg"
import n64 from "./assets/n64.jpeg"
import gamecube from "./assets/gamecube.jpeg"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap"
import Button from "react-bootstrap/Button";


export function ConsolesIndex(props) {

  return (
    <div>
      <Carousel>
        <Carousel.Item interval={2000}>
          <img src={nes} height="500px" width="100%" />
          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>NES</h3>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img src={snes} height="500px" width="100%" />

          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>SNES</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img src={n64} height="500px" width="100%" />

          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>N64</h3>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img src={gamecube} height="500px" width="100%" />

          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>GameCube</h3>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel >
      < h1 > Consoles</h1 >
      <Row xs={1} md={2} className="g-4">
        {props.consoles.map(console => (

          < Col key={console.id} lg={6}>

            <Card
              className="console card mt-8 card-border"
              style={{ width: '90%', height: '100%' }}
            >
              <Card.Img variant="top" src={console.image}
                className="mx-auto mt-3"
                style={{ height: "400px", width: "500px" }}
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
                <Link to={`/consoles/${console.id}`}>
                  <Button className="showbutton">More Info</Button>
                </Link>
              </Card.Body>
            </Card>

          </Col>
        ))
        }

      </Row >
    </div >
  )
}