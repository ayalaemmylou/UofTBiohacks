import React from 'react'
import PureComponent from 'react-pure-render/component'

import { FormsyText } from 'formsy-material-ui'

export default class PureTextInput extends PureComponent {
  render() {
    const {
      required,
      name,
      validations,
      validationError,
      hintText,
      floatingLabelText,
      type,
      multiLine,
      disabled,
      value
    } = this.props

    return (
    <FormsyText style={{display: 'block'}}
      required={required}
      name={name}
      type={type}
      validations={validations}
      validationError={validationError}
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      disabled={disabled}
      multiLine={multiLine || false}
      value={value}
    />)
  }
}
