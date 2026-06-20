"use client";
import { useRef } from "react";
const buttons = [
  ["(", ")", "CE", "/"],
  ["9", "8", "7", "*"],
  ["6", "5", "4", "-"],
  ["3", "2", "1", "+"],
  ["C", "0", ".", "="],
];

function Calc() {
  const calcRef = useRef<HTMLInputElement>(null);

  return (
    <div className="box">
      <h2>Calculator</h2>
      <input size={12} type="text" ref={calcRef} />
      <br />
      <br />
      {buttons.map((row) => (
        <div key={row.join("")}>
          {row.map((id) => (
            <button
              key={id}
              onClick={() => {
                const text = calcRef.current;
                if (!text) return;
                if (text.value == "error") text.value = "";
                if (id == "=") {
                  if (text.value == "") text.value = "";
                  else {
                    try {
                      text.value = eval(text.value);
                    } catch {
                      text.value = "error";
                    }
                  }
                } else if (id == "CE") {
                  text.value = text.value.slice(0, -1);
                } else if (id == "C") {
                  text.value = "";
                } else {
                  text.value = text.value + id;
                }
              }}
            >
              {id}
            </button>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
}

export default Calc;
