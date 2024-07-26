import AnswerSet from './AnswerSet';

export default function Question({ isSubmitted, questionData, questionNumber, setQuizData }) {
  function selectedAnswerStyles(answer) {
    const classes = ['radio-label'];

    if (questionData.selectedAnswer === answer) {
      classes.push('selected');
    }

    if (isSubmitted) {
      if (questionData.correctAnswer === answer) {
        classes.push('correct');
      } else if (questionData.selectedAnswer === answer) {
        classes.push('incorrect');
      }
    }

    return classes.join(' ');
  }

  function handleAnswerSelect(answer) {
    setQuizData((prev) =>
      prev.map((question) => {
        if (question.question === questionData.question) {
          return {
            ...question,
            selectedAnswer: answer,
            isCorrect: answer === question.correctAnswer,
          };
        } else {
          return question;
        }
      })
    );
  }

  return (
    <>
      <h2>
        {questionNumber}: {questionData.question}
      </h2>
      <div className='answers'>
        {questionData.answers.map((answer) => {
          const isSelected = answer === questionData.selectedAnswer;
          return (
            <AnswerSet
              isSubmitted={isSubmitted}
              isCorrect={questionData.isCorrect}
              answer={answer}
              handleAnswerSelect={handleAnswerSelect}
              selectedAnswerStyles={selectedAnswerStyles(answer)}
              isSelected={isSelected}
              questionData={questionData}
              key={answer}
            />
          );
        })}
      </div>
    </>
  );
}
