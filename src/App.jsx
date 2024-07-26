import { useState } from 'react';
import './App.css';
import QuizPage from './components/QuizPage';
import StartQuizPage from './components/StartQuizPage';

function App() {
  const [inQuiz, setInQuiz] = useState(false);

  return <>{inQuiz ? <QuizPage /> : <StartQuizPage setInQuiz={setInQuiz} />}</>;
}

export default App;
