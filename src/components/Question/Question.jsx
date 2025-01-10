import PropTypes from 'prop-types'
import "./Question.scss"

const Question = ({ question, choices, onAnswerClick, answerIdx, type = 'real-question', isGoodAnswer = null, correctAnswer = null, explanation = null }) => {
    return (
        <>
            <div className={type}>
                <div>
                    {isGoodAnswer != null ?
                        (isGoodAnswer ==
                            true ?
                            (<div className='score good'>+1</div>)
                            :
                            (<div className='score wrong'>+0</div>)
                        )
                        : null}
                    <h2 className={'question'}>{question}</h2>

                </div>
                <ul>
                    {
                        choices.map((choice, index) => (
                            type == 'result-question' ?
                                (
                                    <li
                                        key={index}
                                        className={choice == correctAnswer ? 'correct-answer' : null}
                                    >
                                        {choice}
                                    </li>
                                )
                                :
                                (
                                    <li
                                        onClick={() => onAnswerClick(choice, index)}
                                        key={index}
                                        className={answerIdx === index ? 'selected-answer' : null}
                                    >
                                        {choice}
                                    </li>
                                )

                        ))
                    }
                </ul>
                {type == 'result-question'
                    ?
                    (<p><span className='bold'>Explanation:</span> {explanation}</p>)
                    :
                    null}
            </div>

        </>
    )
}

Question.propTypes = {
    question: PropTypes.string,
    choices: PropTypes.array,
    onAnswerClick: PropTypes.func,
    answerIdx: PropTypes.number,
    type: PropTypes.string,
    isGoodAnswer: PropTypes.bool,
    correctAnswer: PropTypes.string,
    explanation: PropTypes.string,
}

export default Question