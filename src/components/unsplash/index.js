import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'

export default class Unsplash extends Component {

  constructor() {
    super()
    this.state = { imageStatus: false }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.id !== nextProps.id) {
      this.setState({imageStatus: false})
    }
  }

  renderMask = () => {
    console.log(this.state.imageStatus)
    if (this.state.imageStatus) {
      return null
    }
    return (
      <div className="mask"><i className="fa fa-spinner fa-spin fa-2x fa-fw"></i></div>
    )
  }

  render() {
    const { urls } = this.props
    const { imageStatus } = this.state
    return (
      <div className="unsplash">
        <img className={imageStatus ? '' : 'blur'} src={urls.small} onLoad={() => this.setState({imageStatus: true})}></img>
        {this.renderMask()}
      </div>
    )
  }
}
