import React from 'react'

const UserSummary = (props) => {

    if(props.userInfo.id){
        return (
            <div className="row">
                <ul className="center">
                    <li>User ID: {props.userInfo.id}</li>
                    <li>User email: {props.userInfo.email}</li>
                    <li>Admin: {props.userInfo.admin}</li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="row">
                <div className="center">
                    <h2>Sign in to view your profile.</h2>
                </div>
            </div>
        );
    }

}

export default UserSummary;