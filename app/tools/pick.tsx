"use client";
import { useRef } from "react";

function Pick() {
  const colorRef = useRef<HTMLInputElement>(null);
  const hexRef = useRef<HTMLInputElement>(null);
  const redRef = useRef<HTMLInputElement>(null);
  const greenRef = useRef<HTMLInputElement>(null);
  const blueRef = useRef<HTMLInputElement>(null);

  function update(from: string) {
    const col = colorRef.current;
    const hex = hexRef.current;
    const red = redRef.current;
    const gre = greenRef.current;
    const blu = blueRef.current;

    if (!col || !hex || !red || !gre || !blu) return;

    if (from == "color") {
      hex.value = col.value;
      red.value = parseInt(col.value[1] + col.value[2], 16).toString();
      gre.value = parseInt(col.value[3] + col.value[4], 16).toString();
      blu.value = parseInt(col.value[5] + col.value[6], 16).toString();
    } else if (from == "hex") {
      col.value = hex.value;
      red.value = parseInt(hex.value[1] + hex.value[2], 16).toString() ?? "0";
      gre.value = parseInt(hex.value[3] + hex.value[4], 16).toString() ?? "0";
      blu.value = parseInt(hex.value[5] + hex.value[6], 16).toString() ?? "0";
    } else if (from == "num") {
      const r = parseInt(red.value, 10) || 0;
      const g = parseInt(gre.value, 10) || 0;
      const b = parseInt(blu.value, 10) || 0;
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      col.value = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      hex.value = col.value;
    } else if (from == "invert") {
      const r = 255 - parseInt(col.value[1] + col.value[2], 16);
      const g = 255 - parseInt(col.value[3] + col.value[4], 16);
      const b = 255 - parseInt(col.value[5] + col.value[6], 16);
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      col.value = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      update("color");
    }
  }
  return (
    <div className="box">
      <h2>Color Picker</h2>
      <input
        ref={colorRef}
        type="color"
        onChange={() => {
          update("color");
        }}
        defaultValue="#000000"
      />
      <input
        ref={hexRef}
        onChange={() => {
          update("hex");
        }}
        size={6}
        defaultValue="#000000"
      />
      <br />
      Red:
      <input
        ref={redRef}
        defaultValue={0}
        type="number"
        min={0}
        max={255}
        style={{ width: 64 }}
        onChange={() => {
          update("num");
        }}
      />
      <br />
      Green:
      <input
        ref={greenRef}
        defaultValue={0}
        type="number"
        min={0}
        max={255}
        style={{ width: 64 }}
        onChange={() => {
          update("num");
        }}
      />
      <br />
      Blue:
      <input
        ref={blueRef}
        defaultValue={0}
        type="number"
        min={0}
        max={255}
        style={{ width: 64 }}
        onChange={() => {
          update("num");
        }}
      />
      <br />
      <button
        onClick={() => {
          update("invert");
        }}
      >
        invert
      </button>
    </div>
  );
}

export default Pick;
