import React, { Component } from 'react'
import FMUI, { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
import autobind from 'autobind-decorator'
import $ from 'jquery'


@autobind
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false
    }
    this.errorMessages = {
      wordsError: 'Please fill in the entire form'
    }
  }
  enableButton() {
    this.setState({
      canSubmit: true
    })
  }
  disableButton() {
    this.setState({
      canSubmit: false
    })
  }
  submitForm(model) {
    console.log('model: ' + JSON.stringify(model))
  }

  render() {
    let { wordsError } = this.errorMessages
    return (
      <Formsy.Form
        onValid = {this.enableButton}
        onInvalid = {this.disableButton}
        onValidSubmit = {this.submitForm}>

        <FormsyText style={{display: 'block'}}
          name = 'emailOrUsername'
          validationError = {wordsError}
          required hintText = "What is your Email or Username?"
          floatingLabelText = "Email or Username"
        />

        <FormsyText style={{display: 'block'}}
          name = 'password'
          validationError = {wordsError}
          required hintText = "What is your password?"
          floatingLabelText = "Password"
        />

        <RaisedButton
          type = "submit"
          label = "Submit"
          disabled = {!this.state.canSubmit}
          />
      </Formsy.Form>
    )
  }
}
