import axios from "axios";
import { useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap';


const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/consoles";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <Card className="login card">
        <Card.Body>
          <h1 className="login">Login</h1>
          {errors.length > 0 && (
            <Alert variant="danger">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          <div className="d-flex justify-content-center align-items-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter your email" style={{ width: '300px' }} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter your password" style={{ width: '300px' }} />
              </Form.Group>

              <Button type="submit" variant="primary">
                Login
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}