import axios from 'axios';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: API_KEY },
});

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
};

export const getTrendingMovies = async () => {
  try {
    const { data } = await tmdb.get('/trending/movie/week');
    return data.results || [];
  } catch (err) {
    console.error('TMDB trending movies error:', err);
    return [];
  }
};

export const getTrendingSeries = async () => {
  try {
    const { data } = await tmdb.get('/trending/tv/week');
    return data.results || [];
  } catch (err) {
    console.error('TMDB trending series error:', err);
    return [];
  }
};

export const searchMovie = async (title) => {
  try {
    const { data } = await tmdb.get('/search/movie', {
      params: { query: title },
    });
    return data.results?.[0] || null;
  } catch (err) {
    console.error('TMDB search movie error:', err);
    return null;
  }
};

export const searchSeries = async (title) => {
  try {
    const { data } = await tmdb.get('/search/tv', {
      params: { query: title },
    });
    return data.results?.[0] || null;
  } catch (err) {
    console.error('TMDB search series error:', err);
    return null;
  }
};

export default tmdb;
