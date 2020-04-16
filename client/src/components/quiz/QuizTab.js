import React, {useState} from 'react'
import axios from 'axios';

import QuizQuestion from './QuizQuestion.js';
import Quiz from './Quiz.js';
import { isLoggedIn } from '../../SessionManager.js';

const QuizTab = (props) => {

    let [questions, setQuestions] = useState([]);

    const loadQuiz = () => {
        let form = document.getElementById("formGetQuestions");
        axios.get('/apis/quizzes/quiz/questions.php?limit=10&state=' + form.state.value)
        .then(
            (res) => {

                if (res.data.error){
                    alert(res.data.error);
                }
                else {
                    setQuestions(res.data);
                }

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
                <p>Select which questions you would like to recieve. Select "All" for questions applicable to all states.</p>
                <form id = "formGetQuestions">
                  <select id="state" name="state" className="form-control" placeholder="All">
                    <option value="All">All</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                  </select>
              </form>
                <br/><button className="btn btn-primary" onClick={loadQuiz}>Start quiz</button>
            </div>
        )
    } else {
        return (
            <Quiz loadQuiz={loadQuiz} questions={questions} setQuestions={setQuestions}/>
        );
    }


}

export default QuizTab;
