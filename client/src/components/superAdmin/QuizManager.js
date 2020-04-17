import React, { useState } from 'react'
import axios from 'axios';

import QuizQuestionDelete from './QuizQuestionDelete.js';

const QuizManager = (props) => {

    /*Hooks*/
    let [questions, setQuestions] = useState([]);
    let [loaded, setLoaded] = useState(false);
    let i = 1;

    /*Utility functions*/
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*Events*/
    const onSubmitAdd = (e) => {
        if (e) e.preventDefault();
        let form = document.getElementById("formAddQuestion");

        if (!form.question.value || !form.answer.value || !form.wc1.value || !form.wc2.value || !form.wc3.value || !form.state.value) {
            alert("All fields are required");
            return;
        }
        let i = getRandomInt(0, 3);
        let answers = [form.answer.value, form.wc1.value, form.wc2.value, form.wc3.value];
        let temp = answers[0];
        answers[0] = answers[i];
        answers[i] = temp;
        const params = {
            question: form.question.value,
            answer1: answers[0],
            answer2: answers[1],
            answer3: answers[2],
            answer4: answers[3],
            correct: i,
            state: form.state.value
        };

        axios.post('/apis/quizzes/quiz/questions.php', params).then(
            (res) => {
                if (res.data.error) {
                    alert(res.data.error);
                } else {
                    alert("Question added");
                    loadQuestions();
                    form.question.value = "";
                    form.answer.value = "";
                    form.wc1.value = "";
                    form.wc2.value = "";
                    form.wc3.value = "";
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    };

    /*Initialization*/
    const loadQuestions = (evt) => {
        if (evt) evt.preventDefault();
        let textField = document.getElementById("questionSearch");
        let filter = textField ? textField.value : "";
        axios.get('/apis/quizzes/quiz/questions.php?state=&filter=' + filter + '&limit=50').then(
            (res) => {
                if (res.data.error) {
                    alert(res.data.error);
                } else {
                    setQuestions(res.data);
                }
            }
        ).catch((err) => {
            console.log(err);
        });
        setLoaded(true);
    }

    if (!loaded) loadQuestions();

    return (
        <div>
            <div>
                <h2>Add a Quiz Question</h2>

                <form id="formAddQuestion">
                    <div className="form-group row">
                        <div className="col col-12 col-sm-3">
                            <label htmlFor="state">State:</label>
                        </div>
                        <div className="col col-12 col-sm-9">
                            <select className="form-control" id="state" name="state">
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
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-12 col-sm-3">
                            <label htmlFor="question">Question:</label>
                        </div>
                        <div className="col col-12 col-sm-9">
                            <input className="form-control" id="question" name="question"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-12 col-sm-3">
                            <label htmlFor="answer">Answer:</label>
                        </div>
                        <div className="col col-12 col-sm-9">
                            <input className="form-control" id="answer" name="answer"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-12 col-sm-3">
                            <label htmlFor="wc1">Wrong Choice 1:  </label>
                        </div>
                        <div className="col col-12 col-sm-9">
                            <input className="form-control" id="wc1" name="wc1"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-12 col-sm-3">
                            <label htmlFor="wc2">Wrong Choice 2:  </label>
                        </div>
                        <div className="col col-12 col-sm-9">
                            <input className="form-control" id="wc2" name="wc2"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-12 col-sm-3">
                            <label htmlFor="wc3">Wrong Choice 3:  </label>
                        </div>
                        <div className="col col-12 col-sm-9">
                            <input className="form-control" id="wc3" name="wc3"></input>
                        </div>
                    </div>
                    <input className="btn btn-primary" type='submit' value='Add Question' onClick={onSubmitAdd} />
                    <hr />
                </form>
            </div>
            <div>
                <h2>Remove a Quiz Question</h2>
                <form onSubmit={loadQuestions}>
                    <div className="row form-group">
                        <div className="col col-12 col-md-9">
                            <input className="form-control" id="questionSearch" placeholder="Narrow your search here using a question's text" />
                        </div>
                        <div className="col col-12 col-md-3">
                            <button className="btn btn-primary w-100" onClick={loadQuestions}>Search</button>
                        </div>
                    </div>
                </form>

                <div>
                    {questions &&
                        questions.map((element) => (
                            <div key={element.id}>
                            </div>
                        ))}
                </div>
                <div className="table-responsive nopadding nomargin">

                    <table className="table table-striped table-dark table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Question</th>
                                <th scope="col">State</th>
                                <th scope="col"></th>
                            </tr>
                            {
                                questions.map((question) => (
                                    <QuizQuestionDelete question={question} i={i++} loadQuestions={loadQuestions} />
                                ))
                            }
                        </thead>
                    </table>
                </div>


            </div>
        </div>
    );
}

export default QuizManager;
