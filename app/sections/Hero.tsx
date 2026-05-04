"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { stats } from "../data";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.pause();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <div className="hero-content">
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            src="/videos/animacion-logo-2.mp4"
          />
        </motion.div>
        <p className="hero-tagline">
          Laboratorio de ideas que fusiona narrativa, diseño y tecnología
          emergente para crear experiencias inmersivas en cultura y turismo.
        </p>
        <div className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-cue"><span></span></div>
    </section>
  );
}
