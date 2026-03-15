import { motion } from 'framer-motion';
import './About.css';

const techStack = [
  { icon: '⚛️', name: 'React' },
  { icon: '⚡', name: 'Vite' },
  { icon: '🎞️', name: 'Framer Motion' },
  { icon: '🔗', name: 'Axios' },
  { icon: '🤖', name: 'OpenRouter AI' },
  { icon: '🎬', name: 'TMDB API' },
  { icon: '🎮', name: 'RAWG API' },
  { icon: '🧭', name: 'React Router' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="about-page page">
      <div className="about-content">
        <motion.h1
          className="about-title"
          {...fadeUp}
          transition={{ duration: 0.6 }}
        >
          ABOUT PICKWISE
        </motion.h1>

        <motion.p
          className="about-text"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Pickwise is an AI-powered entertainment recommendation engine.
          Take a short quiz, and our AI will analyze your mood, preferences,
          and available time to suggest the perfect game, movie, or series
          for you. No more endless scrolling — just smart, personalized picks.
        </motion.p>

        <motion.h2
          className="about-subtitle"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          TECH STACK
        </motion.h2>

        <div className="about-tech">
          {techStack.map((t, i) => (
            <motion.div
              key={t.name}
              className="about-tech-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
            >
              <div className="about-tech-icon">{t.icon}</div>
              <div className="about-tech-name">{t.name}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="about-credits"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>
            Built with ❤️ by <span className="name">Skaf</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
