import QuizPage from "../components/QuizPage";

const questions = [
  {
    label: "Mood",
    question: "What's your mood right now?",
    options: [
      "Chill & relaxed",
      "Intense & competitive",
      "Creative & explorative",
      "Social & fun",
    ],
  },
  {
    label: "Overall Investment",
    question: "How long do you want to invest in this game overall?",
    options: [
      "Just a couple of hours",
      "A full day",
      "More than a week",
      "A month or more",
      "As long as possible — no end",
    ],
  },
  {
    label: "Session Length",
    question: "How long is your play session today?",
    options: ["Under 1 hour", "1–3 hours", "3–6 hours", "All day"],
  },
  {
    label: "Budget/Production",
    question: "Budget/production preference?",
    options: [
      "AAA — big budget blockbuster",
      "AA — mid size polished",
      "Indie — small creative unique",
      "Doesn't matter",
    ],
  },
  {
    label: "Play Style",
    question: "Solo or multiplayer?",
    options: [
      "Solo only",
      "Mostly solo with optional co-op",
      "Online multiplayer",
      "Local co-op",
      "Competitive PvP",
    ],
  },
  {
    label: "Genre",
    question: "What genre excites you?",
    options: [
      "Action",
      "RPG",
      "Strategy",
      "Horror",
      "Puzzle",
      "Shooter",
      "Simulation",
      "Sports",
      "Fighting",
      "Platformer",
    ],
  },
  {
    label: "Story Preference",
    question: "Do you want a story or just gameplay?",
    options: [
      "Deep narrative & story",
      "Light story gameplay focused",
      "No story at all",
    ],
  },
  {
    label: "Platform",
    question: "What platform are you on?",
    options: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile", "Any"],
  },
  {
    label: "Difficulty",
    question: "How do you feel about difficulty?",
    options: [
      "Easy & relaxing",
      "Medium balanced",
      "Hard & punishing",
      "Brutal — souls-like level",
    ],
  },
  {
    label: "World Type",
    question: "World type preference?",
    options: [
      "Open world",
      "Linear levels",
      "Sandbox",
      "Roguelike",
      "Doesn't matter",
    ],
  },
  {
    label: "Deal Breakers",
    question: "Do you want something recent or a classic?",
    options: [
      "Last 5 years ",
      "2010s ",
      "Before 2000",
      "Doesn't matter",
    ],
  },
  {
    label: "Loved Recently",
    question: "A game you loved recently?",
    inputType: "text",
    placeholder: "Type a game name...",
  },
];

export default function Games() {
  return (
    <QuizPage
      title="FIND YOUR NEXT GAME"
      questions={questions}
      type="game"
      accentColor="var(--accent-games)"
    />
  );
}
