import PropTypes from 'prop-types'
import "./Introduction.scss"
import digi from '../../assets/digi.png'

const Introduction = ({ onClickButtonStart }) => {
    return (
        <div className='introduction'>
            <div className='diggy-talking'>
                <div className='avatar'>
                    <img src={digi} alt="Digi" />
                </div>
                <div className='chat'>
                    <div className="bubble one">
                        <p>Hey there! I'm <span className='bold diggy'>DIGGY</span>, your friendly guide and teacher in the exciting world of online safety. <br />Together, we will dive into the dos and don’ts of staying secure on the internet!</p>
                        <br />
                        <p><span className='bold'>Here's how it works:</span> I'll ask you 20 questions about cybersecurity. Each one comes with four possible answers—only one is correct, so choose wisely! But don't worry, even if you slip up, you'll learn something new along the way.</p>
                        <br />
                        <p>At the end, you'll get your score, some personalized feedback, and a handy knowledge capsule to level up your online safety game. Ready to put your skills to the test? </p>
                        <button
                            className='start-button'
                            onClick={onClickButtonStart}
                        >
                            Let’s get started!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Introduction.propTypes = {
    onClickButtonStart: PropTypes.func

}

export default Introduction