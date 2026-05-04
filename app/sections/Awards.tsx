"use client";

import { useEffect } from "react";
import { awards } from "../data";
import TiltCard from "../components/TiltCard";

export default function Awards() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="award-trophy reveal">
        <TiltCard>
          <img
            src="/images/premio.png"
            alt="Premio SOL 2024"
            className="award-trophy-img"
          />
        </TiltCard>
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
          {/* Duplicate set for seamless loop */}
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
    </>
  );
}
