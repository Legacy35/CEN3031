import React, {useState} from 'react'
import axios from 'axios';

const QuizManager = (props) => {
    /*TODO: 
            Display current questions
            Add functionality for removing a question
    */

    let [questionList, setQuestionList] = useState([]);

    axios.get('/apis/quizzes/quiz/questions.php').then(
        (res) => {
            if(res.data.error){
              alert(res.data.error);
            } else {
              setQuestionList(res.data);
              console.log(res.data);
            }
          }
    ).catch((err) => {
        if(err) console.log(err);
    });

    const onChange = (e) => {
        
    
        questionList = questionList.map(directory => {
            return(
                <tr key={directory.id}>
                    <td>{directory.question}</td>
                </tr>
            );
        });
    };

    const onSubmit = (e) => {
        let form = document.getElementById("formAddQuestion");

        if(!form.question.value || !form.answer.value || !form.wc1.value || !form.wc2.value || !form.wc3.value || !form.state.value)
        {
            alert("All fields are required");
            return;
        }

        const params = {
            question: form.question.value,
            answer1: form.answer.value,
            answer2: form.wc1.value,
            answer3: form.wc2.value,
            answer4: form.wc3.value,
            correct_answer: 0,
            State: form.state.value
        };

        axios.post('/apis/quizzes/quiz.php', params).then(
            (res) => {
                if(res.data.error){
                    alert(res.data.error);
                } else {
                   // If it succeeds Do what? information is stored in res object
                   //an array of question Objects as defined in the API Guide
                   
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    };

    return(
        <div>
            <div>
                <p><strong>Add a Quiz Question</strong></p>
                
                <form id="formAddQuestion" onSubmit={onSubmit}>
                    <div className="form-group row">
                        <div className="col col-12 col-sm-3">
                            <label htmlFor="state">State:</label>
                        </div>
                        <div className="col col-12 col-sm-9">
                            <select className="form-control" id="state" name="state">
                                <option value="All">All</option>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="District of Columbia">District of Columbia</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Guam">Guam</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Marshall Islands">Marshall Islands</option>
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
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Rhode Island">Rhode Island</option>
                                <option value="South Carolina">South Carolina</option>
                                <option value="South Dakota">South Dakota</option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virgin Island">Virgin Island</option>
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
                    <input className="btn btn-primary" type='submit' value='Add Question'/>
                </form>
            </div>
            <div>
                <strong>Remove a Quiz Question</strong>
                <p><input className="form-control" placeholder="Search for a question" onChange={onChange}></input></p>
                <div>
                    {questionList}
                </div>
                
            </div>
        </div>
    );
}

export default QuizManager;