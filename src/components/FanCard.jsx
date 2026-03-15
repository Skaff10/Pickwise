import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FanCard.css';

const colors = ['purple', 'green', 'orange', 'blue', 'grey'];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

const StarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Gentle mobile rotations: -6, -3, 0, 3, 6
const mobileRotations = [-6, -3, 0, 3, 6];

export default function FanCard({ item, index, total }) {
  const isMobile = useIsMobile();
  const centerIndex = Math.floor(total / 2);
  const offset = index - centerIndex;
  const isCenter = index === centerIndex;

  // Desktop: full fan spread | Mobile: stacked with subtle rotation
  const rotation = isMobile
    ? (mobileRotations[index] ?? 0)
    : offset * 6;
  const translateX = isMobile ? 0 : offset * 40;
  const translateY = isMobile ? 0 : isCenter ? -30 : Math.abs(offset) * 10;
  const scale = isMobile ? 1 : isCenter ? 1.05 : 1;
  const zIndex = total - Math.abs(offset);

  return (
    <motion.div
      className="fan-card"
      style={{ zIndex }}
      initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        y: translateY,
        rotate: rotation,
        x: translateX,
        scale,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        rotate: 0,
        scale: 1.08,
        zIndex: 20,
        y: isMobile ? -5 : -20,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="fan-card-inner">
        <div className={`fan-card-bg ${colors[index % colors.length]}`} />
        <div className="swirl-overlay" />

        {item.poster && (
          <div className="fan-card-poster">
            <img src={item.poster} alt={item.title} loading="lazy" />
          </div>
        )}

        {item.rating && (
          <div className="fan-card-rating">
            <StarIcon />
            {item.rating.toFixed(1)}
          </div>
        )}

        <div className="fan-card-content">
          <div className="fan-card-genre">{item.genre}</div>
          <h3 className="fan-card-title">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}
