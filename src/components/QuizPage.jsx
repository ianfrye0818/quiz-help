import { useEffect, useState } from 'react';
import Question from './Question';
import * as he from 'he';
import { randomizeAnswers } from '../utils';

export default function QuizPage() {
  const [quizData, setQuizData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  async function loadQuesitons() {
    try {
      const resp = await fetch('https://opentdb.com/api.php?amount=5&category=11');

      if (!resp.ok) throw new Error('Something went wrong');

      const data = await resp.json();
      const organizedData = organizeData(data.results);
      setQuizData(organizedData);
    } catch (error) {
      console.error(error);
    }
  }

  function organizeData(data) {
    return data.map((q) => {
      const { correct_answer, incorrect_answers, question } = q;
      return {
        question: he.decode(question),
        answers: randomizeAnswers([...incorrect_answers, correct_answer]),
        correctAnswer: he.decode(correct_answer),
        selectedAnswer: null,
        isCorrect: false,
      };
    });
  }

  function calcScore() {
    quizData.forEach((question) => {
      if (question.selectedAnswer === question.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    });
  }

  function submitQuiz() {
    if (quizData.some((question) => !question.selectedAnswer)) return;
    calcScore();
    setIsSubmitted(true);
  }

  useEffect(() => {
    loadQuesitons();
  }, []);

  function restartQuiz() {
    setScore(0);
    setIsSubmitted(false);
    loadQuesitons();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitQuiz();
      }}
    >
      {quizData.map((question, index) => (
        <Question
          key={question.question}
          questionNumber={index + 1}
          questionData={question}
          setQuizData={setQuizData}
          isSubmitted={isSubmitted}
        />
      ))}

      {isSubmitted ? (
        <div className='button-box'>
          <ResetQuizButton restartQuiz={restartQuiz} />
          {<h2 className='score'>{score} / 5</h2>}
        </div>
      ) : (
        <SubmitButton />
      )}
    </form>
  );
}

function SubmitButton() {
  return <button className='submit'>Check answers</button>;
}

function ResetQuizButton({ restartQuiz }) {
  return (
    <button
      className='button'
      onClick={restartQuiz}
    >
      Restart
    </button>
  );
}
