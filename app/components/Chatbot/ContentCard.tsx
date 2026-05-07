import { motion } from "framer-motion";

type ContentCardProps = {
  item: any;
  type: string;
  onClick?: () => void;
};

export default function ContentCard({ item, type, onClick }: ContentCardProps) {
  const isClickable = !!onClick;
  const hoverProps = isClickable ? { whileHover: { scale: 1.02, borderColor: "var(--purple-light)" } } : {};
  const clickStyle = isClickable ? { cursor: 'pointer' } : {};

  if (type === 'area') {
    return (
      <motion.div className="bot-content-card" style={clickStyle} onClick={onClick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} {...hoverProps}>
        {item.image && <img src={item.image} alt={item.title} className="bcc-image" />}
        <div className="bcc-body">
          <h4 className="bcc-title">{item.title}</h4>
          <p className="bcc-desc">{item.description}</p>
          <div className="bcc-tags">
            {item.tags?.slice(0, 2).map((t: string) => <span key={t} className="bcc-tag">{t}</span>)}
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'dti') {
    return (
      <motion.div className="bot-content-card" style={clickStyle} onClick={onClick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} {...hoverProps}>
        <div className="bcc-body">
          <div className="bcc-header">
            <img src={item.icon} alt={item.name} className="bcc-icon" />
            <span className="bcc-badge">{item.badge}</span>
          </div>
          <h4 className="bcc-title">{item.name}</h4>
          <p className="bcc-desc">{item.desc}</p>
        </div>
      </motion.div>
    );
  }

  if (type === 'project') {
    return (
      <motion.div className="bot-content-card" style={clickStyle} onClick={onClick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} {...hoverProps}>
        {item.images?.[0] && <img src={item.images[0].src} alt={item.name} className="bcc-image" />}
        <div className="bcc-body">
          <div className="bcc-location">{item.location}</div>
          <h4 className="bcc-title">{item.name}</h4>
          <p className="bcc-desc">{item.type}</p>
        </div>
      </motion.div>
    );
  }

  if (type === 'video') {
    return (
      <motion.a href={item.href} target="_blank" rel="noopener noreferrer" className="bot-content-card link" onClick={onClick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bcc-body">
          <div className="bcc-header">
            <span className="play-icon-small">▶</span>
            <h4 className="bcc-title">{item.title}</h4>
          </div>
          <p className="bcc-desc">{item.desc}</p>
        </div>
      </motion.a>
    );
  }

  if (type === 'award') {
    return (
      <motion.div className="bot-content-card" style={clickStyle} onClick={onClick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} {...hoverProps}>
        <div className="bcc-body">
          <div className="bcc-header">
            <span className="bcc-award-icon">{item.status === 'won' ? '★' : '◆'}</span>
            <span className="bcc-badge">{item.status === 'won' ? 'Ganador' : 'Finalista'}</span>
          </div>
          <h4 className="bcc-title">{item.name}</h4>
          <p className="bcc-desc">{item.detail}</p>
        </div>
      </motion.div>
    );
  }

  return null;
}
