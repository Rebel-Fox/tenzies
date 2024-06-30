import React from 'react'
import {nanoid} from 'nanoid'
import './die.css'

export default function Die(props) {

    const dots=[]

    for(let i=0;i<props.value;i++){
        dots.push(<span key= {nanoid()} className='dot'></span>)
    }

    return (
        <button className={`box ${props.isHeld ? 'held':''}`} onClick={props.holdDice}>{dots} </button>
    )
}