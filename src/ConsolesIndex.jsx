import { Link } from "react-router-dom"


export function ConsolesIndex(props) {


  return (
    <div>
      <h1>Consoles</h1>
      <div className="row row-col-2">
        {props.consoles.map(console => (
          <div key={console.id} className="col-6">
            <div className="console card">
              <div className="card-body">
                <img src={console.image} height="200px" />
                <br></br>
                <br></br>
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
    </div>
  )
}