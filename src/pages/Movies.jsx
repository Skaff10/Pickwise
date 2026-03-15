import QuizPage from '../components/QuizPage';

const questions = [
  {
    label: 'Mood',
    question: "What's your mood right now?",
    options: ['Happy & light', 'Sad & emotional', 'Thrilled & on edge', 'Romantic', 'Mind-bending', 'Just want to laugh'],
  },
  {
    label: 'Duration',
    question: 'How long do you want to watch?',
    options: ['Under 90 min', '90–120 min', '2+ hours', "Doesn't matter"],
  },
  {
    label: 'Era',
    question: 'Recent or classic?',
    options: ['Last 2 years', '2015–2022', '2000–2015', '90s', 'Before 1990', "Doesn't matter"],
  },
  {
    label: 'Genre',
    question: 'Genre?',
    options: ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Fantasy', 'Crime', 'Animation'],
  },
  {
    label: 'Language',
    question: 'Language preference?',
    options: ['English', 'Hindi', 'Korean', 'Spanish', 'French', 'Japanese', 'Any'],
  },
  {
    label: 'Ending Preference',
    question: 'Ending preference?',
    options: ['Happy ending', 'Dark or tragic', 'Open ended', 'Surprise me'],
  },
  {
    label: 'Based On',
    question: 'Based on?',
    options: ['Original story', 'True events', 'Book adaptation', 'Comic & Superhero', "Doesn't matter"],
  },
  {
    label: 'Watching With',
    question: 'Watching alone or with someone?',
    options: ['Alone', 'With partner', 'With friends', 'With family'],
  },
  {
    label: 'Subtitles',
    question: 'Subtitles?',
    options: ['No subtitles', 'Fine with subtitles', 'Prefer dubbed'],
  },
  {
    label: 'Vibe',
    question: 'Vibe?',
    options: ['Fast paced & action packed', 'Slow burn & deep', 'Funny throughout', 'Visually stunning', 'Thought provoking'],
  },
  {
    label: 'Loved Recently',
    question: 'A movie you loved recently?',
    inputType: 'text',
    placeholder: 'Type a movie name...',
  },
  {
    label: 'Avoid',
    question: 'Anything to avoid?',
    options: ['No gore', 'No jumpscares', 'No sad endings', 'No slow movies', 'Nothing'],
  },
];

export default function Movies() {
  return (
    <QuizPage
      title="FIND YOUR NEXT MOVIE"
      questions={questions}
      type="movie"
      accentColor="var(--accent-movies)"
    />
  );
}
