"use client";

import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
}

export default function TiltCard({ children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tilt = 14;
    setStyle({
      transform: `perspective(600px) rotateY(${x * tilt}deg) rotateX(${-y * tilt}deg) scale3d(1.04, 1.04, 1.04)`,
      transition: "none",
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(600px) rotateY(0) rotateX(0) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: "inline-block",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
