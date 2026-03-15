import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FanCard from '../components/FanCard';
import SectorCards from '../components/SectorCard';
import { getTrendingMovies, getImageUrl } from '../api/tmdb';
import { getTrendingGames } from '../api/rawg';
import './Home.css';

function shuffleAndPick(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Home() {
  const [fanItems, setFanItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movies, games] = await Promise.all([
          getTrendingMovies(),
          getTrendingGames(),
        ]);

        const movieCards = movies.slice(0, 10).map((m) => ({
          title: m.title,
          poster: getImageUrl(m.poster_path),
          rating: m.vote_average,
          genre: m.genre_ids?.length ? 'Movie' : 'Movie',
          type: 'movie',
        }));

        const gameCards = games.slice(0, 10).map((g) => ({
          title: g.name,
          poster: g.background_image,
          rating: g.rating,
          genre: 'Game',
          type: 'game',
        }));

        const combined = [...movieCards, ...gameCards];
        setFanItems(shuffleAndPick(combined, 5));
      } catch (err) {
        console.error('Failed to fetch fan items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page">
      {/* Hero */}
      <section className="home-hero">
        <motion.h1
          className="home-hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          WHAT ARE YOU<br />PLAYING TONIGHT?
        </motion.h1>
        <motion.p
          className="home-hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          AI-powered picks for games, movies & series
        </motion.p>
      </section>

      {/* Fan Card Showcase */}
      <section>
        <h2 className="home-section-title">TRENDING NOW</h2>
        <p className="home-section-sub">A mix of top games & movies</p>

        {loading ? (
          <div className="fan-loading">
            <span className="fan-loading-text">Loading picks...</span>
          </div>
        ) : (
          <div className="fan-showcase">
            {fanItems.map((item, i) => (
              <FanCard
                key={item.title + i}
                item={item}
                index={i}
                total={fanItems.length}
              />
            ))}
          </div>
        )}
      </section>

      <div className="home-divider" />

      {/* Sector CTAs */}
      <section>
        <h2 className="home-section-title">EXPLORE</h2>
        <p className="home-section-sub">Pick a category to get started</p>
        <SectorCards />
      </section>
    </div>
  );
}
