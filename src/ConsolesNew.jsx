import { Form, Button, Card } from 'react-bootstrap';

export function ConsolesNew(props) {


  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateConsole(params, () => event.target.reset());
  };


  return (
    <div >
      <h1>New Console</h1>
      <div className="d-flex justify-content-center align-items-center">
        <Card className="console" style={{ width: '400px' }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter console name"
                  style={{ width: '300px' }}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Image:</Form.Label>
                <Form.Control type="text" name="image" placeholder="Enter console image URL" style={{ width: '300px' }} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Year Released:</Form.Label>
                <Form.Control type="text" name="year" placeholder="Enter year released" style={{ width: '300px' }} />
              </Form.Group>

              <Button variant="primary" type="submit" className="formbutton">
                Create console
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>

  );
}