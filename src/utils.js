export function randomizeAnswers(answers) {
  return answers.sort(() => Math.random() - 0.5);
}
