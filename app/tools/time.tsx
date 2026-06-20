"use client";
import { useState, useEffect } from "react";

let interval: ReturnType<typeof setInterval>;

function Time() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [run, setRun] = useState(false);
  const [btn, setBtn] = useState("start");

  function reset() {
    setMin(0);
    setSec(0);
    setRun(false);
  }

  useEffect(() => {
    if (run) {
      setBtn("stop");
      interval = setInterval(() => setSec((prev) => prev - 1), 1000);
    }
    if (!run) {
      setBtn("start");
      clearInterval(interval);
    }
  }, [run]);

  useEffect(() => {
    if (run) {
      if (sec < 0) {
        if (min > 0) {
          setMin((prev) => prev - 1);
          setSec(59);
        } else {
          setRun(false);
          setSec(0);
        }
      }
    }
  }, [sec]);

  return (
    <div className="box">
      <h2>Timer</h2>
      <h1>
        {String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0")}
      </h1>
      <button
        onClick={() => {
          if (sec > 0) {
            setSec(sec - 1);
          }
        }}
      >
        -s
      </button>
      <button
        onClick={() => {
          setSec(sec + 1);
        }}
      >
        +s
      </button>
      <button
        onClick={() => {
          if (min > 0) {
            setMin(min - 1);
          }
        }}
      >
        -m
      </button>
      <button
        onClick={() => {
          setMin(min + 1);
        }}
      >
        +m
      </button>
      <br />
      <button
        onClick={() => {
          if (btn == "start") {
            setRun(true);
          } else {
            setRun(false);
          }
        }}
      >
        {btn}
      </button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default Time;
