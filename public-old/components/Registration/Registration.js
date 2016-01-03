import React, {Component} from 'react'
import _ from 'underscore'
import autobind from 'autobind-decorator'
import $ from 'jquery'

// Components
import Icon from '../Icon'
import Input from '../Input'

// TODO use this
import User from '../../../shared/user-registration.js'

@autobind
export default class Registration extends Component {
  constructor(props) {
    super(props)
    // TODO generate state properties from user-registration.js
    this.state = {
      email: null,
      name: null,
      username: null,
      password: null,
      confirmPassword: null,
      timestamp: Date.now()
    }
  }

  empty() {
    this.setState({
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      timestamp: Date.now()
    })
  }



  // ==== PASSWORD ====
  handlePasswordInput(event) {
    if(!_.isEmpty(this.state.confirmPassword)){
      this.refs.passwordConfirm.isValid()
    }
    this.refs.passwordConfirm.hideError()
    this.setState({
      password: event.target.value
    })
  }

  handleConfirmPasswordInput(event) {
    this.setState({
      confirmPassword: event.target.value
    })
  }

  isConfirmedPassword(event) {
    return (event == this.state.password)
  }


  // ==== NAME ====
  handleNameInput(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleUNameInput(event) {
    this.setState({
      username: event.target.value
    })
  }


  // ==== EMAIl ====
  handleEmailInput(event){
    this.setState({
      email: event.target.value
    })
  }

  validateEmail(event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(event)
  }

  validatePassword(e) {
    return /.{8,}/.test(e)
  }

  // For validate in Name
  isEmpty(value) {
    return !_.isEmpty(value)
  }

  // updateStatesValue(value) {
  //   this.setState({
  //     statesValue: value
  //   })
  // }

  saveAndContinue(e) {
    e.preventDefault()

    var canProceed = this.validateEmail(this.state.email)
        && !_.isEmpty(this.state.name)
        && !_.isEmpty(this.state.username)
        && this.refs.password.isValid()
        && this.refs.passwordConfirm.isValid()

    if(canProceed) {
      this.postForm()
    }
    // else {
    //
    //   this.refs.email.isValid()
    //   this.refs.name.isValid()
    //   this.refs.password.isValid()
    //   this.refs.passwordConfirm.isValid()
    // }
  }

  postForm() {
    let data = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/user/register',
      data: data,
      success: function(data, status, jqXHR) {
        console.log('data:', data)
        if (status === 'success') {

          if (data.message === 'Username already exists') {
            alert('Username already exists!')
          } else if (data.message === 'Email already exists') {
            alert('Email already exists!')
          } else {
            alert(`Thank you ${this.state.username} for signing up!`)
            this.empty()
          }
        }
      }.bind(this)
    })
  }

  render() {
    return (
    <form
      style={{width: '450px'}}
      onSubmit={this.saveAndContinue}
      key={this.state.timestamp}
    >
      <Input
          text="Email Address"
          ref="email"
          type="text"
          defaultValue={this.state.email}
          validate={this.validateEmail}
          value={this.state.email}
          onChange={this.handleEmailInput}
          errorMessage="Email is invalid"
          emptyMessage="Email can't be empty"
          errorVisible={this.state.showEmailError}
      />

      <Input
        text="Name"
        ref="companyName"
        validate={this.isEmpty}
        value={this.state.name}
        onChange={this.handleNameInput}
        emptyMessage="name can't be empty"
      />

      <Input
        text="Username"
        ref="username"
        validate={this.isEmpty}
        value={this.state.username}
        onChange={this.handleUNameInput}
        emptyMessage="username can't be empty"
      />

      <Input
        text="Password (8 char. or more)"
        type="password"
        ref="password"
        validate={this.validatePassword}
        value={this.state.passsword}
        emptyMessage="Password is invalid"
        onChange={this.handlePasswordInput}
      />

      <Input
        text="Confirm password"
        ref="passwordConfirm"
        type="password"
        validate={this.isConfirmedPassword}
        value={this.state.confirmPassword}
        onChange={this.handleConfirmPasswordInput}
        emptyMessage="Please confirm your password"
        errorMessage="Passwords don't match"
      />

      <button style={{display: 'block', position: 'relative', width: '100%', height: '50px', border: '0'}}
        type="submit"
        className="button button_wide">
        CREATE ACCOUNT
      </button>
    </form>
    )
  }
}