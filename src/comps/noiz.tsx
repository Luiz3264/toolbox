import { useEffect, useState } from "react";

const audioContext = new AudioContext();
const bufferSize = audioContext.sampleRate * 2,
  noiseBuffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate,
  );
const output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}

const whiteNoise = audioContext.createBufferSource();
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;

const gainNode = audioContext.createGain();
whiteNoise.connect(gainNode);
gainNode.connect(audioContext.destination);
gainNode.gain.setValueAtTime(0, audioContext.currentTime);
let started = false;

function Noiz() {
  const [run, setRun] = useState(false);
  const [rand, setRand] = useState(0);
  const [btn, setBtn] = useState("start");

  function random(num: number): number {
    return Math.floor(Math.random() * num + 1);
  }
  useEffect(() => {
    if (run == true) {
      const cvs = document.getElementById(
        "noizbox",
      ) as HTMLCanvasElement | null;
      if (!cvs) return;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;
      setRand(rand + 1);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = "black";
      for (let y = 0; y < 128; y++) {
        for (let x = 0; x < 128; x++) {
          if (random(2) == 1) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }, [run, rand]);

  return (
    <div className="box">
      <h2>Noise</h2>
      <canvas
        style={{ backgroundColor: "white" }}
        id="noizbox"
        width={128}
        height={128}
      ></canvas>
      <br />
      <button
        onClick={() => {
          if (btn == "start") {
            setBtn("stop");
            setRun(true);
            if (started == false) {
              started = !started;
              whiteNoise.start();
            }
            gainNode.gain.setValueAtTime(1, audioContext.currentTime);
          } else {
            setBtn("start");
            setRun(false);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          }
        }}
      >
        {btn}
      </button>
    </div>
  );
}

export default Noiz;
