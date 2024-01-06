import Button from "react-bootstrap/Button"

export function GamesUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateGame(props.game.id, params, () => event.target.reset());
    window.location.reload()
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="updateform">
        <div className="updatetitle">
          Title: <input defaultValue={props.game.title} name="title" type="text" />
        </div>
        <div className="updateimage">
          Image: <input defaultValue={props.game.image} name="image" type="text" />
        </div>
        <div className="updateprice">
          Price: <input defaultValue={props.game.price} name="price" type="number" />
        </div>
        <div className="updatestock">
          Stock: <input defaultValue={props.game.stock} name="stock" type="number" />
        </div>
        <br></br>
        <Button type="submit" className="updatebutton" variant="light">Update Game</Button>
      </form>

    </div>
  )
}