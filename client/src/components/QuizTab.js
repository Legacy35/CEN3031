import React from 'react'
import Cookies from 'universal-cookie';
import QuizQuestion from './QuizQuestion.js';

import axios from 'axios';

const cookies = new Cookies();

const QuizTab = (props) => {

    axios.get('/apis/quizzes/quiz')
    .then(
        (data) => {
            
        }
    )
    .catch(
        (err) => {
            if(err) throw err;
        }
    );

        return (
            <div>
                <QuizQuestion id={1} question={"What is a speed limit?"} answers={["Test", "Test", "Test", "Test"]}/>
            </div>
        );
}

export default QuizTab;