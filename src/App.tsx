import { useState, useEffect } from "react";
import Calc from "./comps/calc.tsx";
import Eyes from "./comps/eyes.tsx";
import Noiz from "./comps/noiz.tsx";
import Note from "./comps/note.tsx";
import Pick from "./comps/pick.tsx";
import Poke from "./comps/poke.tsx";
import Rnum from "./comps/rnum.tsx";
import Strn from "./comps/strn.tsx";
import Time from "./comps/time.tsx";
import Tune from "./comps/tune.tsx";

const components = [
  { name: "Calculator", Component: Calc },
  { name: "Eyes", Component: Eyes },
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
  const [theme, setTheme] = useState<"light" | "dark" | "auto">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark" | "auto") || "auto";
  });

  useEffect(() => {
    const applyTheme = () => {
      let themeToApply: "light" | "dark" = "light";

      if (theme === "auto") {
        themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        localStorage.removeItem("theme");
      } else {
        themeToApply = theme;
      }

      document.documentElement.setAttribute("data-theme", themeToApply);
    };

    applyTheme();

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
    setTheme(newTheme);
  };

  const filtered = components.filter((comp) =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="box">
        <h1>Toolbox</h1>
        <input
          type="text"
          placeholder="search tool"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <button onClick={() => handleThemeChange("dark")}>dark</button>
        <button onClick={() => handleThemeChange("light")}>light</button>
        <button
          onClick={() => {
            handleThemeChange("auto");
          }}
        >
          auto
        </button>
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
