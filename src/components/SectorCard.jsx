import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SectorCard.css';

const sectors = [
  {
    key: 'games',
    icon: '🎮',
    label: 'Games',
    desc: 'Find your next game',
    path: '/games',
  },
  {
    key: 'movies',
    icon: '🎬',
    label: 'Movies',
    desc: 'Discover what to watch',
    path: '/movies',
  },
  {
    key: 'series',
    icon: '📺',
    label: 'Series',
    desc: 'Binge something new',
    path: '/series',
  },
];

export default function SectorCards() {
  const navigate = useNavigate();

  return (
    <div className="sector-cards">
      {sectors.map((s, i) => (
        <motion.div
          key={s.key}
          className={`sector-card ${s.key}`}
          onClick={() => navigate(s.path)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          whileHover={{ y: -5 }}
        >
          <div className="sector-icon">{s.icon}</div>
          <h3 className="sector-label">{s.label}</h3>
          <p className="sector-desc">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
