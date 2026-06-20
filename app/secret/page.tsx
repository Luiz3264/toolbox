import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "secret",
  description: "....",
};

import "../style.css";

function Secret() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="box">
        <h1 className="font-mono text-shadow-">secret</h1>
      </div>
    </div>
  );
}
export default Secret;
