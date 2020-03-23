import React from 'react'
import Cookies from 'universal-cookie';
import QuizQuestion from './QuizQuestion.js';

const cookies = new Cookies();

const QuizTab = (props) => {

        return (
            <div className="tile view form">
                <QuizQuestion question={"What is a speed limit?"} a1={"A convincing answer 1"} a2={"A convincing answer 2"} a3={"A convincing answer 3"} a4={"A convincing answer 4"}/>
            </div>
        );
}

export default QuizTab;