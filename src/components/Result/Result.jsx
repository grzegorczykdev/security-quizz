import PropTypes from 'prop-types'
import "./Result.scss"
import digi from '../../assets/digi.png'
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../../firebaseConfig"
import Question from "../Question/Question.jsx"



const Result = ({ totalQuestions, result, onTryAgainClick }) => {

    const saveScore = async (score) => {
        try {
            const docRef = await addDoc(collection(db, "quizScores"), {
                score: score,
                timestamp: new Date(),
            })
            console.log("Wynik zapisany z ID: ", docRef.id)
        } catch (e) {
            console.error("Błąd podczas zapisywania wyniku: ", e)
        }
    }

    const renderSwitch = (points) => {

        saveScore(points)

        let textResult = ""
        switch (true) {
            case points >= 18:
                textResult = "Wow! You're a cybersecurity genius! Your knowledge is strong, and you're well-prepared to keep your information safe online. Keep up the great work!"
                break
            case points < 17 && points >= 14:
                textResult = "Good job! You have a solid understanding of cybersecurity, but there’s room to tighten up your defenses."
                break
            case points < 13 && points >= 10:
                textResult = "Not bad, but some gaps in your knowledge could leave you vulnerable. Stay alert!"
                break
            case points < 9 && points >= 6:
                textResult = "You're getting there, but there’s room for improvement. Take some time to review the basics and boost your online security skills."
                break
            case points <= 5:
                textResult = "It looks like there’s still some work to do. Don’t worry though! Use this as a chance to learn and improve your online safety practices."
                break

        }
        return textResult
    }

    return (
        <div className='result'>

            <div className='diggy-talking'>
                <div className='avatar'>
                    <img src={digi} alt="Digi" />
                </div>
                <div className='chat'>
                    <div className="bubble one">
                        <p className='points'>Your result is {result.points} {result.points === 1 ? 'point' : 'points'}!</p>
                        <br />
                        <p>{renderSwitch(result.points)}</p>
                        <br />
                        <p>Below, you'll find a <span className='bold'>detailed breakdown of your results and the answers to each question with explanations</span>. This is a great opportunity to learn more and strengthen your cybersecurity knowledge. Remember, every step you take in this field leads to a safer digital future!</p>
                        <br />
                        <br />
                        <p>If you want, you can also try again!</p>
                        <button
                            className='start-button'
                            onClick={onTryAgainClick}
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
            <div className='questions-results'>
                {totalQuestions.map((question, index) => {
                    return (
                        <Question key={index} correctAnswer={question.correct} explanation={question.explanation} question={question.question} choices={question.choices} type={'result-question'} isGoodAnswer={result.wrongAnswers.includes(index) ? false : true} />
                    )
                })}
            </div>
        </div>
    )
}

Result.propTypes = {
    totalQuestions: PropTypes.array,
    result: PropTypes.object,
    onTryAgainClick: PropTypes.func
}

export default Result