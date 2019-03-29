import React from 'react'
import classes from './Card.module.css'

const Card = props => {

    let card;
    let index = (<span className={classes.Index}>{props.index}</span>);

    if (props.isListFormat) {
        card = (props) => (<div className={classes.Card + " " + classes.ListCard}>
            <div className={classes.ListCardHeader}>
                <div className={classes.LeftListCardHeader}>
                    {index}
                    <span>{props.title}</span>
                </div>
                <div className={classes.RightListCardHeader}>
                    {props.attributes.map((item, index) => <div key={index}>{item}</div>)}
                </div>
            </div>
            <hr></hr>
            <span>{props.description}</span>
        </div>);
    } else {
        card = (props) => (<div className={classes.Card + " " + classes.TableCard}>
            <div>
                <div>{props.title}</div>
                {index}
            </div>
            <hr></hr>
            <ul>
                {props.attributes.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <hr></hr>
            <div>
                {props.description}
            </div>
        </div>);
    }

    return (
        <React.Fragment>
            {card(props)}
        </React.Fragment>

    )
};

export default Card;
