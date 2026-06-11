import Calc from "./comps/calc.tsx";
import Note from "./comps/note.tsx";
import Poke from "./comps/poke.tsx";

function App() {
  return (
    <>
      <div className="box">
        <h1>Toolbox</h1>
      </div>
      <Calc />
      <Note />
      <Poke />
    </>
  );
}

export default App;
