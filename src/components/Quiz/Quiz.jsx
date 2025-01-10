import PropTypes from 'prop-types'
import { resultInitial } from '../../constants.jsx'
import { useState } from "react"
import "./Quiz.scss"
import Result from "../Result/Result.jsx"
import Question from "../Question/Question.jsx"
import Introduction from "../Introduction/Introduction.jsx"
import erasmus from '../../assets/erasmus.svg'
import loud from '../../assets/loud.jpg'
import youth from '../../assets/youth.jpg'
import github from '../../assets/github-mark-white.png'

const Quiz = ({ questions }) => {
    const [gameStarted, setGameStarted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answerIdx, setAnswerIdx] = useState(null)
    const [result, setResult] = useState(resultInitial)
    const [answer, setAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const { question, choices, correct } = questions[currentQuestion]

    const onClickButtonStart = () => {
        setGameStarted(true)
        console.log(gameStarted)
    }

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
        <>
            <div className='title'>
                <h1><span className='title-span'>DIGGY</span>Safe<span className='title-dot'>.</span></h1>
            </div>
            {!gameStarted
                ?
                <Introduction onClickButtonStart={onClickButtonStart} />
                : (
                    !showResult ?
                        (
                            <div className="quiz-container">

                                {

                                    <>
                                        <div className='questions'>
                                            <span className="active-question-no">{currentQuestion + 1}</span>
                                            <span className="total-questions">/{questions.length}</span>
                                        </div>

                                        <Question question={question} choices={choices} onAnswerClick={onAnswerClick} answerIdx={answerIdx} />
                                        <div className='footer'>
                                            <button
                                                className='next-button'
                                                onClick={onClickNext}
                                                disabled={answerIdx === null}
                                            >
                                                {currentQuestion === question.length - 1 ? "Finish" : "Next"}
                                            </button>
                                        </div>
                                    </>

                                }
                            </div >
                        )
                        :
                        (
                            <Result result={result} onTryAgainClick={onTryAgainClick} totalQuestions={questions} />
                        )


                )
            }
            <div className='quizz-footer'>
                <div className='footer-logos'>
                    <div className='footer-logo'>
                        <a target="_blank" href="https://www.instagram.com/loudandclear_eu/">
                            <img src={loud} alt="loud_and_clear_logo" />
                        </a>
                    </div>
                    <div className='footer-logo second'>
                        <a target="_blank" href="https://www.instagram.com/young.spirit.youth/">
                            <img src={youth} alt="young_spirit_logo" />
                        </a>
                    </div>
                </div>

                <div className='footer-erasmus'>
                    <img src={erasmus} alt="young_spirit_logo" />
                </div>

                <div className='erasmus-logo-container'>
                    <div className='footer-logo'>
                        <a target="_blank" href="https://github.com/grzegorczykdev/security-quizz">
                            <img src={github} alt="erasmus-plus-logo" />
                        </a>
                    </div>
                </div>
            </div>
        </>


    )
}

Quiz.propTypes = {
    questions: PropTypes.array
}

export default Quiz