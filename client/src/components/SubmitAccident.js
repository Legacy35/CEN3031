import React from 'react';
import Form from './generic/Form';

const SubmitAccident = (props) => {

    const submit = () => {
        let form = document.getElementById('formSubmitAccident');
        let address = form.address.value;
        let dateTime = form.dateTime.value;
        let splits = dateTime.split(' ');
        let date = splits[0];
        let time = splits[1];
        if(!splits[0] || !splits[1]) {
            alert('Dates must use the DD/MM/YYYY HH:MM format');
            return;
        }
    }

    let inputs = [
        {
            label: "Address:",
            name: "address",
            placeholder: "P. Sherman 42 Wallaby Way"
        },
        {
            label: "Time:",
            name: "dateTime",
            placeholder: "MM/DD/YYYY HH:MM"  
        }
    ];

    return (
        <Form id={"formSubmitAccident"} labelColWidth={3} inputColWidth={9} onSubmit={submit} inputs={inputs} />
    )


}

export default SubmitAccident;