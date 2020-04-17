import React from 'react';
import axios from 'axios';

const QuizQuestionDelete = (props) => {

    const onClick = () => {
        axios.post('/apis/quizzes/quiz/questions.php', { id: props.question.id, delete: true })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error);
                } else {
                    props.loadQuestions();
                }
            }).catch((err) => {
                throw err;
            });
    }

    return (
        <tr key={props.question.id} >
            <td>{props.i}</td>
            <td>{props.question.question}</td>
            <td>{props.question.state}</td>
            <td><button className="btn btn-danger" onClick={onClick} style={{float: 'right'}}>Delete</button></td>
        </tr>
    );

}

export default QuizQuestionDelete;