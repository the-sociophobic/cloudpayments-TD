import React, { Component } from 'react'

import Input from './Input'
import checkEmail from '../utils/checkEmail'
import ExternalLink from './ExternalLink'


const buttons = [
  {
    amount: 100,
  },
  {
    amount: 300,
  },
  {
    amount: 1000,
  },
  {
    amount: 5000,
  },
]

export default class PayForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      inputAmount: "",
      wrongInputAmount: false,
      email: "",
      wrongEmail: false,
      name: "",

      currentButton: 0,
    }

    this.inputRef = React.createRef()
  }

  pay = () => {
    const {
      email,
      name,
      inputAmount,
      currentButton
    } = this.state
    let errorFlag = false

    if (!checkEmail(email)) {
      this.setState({wrongEmail: true})
      errorFlag = true
    }

    const amount = currentButton === -1 ?
      Number(inputAmount)
      :
      buttons[currentButton].amount

    if (isNaN(amount) || amount < 10) {
      this.setState({wrongInputAmount: true})
      errorFlag = true
    }

    if (errorFlag)
      return

    const widget = new cp.CloudPayments()

    widget.charge({
      publicId: 'pk_092f289d529ea34e6d4d487ad8edd',  //id из личного кабинета
      description: `Целевое пожертвование на проведение IV Международного Летнего фестиваля искусств «Точка доступа», содержание и ведение уставной деятельности`, //назначение
      amount: amount, //сумма
      currency: 'RUB', //валюта
      // invoiceId: '1234567', //номер заказа  (необязательно)
      accountId: email, //идентификатор плательщика (необязательно)
      skin: "mini", //дизайн виджета
      // data: {
      //   myProp: 'myProp value' //произвольный набор параметров
      // }
    },
    function (options) { // success
      console.log("successful payment")
    },
    function (reason, options) { // fail
      console.log("failed payment")
    })
  }

  renderInputAmount = () =>
    <Input
      ref={this.inputRef}
      error={this.state.wrongInputAmount}
      className="pay-form__Input--amount"
      value={this.state.inputAmount}
      onChange={value => {
        let clearedValue = value.replace(/[^0-9]/g, '')
        while (clearedValue.charAt(0) === "0")
          clearedValue = clearedValue.slice(1)

        this.setState({
          inputAmount: clearedValue,
          wrongInputAmount: this.state.wrongInputAmount ? clearedValue !== value : false,
        })
      }}
      placeholder="указать свою сумму"
    />

  render = () => {
    const buttonsMapped = [
      ...buttons.map((button, index) =>
        <div
          className={"pay-form__button " +
            (index === this.state.currentButton && " pay-form__button--selected ")}
          onClick={() => this.setState({currentButton: index})}
        >
          {button.amount} ₽
        </div>
      ),
      <div
        className="pay-form__button pay-form__button--input"
        onClick={() => {
          this.setState({currentButton: -1})
          this.inputRef.current && this.inputRef.current.focus()
        }}
      >
        {this.renderInputAmount()}
      </div>
    ]


    return (
      <div className="pay-form__container">
        <div className="pay-form">
          {/* <div className="pay-form__h1">
            Поддержите фестиваль
          </div> */}

          <div className="pay-form__buttons-row">
            {buttonsMapped.slice(0, 3)}
          </div>
          <div className="pay-form__buttons-row">
            {buttonsMapped.slice(3)}
          </div>

          <div className="pay-form__input-row">
            <Input
              email
              error={this.state.wrongEmail}
              className="pay-form__Input--email"
              value={this.state.email}
              onChange={value => this.setState({
                email: value,
                wrongEmail: false
              })}
              placeholder="e-mail*"
            />          
            <Input
              className="pay-form__Input--name"
              value={this.state.name}
              onChange={value => this.setState({name: value})}
              placeholder="имя"
            />          
          </div>

          <div className="pay-form__input-row">
            <div
              className="pay-form__button pay-form__button--submit"
              onClick={() => this.pay()}
            >
              поддержать
            </div>
            <div className="pay-form__small-text">
              Нажимая кнопку «поддержать», я соглашаюсь с условиями и принимаю <ExternalLink newTab to="https://tochkadostupa.spb.ru/oferta">публичную оферту</ExternalLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}