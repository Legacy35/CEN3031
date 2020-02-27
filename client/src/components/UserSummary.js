import React from 'react'

const UserSummary = (props) => {

        if(props.userData.id) {
            return (
                <div className="tile view">
                    <h2>Welcome, <em>{props.userData.email}</em></h2>
            <p>Your unique user ID is <b>{props.userData.id}</b></p>
            <p>You <b>{(props.userData.admin ? "are" : "are not")}</b> an admin.</p>
                </div>
            );
        } else {
            return (
                <div className="tile view">
                    <h2>You need to be logged in to view your account profile.</h2>
                </div>
            )
        }

}

export default UserSummary;