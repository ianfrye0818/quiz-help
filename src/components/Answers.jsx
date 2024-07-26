import * as he from 'he';

export default function AnswerSet({
  answer,
  handleAnswerSelect,
  questionData,
  selectedAnswerStyles,
  isSubmitted,
}) {
  return (
    <div>
      <label
        className={selectedAnswerStyles}
        htmlFor={questionData.question + answer}
      >
        {he.decode(answer)}
      </label>
      <input
        disabled={isSubmitted}
        className='radio-field'
        id={questionData.question + answer}
        type='radio'
        checked={answer === questionData.selectedAnswer}
        onChange={() => handleAnswerSelect(answer)}
        name={answer}
        value={answer}
      />
    </div>
  );
}
