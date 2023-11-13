

export function GamesNew(props) {


  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateGame(params, () => event.target.reset());
  };


  return (
    <div>
      <h1>New Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input name="title" type="text" />
        </div>

        <div>
          Image: <input name="image" type="text" />
        </div>


        <div>
          Console:
          <select name="console_id">
            {props.consoles.map(console => (
              <option value={console.id}>{console.name}</option>
            ))}

          </select>
        </div>
        <button type="submit">Create game</button>
      </form>
    </div>
  );
}