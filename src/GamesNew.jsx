import { Form, Button, Card } from 'react-bootstrap';


export function GamesNew(props) {


  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateGame(params, () => event.target.reset());
  };


  return (
    <div>
      <h1>New Game</h1>
      <div className="d-flex justify-content-center align-items-center">
        <Card className="console" >
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" name="title" placeholder="Enter game title" style={{ width: '300px' }} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Image:</Form.Label>
                <Form.Control type="text" name="image" placeholder="Enter game image URL" style={{ width: '300px' }} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Price:</Form.Label>
                <Form.Control type="number" name="price" placeholder="Enter game price" style={{ width: '300px' }} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Stock:</Form.Label>
                <Form.Control type="number" name="stock" placeholder="Enter game stock" style={{ width: '300px' }} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Console:</Form.Label>
                <Form.Control as="select" name="console_id" style={{ width: '300px' }}>
                  {props.consoles.map(console => (
                    <option key={console.id} value={console.id}>{console.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="formgamesbutton">
                Create game
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}