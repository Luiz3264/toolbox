import Calc from "./comps/calc.tsx";
import Note from "./comps/note.tsx";
import Poke from "./comps/poke.tsx";
import Noiz from "./comps/noiz.tsx";
import Rnum from "./comps/rnum.tsx";

function App() {
  return (
    <>
      <div className="box">
        <h1>Toolbox</h1>
        <a href="https://github.com/Luiz3264/toolbox">Github</a>
      </div>
      <Calc />
      <Note />
      <Poke />
      <Noiz />
      <Rnum />
    </>
  );
}

export default App;
