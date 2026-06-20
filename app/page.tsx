"use client";
import { useState } from "react";
import star from "../public/star.svg";
import "./style.css";

import Calc from "./tools/calc.tsx";
import Eyes from "./tools/eyes.tsx";
import Icon from "./tools/icon.tsx";
import Noiz from "./tools/noiz.tsx";
import Note from "./tools/note.tsx";
import Pick from "./tools/pick.tsx";
import Poke from "./tools/poke.tsx";
import Rnum from "./tools/rnum.tsx";
import Strn from "./tools/strn.tsx";
import Time from "./tools/time.tsx";
import Tune from "./tools/tune.tsx";

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
