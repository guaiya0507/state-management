import React, { Component } from 'react'

import AlbumItem from '@components/albums/item'


export default class Albums extends Component {

  renderList = () => this.props.albums.map(
    (album, index) => <AlbumItem
      {...album}
      key={album.id}
      index={index}
      updateSelectIndex={this.props.updateSelectIndex}
      select={index === this.props.selectIndex}/>
  )

  render() {
    return (
      <div className="albums">
        {this.renderList()}
      </div>
    )
  }
}
