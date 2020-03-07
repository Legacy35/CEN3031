import React from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const QuizTab = (props) => {

        return (
            <div className="tile view form">
                <h2>Take a Driving Safety Quiz</h2>
                <p><b>Quiestion 1:</b></p>
                <p>Who is a speed limit?</p>
                <p><b>Quiestion 2:</b></p>
                <p>What is the speed limit?</p>
                <p><b>Quiestion 3:</b></p>
                <p>Where is your speed limit?</p>
                <p><b>Quiestion 4:</b></p>
                <p>When is our speed limit?</p>
                <p><b>Quiestion 5:</b></p>
                <p>Why is my speed limit?</p>
                
            </div>
        );
}

export default QuizTab;