import React from 'react'
import classes from './Input.module.css'

const Input = props => {
    const htmlFor = `text-${Math.random()}`;
    return (
        <div className={classes.Input}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {props.notify}
        </div>
    )
};

export default Input;