import { useState } from "react";

function Rnum() {
  const [num, setNum] = useState(0);
  return (
    <div className="box">
      <h2>RNG</h2>
      <input readOnly value={num} style={{ width: 128 }} />
      <br />
      Max:
      <input
        id="rmax"
        type="number"
        placeholder="max"
        defaultValue="100"
        style={{ width: 64 }}
      />
      <br />
      Min:
      <input
        id="rmin"
        type="number"
        placeholder="min"
        defaultValue="0"
        style={{ width: 64 }}
      />
      <br />
      <br />
      <button
        onClick={() => {
          const rmin = parseInt(
            (document.getElementById("rmin") as HTMLInputElement | null)
              ?.value ?? "0",
            10,
          );
          const rmax = parseInt(
            (document.getElementById("rmax") as HTMLInputElement | null)
              ?.value ?? "100",
            10,
          );
          setNum(Math.floor(Math.random() * (rmax - rmin + 1)) + rmin);
        }}
      >
        go
      </button>
    </div>
  );
}

export default Rnum;
