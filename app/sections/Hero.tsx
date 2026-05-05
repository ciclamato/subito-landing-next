"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { awards } from "../data";

const shortcuts = [
  { label: "Museografía\nTransmedia", href: "#areas", icon: "/images/shortcut-museografia.svg", stat: "30+", statLabel: "Años de experiencia" },
  { label: "Soluciones\nTurismo Inteligente", href: "#dti", icon: "/images/shortcut-dti.svg", stat: "200+", statLabel: "Proyectos" },
  { label: "Proyectos\nPortfolio", href: "#proyectos", icon: "/images/shortcut-proyectos.svg", stat: "9", statLabel: "Países" },
];

export default function Hero() {
  const [introDone, setIntroDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 2.2;
    }
    const fallback = setTimeout(() => setIntroDone(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <section className={`hero ${introDone ? "intro-done" : ""}`}>
      <video
        ref={videoRef}
        className={`hero-video ${introDone ? "hero-video--done" : ""}`}
        src="/subitored.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setIntroDone(true)}
      />
      <div className="hero-content-wrapper">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <motion.div
            className="logo-brand"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={introDone ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "2rem" }}
          >
            <img
              src="/images/simbolo-subito-negativo.png"
              alt="Súbito Red"
              className="logo-brand-icon"
            />
            <div className="logo-brand-text">
              <span className="logo-brand-left">SÚBITO</span>
              <span className="logo-brand-right">RED</span>
            </div>
          </motion.div>
          <p className="hero-claim">
            Reinventamos la forma<br />de contar historias
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="shortcut-circles"
          >
            {shortcuts.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                className="shortcut-circle"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={introDone ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.08, borderColor: "var(--purple)" }}
              >
                <img src={s.icon} alt="" className="shortcut-icon" />
                {s.label.split("\n").map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
                {i === 2 && (
                  <div className="click-hint-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                      <path d="M398-120q-27 0-51.5-11.5T305-164L46-483l26-25q19-19 45-22t47 12l116 81v-403q0-17 11.5-28.5T320-880q17 0 28.5 11.5T360-840v557l-111-78 118 146q6 7 14 11t17 4h282q33 0 56.5-23.5T760-280v-280q0-17 11.5-28.5T800-600q17 0 28.5 11.5T840-560v280q0 66-47 113t-113 47H398Zm122-240Zm-80-80v-240q0-17 11.5-28.5T480-720q17 0 28.5 11.5T520-680v240h-80Zm160 0v-200q0-17 11.5-28.5T640-680q17 0 28.5 11.5T680-640v200h-80Z"/>
                    </svg>
                  </div>
                )}
              </motion.a>
            ))}
          </motion.div>

          <p className="hero-tagline">
            Laboratorio de ideas que fusiona narrativa, diseño y tecnologia
            emergente para crear experiencias inmersivas en cultura y turismo.
          </p>

          <div className="hero-stats">
            {shortcuts.map((s, i) => (
              <div key={i} className="shortcut-item">
                <div className="shortcut-stat">
                  <div className="shortcut-stat-number">{s.stat}</div>
                  <div className="shortcut-stat-label">{s.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="awards-marquee">
        <div className="marquee-track">
          {awards.map((award, i) => (
            <span key={i}>
              <span className={`award-pill ${award.status}`}>
                <span className="award-pill-icon">
                  {award.status === "won" ? "\u2605" : "\u25C6"}
                </span>
                <span className="award-pill-text">
                  <span className="award-pill-name">{award.name}</span>
                  <span className="award-pill-detail">{award.detail}</span>
                </span>
                <span className="award-pill-badge">
                  {award.status === "won" ? "Ganador" : "Finalista"}
                </span>
              </span>
              <span className="marquee-separator">{'\u25C7'}</span>
            </span>
          ))}
          {awards.map((award, i) => (
            <span key={`dup-${i}`}>
              <span className={`award-pill ${award.status}`}>
                <span className="award-pill-icon">
                  {award.status === "won" ? "\u2605" : "\u25C6"}
                </span>
                <span className="award-pill-text">
                  <span className="award-pill-name">{award.name}</span>
                  <span className="award-pill-detail">{award.detail}</span>
                </span>
                <span className="award-pill-badge">
                  {award.status === "won" ? "Ganador" : "Finalista"}
                </span>
              </span>
              <span className="marquee-separator">{'\u25C7'}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
