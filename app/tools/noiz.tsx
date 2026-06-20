import { useRef, useEffect, useState } from "react";

let interval: ReturnType<typeof setInterval>;

function Noiz() {
  const [run, setRun] = useState(false);
  const [btn, setBtn] = useState("start");
  const noizRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const whiteNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);

  function random(num: number): number {
    return Math.floor(Math.random() * num + 1);
  }

  useEffect(() => {
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const bufferSize = audioContext.sampleRate * 2;
    const noiseBuffer = audioContext.createBuffer(
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
    whiteNoiseRef.current = whiteNoise;

    const gainNode = audioContext.createGain();
    whiteNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNodeRef.current = gainNode;
  }, []);

  function dostuff() {
    const cvs = noizRef.current;
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
      <canvas ref={noizRef} width={128} height={128} draggable="false"></canvas>
      <button
        onClick={() => {
          if (
            !audioContextRef.current ||
            !whiteNoiseRef.current ||
            !gainNodeRef.current
          )
            return;

          if (btn == "start") {
            setBtn("stop");
            setRun(true);
            if (!startedRef.current) {
              startedRef.current = true;
              whiteNoiseRef.current.start(audioContextRef.current.currentTime);
            }
            gainNodeRef.current.gain.setValueAtTime(
              1,
              audioContextRef.current.currentTime,
            );
          } else {
            setBtn("start");
            setRun(false);
            gainNodeRef.current.gain.setValueAtTime(
              0,
              audioContextRef.current.currentTime,
            );
          }
        }}
      >
        {btn}
      </button>
    </div>
  );
}

export default Noiz;
