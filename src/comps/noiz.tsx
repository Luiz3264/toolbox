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
let started = false;

let interval: number;

function Noiz() {
  const [run, setRun] = useState(false);
  const [btn, setBtn] = useState("start");

  function random(num: number): number {
    return Math.floor(Math.random() * num + 1);
  }

  function dostuff() {
    const cvs = document.getElementById("noizbox") as HTMLCanvasElement | null;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        if (random(2) == 1) {
          ctx.fillStyle = "black";
        } else {
          ctx.fillStyle = "white";
        }
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  useEffect(() => {
    if (run == true) {
      interval = setInterval(dostuff, 1);
    } else {
      clearInterval(interval);
    }
  }, [run]);

  return (
    <div className="box">
      <h2>Noise</h2>
      <canvas id="noizbox" width={128} height={128}></canvas>
      <br />
      <button
        onClick={() => {
          if (btn == "start") {
            setBtn("stop");
            setRun(true);
            if (!started) {
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
