import React, { Component } from 'react'

import User from '@components/albums/user'
import isFunction from 'lodash.isfunction'

export default class AlbumsItem extends Component {

  constructor(props) {
    super(props)
    this.state = { selected: Boolean(props.select)}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: Boolean(nextProps.select) })
  }

  handleSelectMouse = status => {
    if (Boolean(this.props.select)) {
      return
    }
    this.setState({ selected: status })
  }

  handleSelectClick = () => {
    const { updateSelectIndex } = this.props
    if (isFunction(updateSelectIndex)) {
      updateSelectIndex(this.props.index)
    }
  }

  renderSelect = () => {
    const selected = Boolean(this.props.select)

    return (
      <span className={`select ${selected ? 'selected' : ''}`}
        onMouseEnter={() => this.handleSelectMouse(true)}
        onMouseLeave={() => this.handleSelectMouse(false)}
        onClick={this.handleSelectClick}>
        {selected ? 'selected' : 'select'}
      </span>
    )
  }

  render() {
    const { created_at, id, height, width, urls: { small }, user } = this.props
    const { selected } = this.state

    return (
      <ul className={`album${selected ? ' album-selected' : ''}`}>
        <li className="album-item"><User { ...user } /></li>
        <li className="album-item"><b>ID:</b>{id}</li>
        <li className="album-item"><b>创建日期:</b>{created_at}</li>
        <li className="album-item"><b>Size:</b>{height}×{width} {this.renderSelect()}</li>
      </ul>
    )
  }
}
