"use client";
import { useRef, useEffect } from "react";

function Eyes() {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const pupil1Ref = useRef<HTMLDivElement>(null);
  const pupil2Ref = useRef<HTMLDivElement>(null);

  function updatePupil(
    eyeRef: React.RefObject<HTMLDivElement | null>,
    pupilRef: React.RefObject<HTMLDivElement | null>,
    clientX: number,
    clientY: number,
  ) {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    if (!eye || !pupil) return;

    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.min(Math.hypot(dx, dy), rect.width * 0.32);
    const angle = Math.atan2(dy, dx);
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    pupil.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
  }

  function handleMouseMove(e: MouseEvent | TouchEvent) {
    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

    updatePupil(eye1Ref, pupil1Ref, clientX, clientY);
    updatePupil(eye2Ref, pupil2Ref, clientX, clientY);
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove as EventListener);
    document.addEventListener("touchstart", handleMouseMove as EventListener);
    document.addEventListener("touchmove", handleMouseMove as EventListener);

    return () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove as EventListener,
      );
      document.removeEventListener(
        "touchstart",
        handleMouseMove as EventListener,
      );
      document.removeEventListener(
        "touchmove",
        handleMouseMove as EventListener,
      );
    };
  }, []);

  return (
    <div className="box">
      <h2>Eyes</h2>
      <div className="flex flex-row">
        <div
          ref={eye1Ref}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            background: "white",
            border: "1px solid black",
            borderRadius: "100%",
          }}
        >
          <div
            ref={pupil1Ref}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 16,
              height: 16,
              background: "black",
              borderRadius: "100%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div className="p-1"></div>
        <div
          ref={eye2Ref}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            background: "white",
            border: "1px solid black",
            borderRadius: "100%",
          }}
        >
          <div
            ref={pupil2Ref}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 16,
              height: 16,
              background: "black",
              borderRadius: "100%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Eyes;
