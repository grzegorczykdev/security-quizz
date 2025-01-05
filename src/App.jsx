import Quiz from './Quiz.jsx'
import questions from './questions.json'

function App() {
  const shuffleArray = (array) => {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
  }

  const shuffledQuestions = shuffleArray(questions.questions).map(question => ({
    ...question,
    choices: shuffleArray(question.choices)
  }))

  return <Quiz questions={shuffledQuestions} />
}

export default App
