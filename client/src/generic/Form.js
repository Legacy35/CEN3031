import React from 'react'

/**
 * 
 * @param {*} props
 * 
 * props.labelColWidth (int)
 * props.inputColWidth (int) 
 * props.onSubmit (function)
 * props.inputs (array)
 *   - a given input has three fields: 'name', 'label', & 'placeholder'
 */
const Form = (props) => {

    return (
        <div>
            <form>

                {
                    props.inputs.forEach((element) => {
                        <div key={i++} className="row form-group">
                            <label htmlFor={element.name}>{element.label}</label>
                            <input className="form-control" name={element.name} type="text" className={"col col-" + props.inputColWidth} placeholder={element.placeholder} />
                        </div>
                    })
                }

            </form>
            <button className="btn btn-primary" onClick={props.onSubmit}>Submit</button>
            
        </div>
    );

}

export default Form;