import { videos } from "../data";

export default function PortfolioVideos() {
  return (
    <section className="portfolio reveal">
      <div className="section-label">Ver en acción</div>
      <h2
        className="section-title"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "0.5rem" }}
      >
        Portfolio en video
      </h2>

      <div className="video-links">
        {videos.map((video, i) => (
          <a
            key={i}
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card"
          >
            <div className="play-icon">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <polygon points="0,0 16,9 0,18" fill="white" />
              </svg>
            </div>
            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
