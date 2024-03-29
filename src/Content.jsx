import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import { Signup } from "./Signup"
import { Login } from "./Login"
import { ConsolesIndex } from "./ConsolesIndex"
import { GamesIndex } from "./GamesIndex"
import { ConsolesShow } from "./ConsolesShow"
import { GamesNew } from "./GamesNew"
import { ConsolesNew } from "./ConsolesNew"
import { Profile } from "./Profile"
import { CartedGamesIndex } from "./CartedGamesIndex"
import { GamesShow } from "./GamesShow"
import { OrdersShow } from "./OrdersShow"

export function Content(props) {
  const [consoles, setConsoles] = useState([])
  const [games, setGames] = useState([])
  const [favorites, setFavorites] = useState([])
  const [errors, setErrors] = useState([])
  const [consoleErrors, setConsoleErrors] = useState([]);


  const getConsoleData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("http://localhost:3000/consoles.json").then(response => {
        setConsoles(response.data)
      })
    }
  }

  const getGamesData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("http://localhost:3000/games.json").then(response => {
        setGames(response.data)
      })
    }
  }

  const handleCreateConsole = (params, successCallback) => {
    axios.post("http://localhost:3000/consoles.json", params).then((response) => {
      setConsoles([...consoles, response.data]);
      successCallback();
    }).catch((error) => {
      console.log(error.response)
      setConsoleErrors(["Field(s) Can't Be Blank"])
    });
  };

  const handleCreateGame = (params, successCallback) => {
    axios.post("http://localhost:3000/games.json", params).then((response) => {
      setGames([...games, response.data]);
      successCallback();
    }).catch((error) => {
      console.log(error.response);
      setErrors(["Field(s) Can't Be Blank"]);
    });;
  };

  const getFavoritesData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("http://localhost:3000/favorites.json").then(response => {
        setFavorites(response.data)
      }
      )
    }
  }

  useEffect(getConsoleData, [])
  useEffect(getGamesData, [])
  useEffect(getFavoritesData, [])

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consoles" element={<ConsolesIndex consoles={consoles} />} />
        <Route path="/games" element={<GamesIndex games={games} />} />
        <Route path="/consoles/:id" element={<ConsolesShow />} />
        <Route path="/games/new" element={<GamesNew onCreateGame={handleCreateGame} consoles={consoles} errors={errors} />} />
        <Route path="/consoles/new" element={<ConsolesNew onCreateConsole={handleCreateConsole} consoleErrors={consoleErrors} />} />
        <Route path="/me" element={<Profile currentUser={props.currentUser} favorites={favorites} setCurrentUser={props.setCurrentUser} />} />
        <Route path="/carted_games" element={<CartedGamesIndex />} />
        <Route path="/games/:id" element={<GamesShow currentUser={props.currentUser} favorites={favorites} />} />
        <Route path="/orders/:orderId" element={<OrdersShow />} />
      </Routes>
    </div>
  )
}