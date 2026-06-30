"use client";
import { useEffect, useState } from "react";

function Clck() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = hours * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const secondDegrees = seconds * 6;

  return (
    <div className="box">
      <h2>Clock</h2>
      <div
        style={{
          position: "relative",
          width: 128,
          height: 128,
          border: "1px solid black",
          borderRadius: "100%",
          background: "white",
        }}
      >
        {Array.from({ length: 12 }, (_, index) => {
          const angle = index * 30 - 90;
          const radians = (angle * Math.PI) / 180;
          const x = Math.round(50 + Math.cos(radians) * 42);
          const y = Math.round(50 + Math.sin(radians) * 42);

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                fontWeight: "bold",
                color: "black",
                transform: "translate(-50%, -50%)",
              }}
            >
              {index === 0 ? 12 : index}
            </div>
          );
        })}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 2,
            height: 34,
            background: "black",
            transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 2,
            height: 46,
            background: "black",
            transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 1,
            height: 54,
            background: "black",
            transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 5,
            height: 5,
            borderRadius: "100%",
            background: "black",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}

export default Clck;
