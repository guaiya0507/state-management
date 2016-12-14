import React, { Component } from 'react'


export default class Albums extends Component {

  render() {
    const { username, profile_image: {small}} = this.props
    return (
      <a className="user" href={`https://unsplash.com/@${username}`} target="__blank">
        <img className="user-avatar" src={small}></img>
        <span className="user-name">{username}</span>
      </a>
    )
  }
}
