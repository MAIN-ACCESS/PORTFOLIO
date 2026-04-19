import { useState } from "react";
import robotImg from "@assets/download_1776512930857.jpg";

export default function AxonSection() {
  const [showHello, setShowHello] = useState(false);

  const handleRobotClick = () => {
    if (showHello) return;
    setShowHello(true);
    setTimeout(() => setShowHello(false), 5000);
  };

  return (
    <section
      id="axon"
      className="flex flex-col items-center relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Title */}
      <div className="relative z-10 text-center pt-14 pb-6">
        <h2
          className="text-5xl sm:text-6xl lg:text-8xl font-black font-sans tracking-widest text-white"
          style={{
            transform: "perspective(700px) rotateX(10deg)",
            transformOrigin: "center bottom",
            textShadow: "0 4px 30px rgba(255,255,255,0.12), 0 1px 0 rgba(255,255,255,0.06)",
            display: "inline-block",
          }}
        >
          AXON
        </h2>
        <p className="text-[8px] sm:text-[10px] lg:text-sm tracking-[0.12em] sm:tracking-[0.2em] lg:tracking-[0.3em] uppercase mt-3 text-[#dbdbdb]">
          Intelligent Assistant, Built for DARK.
        </p>
      </div>

      {/* Robot image with HELLO glitch overlay */}
      <div
        className="relative cursor-pointer select-none robot-float w-full flex justify-center"
        onClick={handleRobotClick}
      >
        <div className="relative inline-block">
          <img
            src={robotImg}
            alt="AXON Robot"
            className="block w-full max-w-[520px] sm:max-w-[600px] lg:max-w-[700px]"
            style={{
              display: "block",
              filter: "brightness(1.08) contrast(1.05)",
            }}
            draggable={false}
          />

          {/* HELLO glitch — centered on the dark visor/face panel */}
          {showHello && (
            <div
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                top: "29%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40%",
                height: "16%",
              }}
            >
              <span className="hello-glitch font-black text-xl sm:text-2xl lg:text-3xl tracking-[0.2em] text-white">
                HELLO
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Click hint */}
      <p className="relative z-10 text-gray-700 text-xs tracking-[0.25em] uppercase pb-6 -mt-4">
        Click to interact
      </p>
    </section>
  );
}
