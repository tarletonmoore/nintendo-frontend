import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import { Signup } from "./Signup"
import { Login } from "./Login"
import { ConsolesIndex } from "./ConsolesIndex"
import { GamesIndex } from "./GamesIndex"

export function Content() {
  const [consoles, setConsoles] = useState([])
  const [games, setGames] = useState([])

  const getConsoleData = () => {
    axios.get("http://localhost:3000/consoles.json").then(response => {
      console.log(response.data)
      setConsoles(response.data)
    })
  }

  const getGamesData = () => {
    axios.get("http://localhost:3000/games.json").then(response => {
      console.log(response.data)
      setGames(response.data)
    })
  }

  useEffect(getConsoleData, [])
  useEffect(getGamesData, [])

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consoles" element={<ConsolesIndex consoles={consoles} />} />
        <Route path="/games" element={<GamesIndex games={games} />} />

      </Routes>
    </div>
  )
}