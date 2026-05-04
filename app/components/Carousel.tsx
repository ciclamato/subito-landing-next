"use client";

import { useState } from "react";

interface CarouselProps {
  images: { src: string; alt: string }[];
}

export default function Carousel({ images }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent(((index % images.length) + images.length) % images.length);
  };

  if (!images.length) return <div className="pcard-placeholder">{'\u25C6'}</div>;

  return (
    <div className="pcard-carousel">
      <div
        className="pcard-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="pcard-slide">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
      <button
        className="pcard-btn prev"
        onClick={() => goTo(current - 1)}
        aria-label="Anterior"
      >
        {'\u2039'}
      </button>
      <button
        className="pcard-btn next"
        onClick={() => goTo(current + 1)}
        aria-label="Siguiente"
      >
        {'\u203A'}
      </button>
      <div className="pcard-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`pcard-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
