"use client";
import { useEffect, useRef } from "react";

function Icon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(generate, []);
  function generate() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (Math.random() > 0.5) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 8, 8);
      ctx.fillStyle = "white";
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 8, 8);
      ctx.fillStyle = "black";
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 4; x++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(x, y, 1, 1);
          ctx.fillRect(7 - x, y, 1, 1);
        }
      }
    }
  }
  return (
    <div className="box">
      <h2>Icon Generator</h2>
      <canvas
        ref={canvasRef}
        width={8}
        height={8}
        draggable="false"
        style={{
          width: "128px",
          height: "128px",
          imageRendering: "pixelated",
          margin: "auto",
        }}
      />
      <button onClick={generate}>generate</button>
    </div>
  );
}

export default Icon;
