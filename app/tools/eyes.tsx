"use client";
import { useRef, useEffect } from "react";

function Eyes() {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent | TouchEvent) {
    const rect1 = eye1Ref.current?.getBoundingClientRect();
    const rect2 = eye2Ref.current?.getBoundingClientRect();
    if (!rect1 || !rect2) return;
    const x1 = rect1.left + rect1.width / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const y2 = rect2.top + rect2.height / 2;
    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
    let newAng1 = (Math.atan2(clientY - y1, clientX - x1) * 180) / Math.PI + 90;
    let newAng2 = (Math.atan2(clientY - y2, clientX - x2) * 180) / Math.PI + 90;

    if (newAng1 < 0) newAng1 += 360;
    if (newAng2 < 0) newAng2 += 360;

    if (eye1Ref.current) eye1Ref.current.style.rotate = newAng1 + "deg";
    if (eye2Ref.current) eye2Ref.current.style.rotate = newAng2 + "deg";
  }

  useEffect(() => {
    document.onmousemove = handleMouseMove;
    document.addEventListener("touchstart", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);

    return () => {
      document.onmousemove = null;
      document.removeEventListener("touchstart", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <div className="box">
      <h2>Eyes</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          ref={eye1Ref}
          className="p-5 pt-1 bg-white border border-black rounded-full"
        >
          <div className="p-2 bg-black rounded-full"></div>
          <div className="p-2 bg-white rounded-full"></div>
        </div>
        <div className="p-1"></div>
        <div
          ref={eye2Ref}
          className="p-5 pt-1 bg-white border border-black rounded-full"
        >
          <div className="p-2 bg-black rounded-full"></div>
          <div className="p-2 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Eyes;
