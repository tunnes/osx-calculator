import React, { Component } from 'react'
import './calculator.css'

import Button from '../components/button'
import Display from '../components/display'

const initialState = {
  displayValue: "0",
  operation: null,
  firstNumber: null,
  secondNumber: null,
}

export default class Calculator extends Component {

  state = { ...initialState }

  constructor(props){
    super(props)
    this.validOperation = this.validOperation.bind(this)
    this.getPercentage = this.getPercentage.bind(this)
    this.setOperation = this.setOperation.bind(this) 
    this.invertNumber = this.invertNumber.bind(this)
    this.setNumber = this.setNumber.bind(this) 
    this.getResult = this.getResult.bind(this)
    this.setDigit = this.setDigit.bind(this) 
    this.clear = this.clear.bind(this) 
  }

  clear() {
    this.setState({ ...initialState })
  }

  setOperation(operation) {
    if(this.state.operation === null) {
      this.setState({ operation: operation })
    } else {
      this.getResult()
      this.setState({ operation: operation })
    }
  }

  setDigit(digit) {
    if (!this.state.displayValue.includes(".")) {
      this.setNumber(digit)
    }
    console.log(this.state)
  }

  setNumber(number) {   
    const getNumber = condition => condition ? `${this.state.displayValue}${number}` : number

    if (this.state.operation === null) {
      number = getNumber(this.state.displayValue !== '0')
      this.setState({ firstNumber: number, displayValue: number })
    } else {
      number = getNumber(this.state.secondNumber !== null)
      this.setState({ secondNumber: number, displayValue: number })
    }
  }

  validOperation() {
    return(
      !isNaN(this.state.firstNumber) &&
      !isNaN(this.state.secondNumber) &&
      ["/", "*", "+", "-"].includes(this.state.operation)
    )
  }

  getResult() {
    if (this.validOperation()) {
      const result = eval(`${this.state.firstNumber} ${this.state.operation} ${this.state.secondNumber}`)
      this.setState({ ...initialState, displayValue: result, firstNumber: result })
    } else {
      this.clear()
    }
  }

  invertNumber() {
   let number = parseFloat(this.state.displayValue)
   this.setState({ displayValue: number > 0 ? -number : Math.abs(number) })
  }

  getPercentage() {
    if(this.state.operation === '*'){
      const result = (parseFloat(this.state.firstNumber) / 100) * parseFloat(this.state.secondNumber)
      this.setState({ ...initialState, displayValue: result, firstNumber: result })      
    } else {
      this.clear()
    }
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator_visual-controls">
          <span className="visual-control"></span>
          <span className="visual-control"></span>
          <span className="visual-control"></span>
        </div>
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clear} extraClass="u-top" />
        <Button label="+/-" click={this.invertNumber} extraClass="u-top"/>
        <Button label="%" click={this.getPercentage} extraClass="u-top"/>
        <Button label="÷" value="/" click={this.setOperation} extraClass="operation"/>
        <Button label="7" click={this.setNumber}/>
        <Button label="8" click={this.setNumber}/>
        <Button label="9" click={this.setNumber}/>
        <Button label="×" value="*" click={this.setOperation} extraClass='operation'/>
        <Button label="4" click={this.setNumber}/>
        <Button label="5" click={this.setNumber}/>
        <Button label="6" click={this.setNumber}/>
        <Button label="-" click={this.setOperation} extraClass='operation'/>
        <Button label="1" click={this.setNumber}/>
        <Button label="2" click={this.setNumber}/>
        <Button label="3" click={this.setNumber}/>
        <Button label="+" click={this.setOperation} extraClass='operation'/>
        <Button label="0" click={this.setNumber} extraClass='double'/>
        <Button label="." click={this.setDigit}/>
        <Button label="=" click={this.getResult} extraClass='operation'/> 
      </div>
    )
  }
} 