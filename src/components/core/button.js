import React, { Component, PropTypes } from 'react'
import isFunction from 'lodash.isfunction'


export default class Button extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render() {
    return (
      <button className="dabbie-button" onClick={() => {
        const { disabled, onClick } = this.props
        if (!disabled && isFunction(onClick)) {
          onClick()
        }
      }}>{this.props.children}</button>
    )
  }
}


