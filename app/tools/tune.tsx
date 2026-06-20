import { useRef, useState, useEffect } from "react";

const notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
const hz = [
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0,
  466.16, 493.88,
];

function Tune() {
  const [btn, setBtn] = useState("start");
  const [run, setRun] = useState(false);

  const tuneRef = useRef<HTMLTextAreaElement>(null);
  const spdRef = useRef<HTMLInputElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const volRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      oscRef.current = ctxRef.current.createOscillator();
      volRef.current = ctxRef.current.createGain();
      oscRef.current.connect(volRef.current);
      volRef.current.connect(ctxRef.current.destination);
    }
  }, []);

  useEffect(() => {
    async function playtune() {
      if (run && ctxRef.current && oscRef.current && volRef.current) {
        let speed = parseInt(spdRef.current?.value || "0");
        const tune = tuneRef.current?.value;
        var note = [...hz];

        if (tune) {
          if (!startedRef.current) {
            startedRef.current = true;
            oscRef.current.start(ctxRef.current.currentTime);
          }
          volRef.current.gain.setValueAtTime(1, ctxRef.current.currentTime);

          for (let i = 0; i < tune.length; i++) {
            let press: number;
            if (tune[i] == "+") {
              for (let v = 0; v < note.length; v++) {
                note[v] *= 2;
              }
            } else if (tune[i] == "-") {
              for (let v = 0; v < note.length; v++) {
                note[v] /= 2;
              }
            } else if (tune[i] == ">") {
              speed /= 2;
            } else if (tune[i] == "<") {
              speed *= 2;
            } else if (tune[i] == ".") {
              oscRef.current.frequency.setValueAtTime(
                0,
                ctxRef.current.currentTime,
              );
              await new Promise((resolve) => setTimeout(resolve, speed));
            } else if (tune[i] == ",") {
              await new Promise((resolve) => setTimeout(resolve, speed));
            } else {
              if (tune[i + 1] == "#") {
                press = note[notes.indexOf(tune[i] + tune[i + 1])];
                i++;
              } else {
                press = note[notes.indexOf(tune[i])];
              }
              oscRef.current.frequency.setValueAtTime(
                press,
                ctxRef.current.currentTime,
              );
              await new Promise((resolve) => setTimeout(resolve, speed));
            }
          }
        }
        volRef.current.gain.setValueAtTime(0, ctxRef.current.currentTime);
        setBtn("start");
        setRun(false);
      }
    }
    playtune();
  }, [run]);

  return (
    <div className="box">
      <h2>Tune Maker</h2>
      <textarea
        spellCheck="false"
        ref={tuneRef}
        rows={3}
        cols={20}
        defaultValue="cdefgab+c"
      />
      <br />
      Speed:
      <input
        ref={spdRef}
        min={0}
        defaultValue={100}
        type="number"
        style={{ width: 64 }}
      />
      <button
        onClick={() => {
          if (btn == "start" && ctxRef.current && volRef.current) {
            setRun(true);
            setBtn("stop");
          } else if (ctxRef.current && volRef.current) {
            setRun(false);
            volRef.current.gain.setValueAtTime(0, ctxRef.current.currentTime);
            setBtn("start");
          }
        }}
      >
        {btn}
      </button>
      <button
        onClick={() => {
          alert(
            "Notes: c,c#,d,d#,e,f,f#,g,g#,a,a#,b\nOctaves: +/-\nSpeed: </>\nSustain: ,\nPause: .",
          );
        }}
      >
        ?
      </button>
    </div>
  );
}

export default Tune;
