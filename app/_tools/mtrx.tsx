"useClient";
import { useEffect, useRef } from "react";

function Mtrx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const size = 128;
    const fsize = 16;
    const speed = 5;
    const columns = Math.floor(size / fsize);
    const drops = Array.from({ length: columns }, () => Math.random() * size);
    console.log(columns);
    const symbols = "0123456789abcdefghijklmnopqrstuvwxyz";
    context.font = `${fsize}px monospace`;

    function draw() {
      if (!context) return;
      context.fillStyle = "rgba(0, 0, 0, 0.1)";
      context.fillRect(0, 0, size, size);

      context.fillStyle = "white";

      for (let i = 0; i < drops.length; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const x = i * fsize;
        const y = drops[i];
        context.fillText(symbol, x, y);

        if (y > size + Math.random() * 100) {
          drops[i] = -fsize;
        } else {
          drops[i] += speed;
        }
      }

      window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
  }, []);

  return (
    <div className="box">
      <h2>Matrix</h2>
      <canvas ref={canvasRef} width={128} height={128} className="bg-black" />
    </div>
  );
}

export default Mtrx;
