import React from 'react';
import axios from 'axios';
import {loadProfile} from '../SessionManager.js';



const UpdateAccountInfo = (props) => {

    const onClick = (evt) => {
        evt.preventDefault();
        let params = {};
        let form = document.getElementById('formUpdateProfile');
        if(form.firstName.value) params['firstName'] = form.firstName.value;
        if(form.lastName.value) params['lastName'] = form.lastName.value;
        if(form.address.value) params['address'] = form.address.value;
        if(form.phoneNumber.value) params['phoneNumber'] = form.phoneNumber.value;
        if(form.insuranceCompany.value) params['insuranceCompany'] = form.insuranceCompany.value;
        if(form.dashcam.value) params['dashcam'] = form.dashcam.value;
        axios.post('/apis/users/user.php', params)
        .then(
            (res) => { 
                if(res.data.error) {
                    alert(res.data.error);
                } else {
                    alert('Profile updated');
                    
                }
            }
        )
        .catch(
            (err) => {
                if(err) throw err;
            }
        )

    }

    return (
        <form id="formUpdateProfile">
            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="firstName">First name: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="firstName" id="firstName" type="text" placeholder={props.userData.first_name}/>
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="lastName">Last name: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="lastName" id="lastName" type="text" placeholder={props.userData.last_name}/>
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="address">Address: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="address" id="address" type="text" placeholder={props.userData.address}/>
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="phoneNumber">Phone number: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="phoneNumber" id="phoneNumber" type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder={props.userData.phone_number}/>
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="insuranceCompany">Name of your insurance company: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="insuranceCompany" id="insuranceCompany" type="text" placeholder={props.userData.insurance_company}/>
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="dashCam">Do you have a dash cam in your car?</label>
                </div>
                <div className="col col-12 col-sm-9">
                    <select className="form-control" name="dashcam" id="dashcam">
                        <option value="1" selected={props.userData.dashcam ? "selected" : ""}>Yes</option>
                        <option value="0" selected={!props.userData.dashcam ? "selected" : ""}>No</option>
                    </select>
                </div>
            </div>
            <button className="btn btn-primary" onClick={onClick}>
                Update profile
            </button>
        </form>
    );

}

export default UpdateAccountInfo;