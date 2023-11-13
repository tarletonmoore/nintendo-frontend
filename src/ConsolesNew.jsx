

export function ConsolesNew(props) {


  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateConsole(params, () => event.target.reset());
  };


  return (
    <div>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>

        <div>
          Image: <input name="image" type="text" />
        </div>
        <div>
          Year Released: <input name="year" type="text" />
        </div>



        <button type="submit">Create console</button>
      </form>
    </div>
  );
}