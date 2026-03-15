import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecommendations } from '../api/openrouter';
import { searchMovie, searchSeries, getImageUrl } from '../api/tmdb';
import { searchGame } from '../api/rawg';
import RecommendationCard from './RecommendationCard';
import './QuizPage.css';

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function QuizPage({ title, questions, type, accentColor }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [textValue, setTextValue] = useState('');
  const textInputRef = useRef(null);

  const handleSelect = useCallback(async (option) => {
    const q = questions[step];
    const newAnswers = { ...answers, [q.label]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      // Final answer — fetch recommendations
      setLoading(true);
      setError(null);
      try {
        const recs = await getRecommendations(type, newAnswers);

        // Fetch posters
        const withPosters = await Promise.all(
          recs.map(async (rec) => {
            let posterUrl = null;
            try {
              if (type === 'game') {
                const game = await searchGame(rec.title);
                posterUrl = game?.background_image || null;
              } else if (type === 'movie') {
                const movie = await searchMovie(rec.title);
                posterUrl = movie ? getImageUrl(movie.poster_path) : null;
              } else {
                const series = await searchSeries(rec.title);
                posterUrl = series ? getImageUrl(series.poster_path) : null;
              }
            } catch {
              /* poster fetch failed, that's fine */
            }
            return { ...rec, posterUrl };
          })
        );
        setResults(withPosters);
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  }, [step, answers, questions, type]);

  const handleTextSubmit = useCallback(() => {
    if (!textValue.trim()) return;
    handleSelect(textValue.trim());
    setTextValue('');
  }, [textValue, handleSelect]);

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
    setError(null);
    setTextValue('');
    setDirection(-1);
  };

  const progress = ((step + 1) / questions.length) * 100;

  // Loading state
  if (loading) {
    return (
      <div className="quiz-page page">
        <div className="container">
          <div className="quiz-loading">
            <div className="quiz-loading-dots">
              <div className="quiz-loading-dot" style={{ background: accentColor }} />
              <div className="quiz-loading-dot" style={{ background: accentColor }} />
              <div className="quiz-loading-dot" style={{ background: accentColor }} />
            </div>
            <p className="quiz-loading-text">
              Finding your perfect {type === 'series' ? 'series' : type}...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results state
  if (results) {
    return (
      <div className="quiz-page page">
        <div className="container">
          <div className="quiz-results">
            <motion.h2
              className="quiz-results-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              YOUR TOP PICKS
            </motion.h2>
            <div className="rec-cards">
              {results.map((item, i) => (
                <RecommendationCard
                  key={item.title}
                  item={item}
                  index={i}
                  accentColor={accentColor}
                />
              ))}
            </div>
            <button
              className="quiz-retry"
              style={{ background: accentColor }}
              onClick={restart}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="quiz-page page">
        <div className="container">
          <div className="quiz-error">
            <p className="quiz-error-text">{error}</p>
            <button
              className="quiz-retry"
              style={{ background: accentColor }}
              onClick={restart}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz flow
  const currentQ = questions[step];

  return (
    <div className="quiz-page page">
      <div className="container">
        <h1 className="quiz-heading">{title}</h1>

        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <motion.div
              className="quiz-progress-fill"
              style={{ background: accentColor }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="quiz-progress-text">
            {step + 1} / {questions.length}
          </span>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            className="quiz-question"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className="quiz-question-title">{currentQ.question}</h2>

            {currentQ.inputType === 'text' ? (
              <div className="quiz-text-input-wrap">
                <input
                  ref={textInputRef}
                  type="text"
                  className="quiz-text-input"
                  placeholder={currentQ.placeholder || 'Type your answer...'}
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                  autoFocus
                  style={{ borderColor: textValue ? accentColor : 'var(--border)' }}
                />
                <div className="quiz-text-actions">
                  <motion.button
                    className="quiz-text-submit"
                    style={{ background: accentColor }}
                    onClick={handleTextSubmit}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!textValue.trim()}
                  >
                    Continue →
                  </motion.button>
                  <button
                    className="quiz-text-skip"
                    onClick={() => handleSelect('No preference')}
                  >
                    Skip
                  </button>
                </div>
              </div>
            ) : (
              <div className="quiz-options">
                {currentQ.options.map((opt) => (
                  <motion.button
                    key={opt}
                    className="quiz-option"
                    onClick={() => handleSelect(opt)}
                    whileHover={{
                      borderColor: accentColor,
                      boxShadow: `0 0 20px ${accentColor}22`,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
