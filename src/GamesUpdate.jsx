import { Form, Button } from 'react-bootstrap';

export function GamesUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateGame(props.game.id, params, () => event.target.reset());
    window.location.reload()
  };


  return (
    <div>
      <Form onSubmit={handleSubmit} className="updateform">
        <Form.Group className='mb-3'>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" name="title" defaultValue={props.game.title} style={{ width: '300px' }} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Image:</Form.Label>
          <Form.Control type="text" name="image" defaultValue={props.game.image} style={{ width: '300px' }} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Price:</Form.Label>
          <Form.Control type="number" name="price" defaultValue={props.game.price} style={{ width: '300px' }} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Stock:</Form.Label>
          <Form.Control type="number" name="stock" defaultValue={props.game.stock} style={{ width: '300px' }} />
        </Form.Group>
        <br></br>
        <Button type="submit" className="updatebutton" variant="light">
          Update Game
        </Button>
      </Form>

    </div>
  )
}