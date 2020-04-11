import React, {useState} from 'react'
import axios from 'axios';

const QuizManager = (props) => {
    return(
        <div>
            <div>
                <p><strong>Add a Quiz Question</strong></p>
                
                <p><label for="state">State:  </label>
                <select id="state">
                    <option value="all">All</option>
                </select></p>
                

                <p><label for="question">Question:  </label>
                <input id="question"></input></p>
                <p><label for="answer">Answer:  </label>
                <input id="answer"></input></p>
                <p><label for="wc1">Wrong Choice 1:  </label>
                <input id="wc1"></input></p>
                <p><label for="wc2">Wrong Choice 2:  </label>
                <input id="wc2"></input></p>
                <p><label for="wc3">Wrong Choice 3:  </label>
                <input id="wc3"></input></p>
                <p><button>Submit</button></p>
            </div>
            <div>
                <strong>Remove a Quiz Question</strong>
                <p><input placeholder="Search for a question"></input></p>
            </div>
        </div>
    );
}

export default QuizManager;