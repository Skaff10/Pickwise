import QuizPage from '../components/QuizPage';

const questions = [
  {
    label: 'Mood',
    question: "What's your mood?",
    options: ['Hype & action', 'Emotional & deep', 'Suspenseful & dark', 'Funny & easy', 'Cozy & comfort'],
  },
  {
    label: 'Status',
    question: 'Finished or ongoing?',
    options: ['Completely finished', 'Currently airing', "Doesn't matter"],
  },
  {
    label: 'Commitment',
    question: 'How committed are you?',
    options: ['Just 1 season', '2–3 seasons', 'Want something long', "As long as it's good"],
  },
  {
    label: 'Episode Length',
    question: 'Episode length?',
    options: ['20–30 min', '40–60 min', "Doesn't matter"],
  },
  {
    label: 'Genre',
    question: 'Genre?',
    options: ['Thriller', 'Drama', 'Sci-Fi', 'Comedy', 'Fantasy', 'Crime', 'Romance', 'Horror', 'Superhero', 'Documentary', 'Anime'],
  },
  {
    label: 'Language',
    question: 'Language?',
    options: ['English', 'Hindi', 'Korean', 'Spanish', 'Turkish', 'Japanese', 'Any'],
  },
  {
    label: 'Era',
    question: 'Recent or classic?',
    options: ['Last 2 years', '2015–2022', '2000–2015', 'Before 2000', "Doesn't matter"],
  },
  {
    label: 'Subtitles',
    question: 'Subtitles?',
    options: ['No subtitles', 'Fine with subtitles', 'Prefer dubbed'],
  },
  {
    label: 'Watching With',
    question: 'Watching alone or with someone?',
    options: ['Alone', 'With partner', 'With friends', 'With family'],
  },
  {
    label: 'Pacing',
    question: 'Binge-worthy or slow burn?',
    options: ['Fast hooks bingeable', 'Slow burn that pays off', "Doesn't matter"],
  },
  {
    label: 'Story Depth',
    question: 'Story depth?',
    options: ['Deep & complex', 'Medium balanced', 'Light & easy to follow'],
  },
  {
    label: 'Loved Recently',
    question: 'A series you loved?',
    inputType: 'text',
    placeholder: 'Type a series name...',
  },
  {
    label: 'Avoid',
    question: 'Anything to avoid?',
    options: ['No cliffhangers', 'No cancelled shows', 'No gore', 'No sad endings', 'Nothing'],
  },
];

export default function Series() {
  return (
    <QuizPage
      title="FIND YOUR NEXT SERIES"
      questions={questions}
      type="series"
      accentColor="var(--accent-series)"
    />
  );
}
