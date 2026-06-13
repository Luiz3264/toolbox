import { useState, useEffect } from "react";

const ctx = new AudioContext();
const osc = ctx.createOscillator();
const vol = ctx.createGain();
osc.connect(vol);
vol.connect(ctx.destination);
let started = false;
//osc.type = "sine";

const notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
const hz = [
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0,
  466.16, 493.88,
];

function Tune() {
  const [btn, setBtn] = useState("start");
  const [run, setRun] = useState(false);

  useEffect(() => {
    async function playtune() {
      if (run) {
        const text = document.getElementById(
          "tune",
        ) as HTMLTextAreaElement | null;
        const spd = document.getElementById("spd") as HTMLInputElement | null;
        let speed = parseInt(spd?.value || "0");
        var note = [...hz];
        const tune = text?.value;

        if (tune) {
          if (!started) {
            started = !started;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            osc.start();
          }
          vol.gain.setValueAtTime(1, ctx.currentTime);

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
              osc.frequency.setValueAtTime(0, ctx.currentTime);
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
              osc.frequency.setValueAtTime(press, ctx.currentTime);
              await new Promise((resolve) => setTimeout(resolve, speed));
            }
          }
        }
        vol.gain.setValueAtTime(0, ctx.currentTime);
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
        id="tune"
        rows={3}
        cols={20}
        defaultValue="cdefgab+c"
      />
      <br />
      Speed:
      <input
        id="spd"
        min={0}
        defaultValue={100}
        type="number"
        style={{ width: 64 }}
      />
      <button
        onClick={() => {
          if (btn == "start") {
            setRun(true);
            setBtn("stop");
          } else {
            setRun(false);
            vol.gain.setValueAtTime(0, ctx.currentTime);
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
