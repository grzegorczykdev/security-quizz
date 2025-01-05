import PropTypes from 'prop-types'
import { resultInitial } from './constants.jsx'
import { useState } from "react"

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answerIdx, setAnswerIdx] = useState(null)
    const [result, setResult] = useState(resultInitial)
    const [answer, setAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const { question, choices, correct } = questions[currentQuestion]

    const onAnswerClick = (choice, index) => {
        setAnswerIdx(index)
        if (choice === correct) {
            setAnswer(true)
            // setPoints(points + 1)
        } else {
            setAnswer(false)
        }
    }

    const onClickNext = () => {
        setAnswerIdx(null)
        setResult((prev) => {
            const updatedWrongAnswers = answer ? prev.wrongAnswers : [...prev.wrongAnswers, currentQuestion]

            return answer
                ? {
                    ...prev,
                    points: prev.points + 1
                }
                : {
                    ...prev,
                    wrongAnswers: updatedWrongAnswers
                }
        })

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setCurrentQuestion(0)
            setShowResult(true)
        }
    }

    const onTryAgainClick = () => {
        setResult(resultInitial)
        setShowResult(false)

    }


    return (
        <div className="quiz-container">
            {!showResult ?
                (
                    <>
                        <span className="active-question-no">{currentQuestion + 1}</span>
                        <span className="total-questions">/{questions.length}</span>
                        <h2>{question}</h2>
                        <ul>
                            {
                                choices.map((choice, index) => (
                                    <li
                                        onClick={() => onAnswerClick(choice, index)}
                                        key={index}
                                        className={answerIdx === index ? 'selected-answer' : null}
                                    >
                                        {choice}
                                    </li>
                                ))
                            }
                        </ul>
                        <div className='footer'>
                            <button
                                className='next-button'
                                onClick={onClickNext}
                                disabled={answerIdx === null}
                            >
                                {currentQuestion === question.length - 1 ? "finish" : "next"}
                            </button>
                        </div>
                    </>
                )
                :
                (
                    <div className='result'>
                        <h3>{result.points}</h3>
                        <button onClick={(onTryAgainClick)}>Try again</button>
                        <div>
                            {questions.map((question, index) => {
                                return (


                                    <div className={'question-explanation' + (result.wrongAnswers.includes(index) ? ' wrong' : '')} key={index}>
                                        {question.question}
                                        <br />
                                        <br />
                                        {question.correct}
                                        <br />
                                        <br />
                                        {question.explanation}
                                        <br />
                                        <br /><br />
                                        <br />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }

        </div >
    )
}

Quiz.propTypes = {
    questions: PropTypes.array
}

export default Quiz