import React from 'react';

export default function StartQuizPage({ setInQuiz }) {
  return (
    <div className='card'>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={() => setInQuiz(true)}>Start quiz</button>
    </div>
  );
}
