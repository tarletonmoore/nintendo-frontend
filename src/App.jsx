import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({ favorites: [] })

  const getUserData = () => {
    axios.get("http://localhost:3000/me.json").then(response => {
      setCurrentUser(response.data)
    })
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
