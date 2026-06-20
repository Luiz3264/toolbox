import { useRef, useState } from "react";

function Poke() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
  );
  const nameRef = useRef<HTMLInputElement>(null);

  function fetchdata() {
    const name = nameRef.current;
    if (!name) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.value}`)
      .then((response) => {
        if (!response.ok) setText(response.status + ": pokémon not found.");
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
  }

  return (
    <div className="box">
      <h2>Pokédex</h2>
      <img
        alt="pokémon"
        width={128}
        draggable="false"
        className="border border-black rounded-full bg-linear-to-b from-[#ff0000] from-49% via-black via-50% to-white to-51%"
        src={url}
      />
      <br />
      <br />
      <textarea value={text} placeholder="info" rows={3} readOnly></textarea>
      <br />
      Search:
      <input ref={nameRef} size={8} type="text" placeholder="name" />
      <button onClick={fetchdata}>go</button>
      <br />
      Powered by:
      <a href="https://pokeapi.co/">PokéAPI</a>
    </div>
  );
}

export default Poke;
