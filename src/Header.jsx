import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header(props) {

  let adminLinks;

  if (props.currentUser.admin) {
    adminLinks = (
      <>
        <li className="nav-item">
          <Link to="/games/new" className="nav-link" >Add Game</Link>

        </li>
        <li className="nav-item">
          <Link to="/consoles/new" className="nav-link" >Add Console</Link>

        </li>
      </>
    )
  }

  let authenticationLinks;

  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <>
        <li className="nav-item">
          <Link to="/signup" className="nav-link" >Signup</Link>

        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link" >Login</Link>

        </li>
      </>
    )
  } else {
    authenticationLinks = (
      <>
        <li className="nav-item">
          <LogoutLink />
        </li>
        <li className="nav-item">
          <Link to="/me" className="nav-link">Profile</Link>

        </li>
        <li className="nav-item">
          <Link to="/consoles" className="nav-link" >All Consoles</Link>

        </li>
        <li className="nav-item">
          <Link to="/games" className="nav-link" >All Games</Link>

        </li>
        <li className="nav-item">
          <Link to="/carted_games" className="nav-link" >Shopping Cart</Link>

        </li>

      </>
    )
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/consoles">Home</a>
              </li>
              {authenticationLinks}
              {adminLinks}
            </ul>

          </div>
        </div>
      </nav>
    </header>
  )
}