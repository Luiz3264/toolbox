import { useState } from "react";

function Poke() {
  const [text, setText] = useState("...");
  function fetchdata(): number {
    const img: any = document.getElementById("img");
    const name: any = document.getElementById("name");
    if (!img || !name) {
      return 1;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.value}`)
      .then((response) => {
        if (!response.ok) {
          setText(response.status + ": pokémon not found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        img.src = data.sprites.front_default;
        setText(
          'Name: "' +
            data.name +
            "\nType: " +
            data.types.map((id: any) => id.type.name) +
            "\nAbilities: " +
            data.abilities.map((id: any) => id.ability.name),
        );
      });
    return 0;
  }

  return (
    <div className="box">
      <h2>Pokédex</h2>
      <img
        id="img"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
      />
      <br />
      <pre style={{ textAlign: "left" }}>{text}</pre>
      <input id="name" size={8} type="text" placeholder="name" />
      <button onClick={fetchdata}>Go</button>
      <br />
      Powered by:
      <a href="https://pokeapi.co/">PokéAPI</a>
    </div>
  );
}

export default Poke;
