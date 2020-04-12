import React, {useState} from 'react'
import axios from 'axios';

const QuizManager = (props) => {
    /*TODO: Send question to database on submit
            Display current questions
            Add functionality for removing a question
    */

    const onSubmit = (e) => {
        let form = document.getElementById("formAddQuestion");

        const newQuestion = {
            /*id: ???,*/
            question: form.question.value,
            answer1: form.answer.value,
            answer2: form.wc1.value,
            answer3: form.wc2.value,
            answer4: form.wc3.value,
            correct_answer: 0,

        };

    };

    return(
        <div>
            <div>
                <p><strong>Add a Quiz Question</strong></p>
                
                <form id="formAddQuestion" onSubmit={onSubmit}>
                    <p>
                        <label for="state">State:  </label>
                        <select id="state">
                            <option value="all">All</option>
                        </select>
                    </p>
                    <p>
                        <label for="question">Question:  </label>
                        <input id="question"></input>
                    </p>
                    <p>
                        <label for="answer">Answer:  </label>
                        <input id="answer"></input>
                    </p>
                    <p>
                        <label for="wc1">Wrong Choice 1:  </label>
                        <input id="wc1"></input>
                    </p>
                    <p>
                        <label for="wc2">Wrong Choice 2:  </label>
                        <input id="wc2"></input>
                    </p>
                    <p>
                        <label for="wc3">Wrong Choice 3:  </label>
                        <input id="wc3"></input>
                    </p>
                    <input type='submit' value='Add Question'/>
                </form>
            </div>
            <div>
                <strong>Remove a Quiz Question</strong>
                <p><input placeholder="Search for a question"></input></p>
                
            </div>
        </div>
    );
}

export default QuizManager;