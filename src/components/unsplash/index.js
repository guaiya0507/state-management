import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'

export default class Unsplash extends Component {

  render() {
    const { urls } = this.props
    return (
      <div className="unsplash">
        <img src={urls.small}></img>
      </div>
    )
  }
}
