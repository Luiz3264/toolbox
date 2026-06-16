import { useRef, useState } from "react";

function Strn() {
  const [str, setStr] = useState("");
  const charRef = useRef<HTMLInputElement>(null);
  const sizRef = useRef<HTMLInputElement>(null);

  return (
    <div className="box">
      <h2>Random String</h2>
      <input readOnly placeholder="string here" value={str} />
      <br />
      Chars:
      <input ref={charRef} defaultValue="aeiou" size={10} />
      <br />
      Size:
      <input
        ref={sizRef}
        style={{ width: 64 }}
        min={1}
        defaultValue={10}
        type="number"
      />
      <button
        onClick={() => {
          const ipt = sizRef.current;
          const ipt2 = charRef.current;
          if (!ipt || !ipt2) return;
          let string = "";
          for (let i = 0; i < parseInt(ipt.value); i++) {
            string += ipt2.value.charAt(
              Math.floor(Math.random() * ipt2.value.length),
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
