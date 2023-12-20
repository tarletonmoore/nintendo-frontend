

export function ConsolesNew(props) {


  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateConsole(params, () => event.target.reset());
  };


  return (
    <div>
      <h1>New Product</h1>
      <div className="console card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="formconsolename">
              Name: <input name="name" type="text" />
            </div>

            <div className="formconsoleimage">
              Image: <input name="image" type="text" />
            </div>
            <div>
              Year Released: <input name="year" type="text" />
            </div>



            <button type="submit" className="formbutton">Create console</button>
          </form>
        </div>
      </div>
    </div>
  );
}