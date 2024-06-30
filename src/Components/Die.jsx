import React from 'react'

export default function Die(props) {
    return (
        <button className={`box ${props.isHeld ? 'held':''}`} onClick={props.holdDice}>{props.value} </button>
    )
}