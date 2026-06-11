import { useState } from "react";
const buttons = [
  ["(", ")", "CE", "/"],
  ["9", "8", "7", "*"],
  ["6", "5", "4", "-"],
  ["3", "2", "1", "+"],
  ["C", "0", ".", "="],
];

function Calc() {
  const [text, setText] = useState("");

  return (
    <div className="box">
      <h2>Calculator</h2>
      <input readOnly size={16} type="text" value={text} />
      <br />
      <br />
      {buttons.map((row) => (
        <>
          {row.map((id) => (
            <button
              onClick={() => {
                if (id == "=") {
                  try {
                    setText(eval(text));
                  } catch {
                    setText("");
                  }
                } else if (id == "CE") {
                  setText(text.slice(0, -1));
                } else if (id == "C") {
                  setText("");
                } else {
                  setText(text + id);
                }
              }}
            >
              {id}
            </button>
          ))}
          <br />
        </>
      ))}
    </div>
  );
}

export default Calc;
