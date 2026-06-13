import { useState } from "react";

function Strn() {
  const [str, setStr] = useState("");
  return (
    <div className="box">
      <h2>String Generator</h2>
      <input readOnly placeholder="string here" value={str} />
      <br />
      Size:
      <input
        id="strsiz"
        style={{ width: 64 }}
        min={1}
        defaultValue={10}
        type="number"
      />
      <button
        onClick={() => {
          const input = document.getElementById("strsiz") as HTMLInputElement;

          let string = "";
          for (let i = 0; i < parseInt(input.value); i++) {
            string += String.fromCharCode(
              Math.floor(Math.random() * (126 - 32 + 1)) + 32,
            );
          }
          setStr(string);
        }}
      >
        go
      </button>
    </div>
  );
}

export default Strn;
