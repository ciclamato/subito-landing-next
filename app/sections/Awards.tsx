"use client";

import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { awards } from "../data";

const Trophy3D = dynamic(() => import("../components/Trophy3D"), {
  ssr: false,
  loading: () => (
    <div className="award-trophy-card">
      <img
        src="/images/premio.png"
        alt="Premio SOL 2024"
        style={{ height: 180, borderRadius: 12 }}
      />
    </div>
  ),
});

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
      <div className="award-trophy reveal" style={{ display: 'flex', justifyContent: 'center' }}>
        <Trophy3D />
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
              <span className="marquee-separator">&#9671;</span>
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
              <span className="marquee-separator">&#9671;</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
