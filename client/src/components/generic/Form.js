import React from 'react'

/**
 * 
 * @param {*} props
 * 
 * props.labelColWidth (int || int[6]). Bootstrap column width(s)
 * props.inputColWidth (int || int[6]). Bootstrap column width(s)
 * props.onSubmit (function)
 * props.inputs (array of input objects)
 *   - a given input object has three mandatory fields: 'name', 'label', & 'placeholder'
 *   - optional field: 'type'. Defaults to "text"
 * 
 */
const Form = (props) => {

    /*Convert integer inputs into arrays*/
    let labelColWidth = props.labelColWidth;
    labelColWidth = labelColWidth.length ? labelColWidth : [labelColWidth, labelColWidth, labelColWidth, labelColWidth, labelColWidth];

    let inputColWidth = props.inputColWidth;
    inputColWidth = inputColWidth.length ? inputColWidth : [inputColWidth, inputColWidth, inputColWidth, inputColWidth, inputColWidth];

    let i = 0;

    /*Map inputs to elements*/
    const inputs = props.inputs.map(element => 
        <div key={i++} className="row form-group">
            <div className={"col col-" + labelColWidth[0] + " col-sm-" + labelColWidth[1] + " col-md-" + labelColWidth[2] + " col-lg-" + labelColWidth[3] + " col-xl-" + labelColWidth[4]}>
                <label htmlFor={element.name}>{element.label}</label>
            </div>
            <div className={"col col-" + inputColWidth[0] + " col-sm-" + inputColWidth[1] + " col-md-" + inputColWidth[2] + " col-lg-" + inputColWidth[3] + " col-xl-" + inputColWidth[4]}>
                <input placeholder={element.placeholder} className="form-control" name={element.name} type={element.type ? element.type : "text"} />
            </div>
        </div>
    );

    return (
        <div>
            <form id={props.id} onSubmit={props.onSubmit}>
                {inputs}
            </form>
            <button className="btn btn-primary" onClick={props.onSubmit}>Submit</button>
        </div>
    );

}

export default Form;