import { useRef, useState } from "react";

function Rnum() {
  const [num, setNum] = useState(0);
  const rminRef = useRef<HTMLInputElement>(null);
  const rmaxRef = useRef<HTMLInputElement>(null);

  return (
    <div className="box">
      <h2>Random Number</h2>
      <input readOnly value={num} style={{ width: 128 }} />
      <br />
      Max:
      <input
        ref={rmaxRef}
        type="number"
        placeholder="max"
        defaultValue="100"
        style={{ width: 64 }}
      />
      <br />
      Min:
      <input
        ref={rminRef}
        type="number"
        placeholder="min"
        defaultValue="0"
        style={{ width: 64 }}
      />
      <br />
      <button
        onClick={() => {
          const rmin = parseInt(rminRef.current?.value ?? "0", 10);
          const rmax = parseInt(rmaxRef.current?.value ?? "100", 10);
          setNum(Math.floor(Math.random() * (rmax - rmin + 1)) + rmin);
        }}
      >
        go
      </button>
    </div>
  );
}

export default Rnum;
