import { motion } from 'framer-motion';
import './RecommendationCard.css';

export default function RecommendationCard({ item, index, accentColor }) {
  return (
    <motion.div
      className="rec-card"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ borderColor: 'var(--border)' }}
      whileHover={{ borderColor: accentColor, y: -4 }}
    >
      <div className="rec-card-poster">
        {item.posterUrl ? (
          <img src={item.posterUrl} alt={item.title} loading="lazy" />
        ) : (
          <div className="rec-card-poster-placeholder">
            {item.title?.charAt(0) || '?'}
          </div>
        )}
      </div>
      <div className="rec-card-body">
        <h3 className="rec-card-title">{item.title}</h3>
        <div className="rec-card-meta">
          {item.genre && <span className="rec-card-tag">{item.genre}</span>}
          {item.year && <span className="rec-card-tag">{item.year}</span>}
          {item.platform && <span className="rec-card-tag">{item.platform}</span>}
          {item.seasons && <span className="rec-card-tag">{item.seasons}</span>}
        </div>
        {item.reason && <p className="rec-card-reason">"{item.reason}"</p>}
      </div>
    </motion.div>
  );
}
