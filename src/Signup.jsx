import axios from "axios";
import { useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap';


export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <Card className="signup card">
        <Card.Body>
          <h1 className="signup">Signup</h1>
          {errors.length > 0 && (
            <Alert variant="danger">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" style={{ width: "300px" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" style={{ width: "300px" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter your password" style={{ width: "300px" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control type="password" name="password_confirmation" placeholder="Confirm your password" style={{ width: "300px" }} />
            </Form.Group>

            <Button type="submit" variant="primary" className="signupbutton">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}