import { Link } from "react-router-dom"


export function ConsolesIndex(props) {


  return (
    <div>
      <h1>Consoles</h1>
      {props.consoles.map(console => (
        <div key={console.id}>
          <div className="card">
            <div className="card-body">
              <img src={console.image} width="150px" height="200px" />
              <h2>{console.name}</h2>
              <p>Year of Release: {console.year}</p>
              <Link to={`/consoles/${console.id}`}>
                <button className="showbutton">Go to show page</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}