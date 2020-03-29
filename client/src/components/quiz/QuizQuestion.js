import React from 'react'


/**
 * Props: question, answers, id
 */
const QuizQuestion = (props) => {
   
    let i = 0;
    const answers = props.answers.map(() => 
        <div style={{padding: '0px', margin: '0px'}}>
            <input type="radio" id={'q' + props.id + 'a' + i} name={'q' + props.id} value={i}/>
            <label htmlFor={'q' + props.id + 'a' + i}>{props.answers[i++]}</label>
        </div>
    );

    return (
        <div className="form-group">
            <div><b>{props.question}</b></div>
            {answers}
            <hr style={{border: '1px solid gray'}}/>
        </div>
    );
}

export default QuizQuestion;