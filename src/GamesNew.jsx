

export function GamesNew(props) {


  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateGame(params, () => event.target.reset());
  };


  return (
    <div>
      <h1>New Game</h1>
      <div className="console card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="formgamestitle">
              Title: <input name="title" type="text" />
            </div>

            <div className="formgamesimage">
              Image: <input name="image" type="text" />
            </div>

            <div className="formgamesprice">
              Price: <input name="price" type="number" />
            </div>
            <div className="formgamesstock">
              Stock: <input name="stock" type="number" />
            </div>

            <div className="formgamesconsole">
              Console: &nbsp;
              <select name="console_id">
                {props.consoles.map(console => (
                  <option value={console.id}>{console.name}</option>
                ))}

              </select>
            </div>
            <button type="submit" className="formgamesbutton">Create game</button>
          </form>
        </div>
      </div>
    </div>
  );
}