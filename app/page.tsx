"use client";
import { useState } from "react";
import star from "../public/star.svg";
import "./style.css";

import Calc from "./_tools/calc.tsx";
import Eyes from "./_tools/eyes.tsx";
import Icon from "./_tools/icon.tsx";
import Noiz from "./_tools/noiz.tsx";
import Note from "./_tools/note.tsx";
import Pick from "./_tools/pick.tsx";
import Poke from "./_tools/poke.tsx";
import Rnum from "./_tools/rnum.tsx";
import Strn from "./_tools/strn.tsx";
import Time from "./_tools/time.tsx";
import Tune from "./_tools/tune.tsx";

const components = [
  { name: "Calculator", Component: Calc },
  { name: "Eyes", Component: Eyes },
  { name: "Icon Generator", Component: Icon },
  { name: "Noise", Component: Noiz },
  { name: "Notepad", Component: Note },
  { name: "Color Picker", Component: Pick },
  { name: "Pokédex", Component: Poke },
  { name: "Random Number", Component: Rnum },
  { name: "Random String", Component: Strn },
  { name: "Timer", Component: Time },
  { name: "Tune Maker", Component: Tune },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = components.filter((comp) =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="box">
        <img src={star.src} width={64} draggable="false" />

        <h1>Toolbox</h1>
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <a href="https://github.com/Luiz3264/toolbox">github</a>
      </div>

      {filtered.map((comp) => (
        <comp.Component key={comp.name} />
      ))}
    </>
  );
}

export default App;
