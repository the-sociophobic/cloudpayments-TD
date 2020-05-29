import React, { Component } from 'react'


export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.inputRef = new React.createRef()
  }

  focus = () => this.inputRef.current && this.inputRef.current.focus()

  render = () =>
    <input
    type={this.props.email ? "email" : ""}
    ref={this.inputRef}
      className={"pay-form__Input " +
        (this.props.error && " pay-form__Input--error ") +
        " " + (this.props.className)}
      value={this.props.value}
      onChange={e => this.props.onChange(e.target.value)}
      placeholder={this.props.placeholder}
    />
}