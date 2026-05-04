"use client";

import { useEffect } from "react";
import Hero from "./sections/Hero";
import Awards from "./sections/Awards";
import About from "./sections/About";
import Areas from "./sections/Areas";
import DtiProducts from "./sections/DtiProducts";
import Projects from "./sections/Projects";
import PortfolioVideos from "./sections/PortfolioVideos";
import Footer from "./sections/Footer";

export default function Home() {
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
    <main>
      <Hero />
      <Awards />
      <About />
      <Areas />
      <DtiProducts />
      <Projects />
      <PortfolioVideos />
      <Footer />
    </main>
  );
}
