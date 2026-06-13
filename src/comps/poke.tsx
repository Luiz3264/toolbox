import { useState } from "react";

function Poke() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
  );

  function fetchdata(): number {
    const name: any = document.getElementById("name");
    if (!name) {
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
        setUrl(data.sprites.front_default);
        setText(
          "Name: " +
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
        alt="pokémon"
        width={128}
        className="border-black rounded-full bg-linear-to-b from-red-500 from-49% via-black via-50% to-white to-51%"
        src={url}
      />
      <br />
      <br />
      <textarea value={text} placeholder="info" rows={3} readOnly></textarea>
      <br />
      Search:
      <input id="name" size={8} type="text" placeholder="name" />
      <button onClick={fetchdata}>go</button>
      <br />
      Powered by:
      <a href="https://pokeapi.co/">PokéAPI</a>
    </div>
  );
}

export default Poke;
