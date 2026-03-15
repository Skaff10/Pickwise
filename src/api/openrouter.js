import axios from 'axios';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/**
 * Get AI-powered recommendations
 * @param {'game'|'movie'|'series'} type
 * @param {Object} answers - key/value pairs of user quiz answers
 * @returns {Promise<Array>} Array of 3 recommendation objects
 */
export const getRecommendations = async (type, answers) => {
  const answerLines = Object.entries(answers)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const typeLabel = type === 'series' ? 'TV series' : type;

  const formatByType = {
    game: '[{"title": "", "genre": "", "platform": "", "reason": "", "year": "", "type": "game"}]',
    movie: '[{"title": "", "genre": "", "year": "", "reason": "", "type": "movie"}]',
    series: '[{"title": "", "genre": "", "seasons": "", "reason": "", "year": "", "type": "series"}]',
  };

  const prompt = `You are an expert ${typeLabel} recommendation engine.

The user has answered 12+ detailed questions about their exact preferences. Analyze ALL answers together carefully and suggest exactly 3 titles that match as precisely as possible.

User preferences:
${answerLines}

Rules:
- Only suggest real existing titles
- Do not suggest only mainstream popular titles — include at least 1 hidden gem or underrated pick
- The more specific the match to their answers the better
- Return ONLY a valid JSON array, no explanation, no markdown, no backticks
- Format: ${formatByType[type]}
- The "reason" field must directly reference the user's specific answers explaining why this title matches them personally`;

  try {
    const { data } = await axios.post(
      OPENROUTER_URL,
      {
        model: 'google/gemini-2.0-flash-001',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Pickwise',
        },
      }
    );

    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) throw new Error('Empty AI response');

    // Clean potential markdown code fences
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const recommendations = JSON.parse(cleaned);

    if (!Array.isArray(recommendations)) throw new Error('Response is not an array');
    return recommendations;
  } catch (err) {
    console.error('OpenRouter error:', err);
    throw new Error('Failed to get recommendations. Please try again.');
  }
};
