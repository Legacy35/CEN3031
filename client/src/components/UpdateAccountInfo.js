import React from 'react';

const UpdateAccountInfo = (props) => {

    return (
        <form>
            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="firstName">First name: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="firstName" id="firstName" type="text" value={props.userData.first_name}/>
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="lastName">Last name: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="lastName" id="lastName" type="text" />
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="address">Address: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="address" id="address" type="text" />
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="phoneNumber">Phone number: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="phoneNumber" id="phoneNumber" type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="insuranceCompany">Name of your insurance company: </label>
                </div>
                <div className="col col-12 col-sm-9">
                    <input className="form-control" name="insuranceCompany" id="insuranceCompany" type="text" />
                </div>
            </div>

            <div className="form-group row">
                <div className="col col-12 col-sm-3">
                    <label htmlFor="dashCam">Do you have a dash cam in your car?</label>
                </div>
                <div className="col col-12 col-sm-9">
                    <select className="form-control" name="dashCam" id="dashCam">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>

            <button className="btn btn-primary">
                Update profile
            </button>

        </form>
    );

}

export default UpdateAccountInfo;