import React from 'react'
import './button.css'

export default props => (
  <button className={`button ${props.extraClass || ''}`} onClick={event =>  props.click && props.click(props.value || props.label)}>
    {props.label}
  </button>
)