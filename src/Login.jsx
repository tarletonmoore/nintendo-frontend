import axios from "axios";
import { useState } from "react";

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
      <div className="login card">
        <div className="card-body">
          <h1 className="login">Login</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <div className="login-container">
            <form onSubmit={handleSubmit} >
              <div>
                <p className="loginemail"> Email: <input name="email" type="email" /></p>
              </div>
              <div>
                <p> Password: <input name="password" type="password" /></p>
              </div>
              <button type="submit" style={{ "backgroundColor": "white" }}>Login</button>
            </form>



          </div>
        </div>
      </div>
    </div>
  );
}