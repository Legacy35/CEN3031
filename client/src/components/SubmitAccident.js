import React from 'react';
import Form from './generic/Form';

const SubmitAccident = (props) => {

    //cityName: <string>,
  // state: <string>, /*Full name of state, not code*/
    //date: <int>, /*Unix Epoch int*/
   // weather: <Weather[]> /*Values of weather must be from Weather enum*/
    
    const stringToDate = (intput) => {
        
    }

    const onSubmit = () => {
        let form = document.getElementById('formSubmitAccident');

    }

    let inputs = [
        {
            label: "City:",
            name: "cityName",
            placeholder: "Sydney"
        },
        {
            label: "State",
            name: "state",
            placeholder: "EG: \"FL\", not \"Florida\""
        },
        {
            label: "Date:",
            name: "date",
            placeholder: "MM/DD/YYYY HH:MM"  
        },
        {
            label: "Address:",
            name: "address",
            placeholder: "P. Sherman 42 Wallaby Way"
        }
    ];

    return (
        <Form id={"formSubmitAccident"} labelColWidth={3} inputColWidth={9} onSubmit={onSubmit} inputs={inputs} />
    )


}

export default SubmitAccident;