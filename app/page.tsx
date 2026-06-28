"use client";
import { useEffect, useState } from "react";
import star from "../public/star.svg";
import "./style.css";

import Calc from "./_tools/calc.tsx";
import Clck from "./_tools/clck.tsx";
import Eyes from "./_tools/eyes.tsx";
import Icon from "./_tools/icon.tsx";
import Mtrx from "./_tools/mtrx.tsx";
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
  { name: "Clock", Component: Clck },
  { name: "Eyes", Component: Eyes },
  { name: "Icon Generator", Component: Icon },
  { name: "Matrix", Component: Mtrx },
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
  const [theme, setTheme] = useState<"dark" | "light" | "auto">("auto");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as
      | "dark"
      | "light"
      | "auto"
      | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark =
        theme === "dark" || (theme === "auto" && mediaQuery.matches);

      const palette = isDark
        ? {
            color: "#bfbfbf",
            border: "#2a2b2c",
            main: "#191a1b",
            sec: "#121314",
            hig: "#3994bc",
          }
        : {
            color: "#404040",
            border: "#d4d5d6",
            main: "#f5f5f5",
            sec: "#ffffff",
            hig: "#3994bc",
          };

      Object.entries(palette).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });

      root.style.colorScheme = isDark ? "dark" : "light";
    };

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [theme]);

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
        <div style={{ marginTop: 6 }}>
          Theme:
          <button type="button" onClick={() => setTheme("dark")}>
            dark
          </button>
          <button type="button" onClick={() => setTheme("light")}>
            light
          </button>
          <button type="button" onClick={() => setTheme("auto")}>
            auto
          </button>
        </div>
        <a href="https://github.com/Luiz3264/toolbox">github</a>
      </div>

      {filtered.map((comp) => (
        <comp.Component key={comp.name} />
      ))}
    </>
  );
}

export default App;
