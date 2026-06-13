import Calc from "./comps/calc.tsx";
import Noiz from "./comps/noiz.tsx";
import Note from "./comps/note.tsx";
import Poke from "./comps/poke.tsx";
import Rnum from "./comps/rnum.tsx";
import Strn from "./comps/strn.tsx";
import Time from "./comps/time.tsx";
import Tune from "./comps/tune.tsx";

function App() {
  return (
    <>
      <div className="box">
        <h1>Toolbox</h1>
        <a href="https://github.com/Luiz3264/toolbox">Github</a>
      </div>

      <Calc />
      <Noiz />
      <Note />
      <Poke />
      <Rnum />
      <Strn />
      <Time />
      <Tune />
    </>
  );
}

export default App;
