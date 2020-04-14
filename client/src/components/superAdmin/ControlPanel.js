import React, { useState } from 'react';
import axios from 'axios';

const ControlPanel = (props) => {

    /**
     *     manageRivalries: false,
            manageQuizzes: false,
            manageUsers: false
     */

    const show = (name) => {
        let newViews = {...props.views}
        let keys = Object.keys(newViews);
        for (let i = 0; i < keys.length; i++) {
            newViews[keys[i]] = false;
        }
        newViews[name] = true;
        props.setViews(newViews);
    }

    const showQuizQuestions = () => {
        show('manageQuizzes');
    }  
    const showUsers = () => {
        show('manageUsers');
    }
    const showRivalries = () => {
        show('manageRivalries');
    }

    return (
        <div>
            <h1>Super User Control Panel</h1>
            <br />
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary w-100" onClick={showQuizQuestions}>
                        Manage quiz questions
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary w-100" onClick={showUsers}>
                        Manage users
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary w-100" onClick={showRivalries}>
                        Manage rivalries
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ControlPanel;