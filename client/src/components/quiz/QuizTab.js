import React, {useState} from 'react'
import axios from 'axios';

import QuizQuestion from './QuizQuestion.js';
import Quiz from './Quiz.js';
import { isLoggedIn } from '../../SessionManager.js';

const QuizTab = (props) => {

    let [questions, setQuestions] = useState([]);

    const loadQuiz = () => {
        axios.get('/apis/quizzes/quiz/questions')
        .then(
            (res) => {
    
                setQuestions(res.data);
    
            }
        )
        .catch(
            (err) => {
                if(err) throw err;
            }
        );  
    }

    if(questions.length == 0){
        return (
            <div>
                <p></p>
                <button className="btn btn-primary" onClick={loadQuiz}>Start quiz</button>
            </div>
        )
    } else {
        return (
            <Quiz loadQuiz={loadQuiz} questions={questions} setQuestions={setQuestions}/>
        );
    }


}

export default QuizTab;