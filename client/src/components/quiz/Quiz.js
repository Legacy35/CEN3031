import React from 'react';
import QuizQuestion from './QuizQuestion';

import axios from 'axios';

const Quiz = (props) => {

    let i = 0;

    const onClick = (evt) => {

        evt.preventDefault();

        let form = document.getElementById("formQuiz");
        let formData = new FormData(form);
        let data = {};

        for(var pair of formData.entries()) {
            data[[pair[0]]] = pair[1];
         }

        axios.post('/apis/quizzes/quiz.php', data).then(
            (response) => {
                console.log(response);
                if(response.data.error){
                    alert(response.data.error);
                } else {
                    alert('You scored a ' + response.data.score + '%');
                    props.setQuestions([]);
                }
            }   
        )
        .catch(
            (err) => {
                if(err) throw err;
            }
        )


    }

    return (
        <form id="formQuiz">
            {
                props.questions.map((_question) => <QuizQuestion key={_question._id} id={_question._id} question={_question.question} answers={_question.answers}/>)
            }
            <input type="hidden" value={props.questions.length} name="questionCount"/>
            <input type="submit" value="Submit quiz" className="btn btn-primary" onClick={onClick}/>

        </form>
    );

}

export default Quiz;