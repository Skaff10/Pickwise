import axios from 'axios';

const RAWG_BASE = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const rawg = axios.create({
  baseURL: RAWG_BASE,
  params: { key: API_KEY },
});

export const getTrendingGames = async () => {
  try {
    const { data } = await rawg.get('/games', {
      params: {
        ordering: '-rating',
        page_size: 10,
      },
    });
    return data.results || [];
  } catch (err) {
    console.error('RAWG trending games error:', err);
    return [];
  }
};

export const searchGame = async (title) => {
  try {
    const { data } = await rawg.get('/games', {
      params: {
        search: title,
        page_size: 1,
      },
    });
    return data.results?.[0] || null;
  } catch (err) {
    console.error('RAWG search game error:', err);
    return null;
  }
};

export default rawg;
