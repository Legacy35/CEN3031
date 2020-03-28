import React from 'react'
import { logout } from '../SessionManager.js';

const UserSummary = (props) => {

    const onClick = () => {
        logout(props.views, props.setViews, props.setUserData);
    }

    return (
        <div>
            <h2>Welcome, <em>{props.userData.email}</em></h2>
            <p>Your unique user ID is <b>{props.userData.id}</b></p>
            <p>You <b>{(props.userData.admin ? "are" : "are not")}</b> an admin.</p>
            <button className="btn btn-primary" onClick={onClick}>Log out</button>
        </div>
    );

}

export default UserSummary;