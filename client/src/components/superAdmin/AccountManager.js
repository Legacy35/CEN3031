import React from 'react';
import axios from 'axios';


const AccountManager = (props) => {

    const update = (_admin) => {
        let input = document.getElementById('inputEmail').value;
        axios.post('/apis/users/user.php', {email: input, admin: _admin})
        .then(
            (res) => {
                if(res.data.error) {
                    alert(res.data.error);
                } else {
                    alert('Account updated.');
                }
            }
        )
        .catch(
            (err) => {
                throw err;
            }
        )
    }   

    const promote = () => {
        update(1);
    }

    const demote = () => {
        update(0);
    }

    return (
        <div>
            <p>As the website administrator, you can grant and revoke the administrator status to other users at any time. Simply enter a user's email address in the field below and click the promote or demote button.</p>
            <p>Users promoted to the administrator rank are content administrators, not website administrators. The only privledge this grants is the ability to submit accident reports. </p>
            <div className="row">
                <div className="col col-12 col-md-6">
                    <input className="form-control" name="email" type="email" id="inputEmail" placeholder="cow@cow23.jp" style={{marginBottom: '10px'}} ></input>
                </div>
                <div className="col col-6 col-md-3">
                    <button className="btn btn-primary w-100" onClick={promote}>Promote</button>
                </div>
                <div className="col col-6 col-md-3">
                    <button className="btn btn-primary w-100" onClick={demote}>Demote</button>
                </div>
            </div>
        </div>
    )

}

export default AccountManager;