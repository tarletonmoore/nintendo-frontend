import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({ favorites: [] })

  const getUserData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("http://localhost:3000/me.json").then(response => {
        setCurrentUser(response.data)
      })
    }
  }

  useEffect(getUserData, [])
  return (
    <div>
      <BrowserRouter>
        <Header currentUser={currentUser} />
        <Content currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
