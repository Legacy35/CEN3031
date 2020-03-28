import React from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const QuizQuestion = (props) => {
    let question = props.question;
    let a1 = props.a1;
    let a2 = props.a2;
    let a3 = props.a3;
    let a4 = props.a4;

    return (
        <div>
            <p><b>{question}</b></p>
            
            <input type="radio" id="a1"></input>
            <label for="a1">{a1}</label><br></br>
            <input type="radio" id="a2"></input>
            <label for="a2">{a2}</label><br></br>
            <input type="radio" id="a3"></input>
            <label for="a3">{a3}</label><br></br>
            <input type="radio" id="a4"></input>
            <label for="a4">{a4}</label><br></br>
        </div>
    );
}

export default QuizQuestion;