import React, { Component } from 'react'
import isFunction from 'lodash.isfunction'

import { fresh, updateSelectIndex } from '@flux/actions/UnsplashActions'
import UnsplashStore from '@flux/stores/UnsplashStore'

import Button from '@components/core/button'
import Albums from '@components/albums'
import Unsplash from '@components/unsplash'


require('@components/core/index.scss')
require('@components/albums/index.scss')
require('@components/unsplash/index.scss')
require('@flux/pages/unsplash-album/index.scss')

export default class UnsplashAlbum extends Component {

  constructor(props) {
    super(props)
    this.state = { albums: [], selectIndex: -1 }
  }

  // invoked immediately after a component is mounted. 
  componentDidMount() {
    UnsplashStore.addAlbumsChangeListener(this.update)
    UnsplashStore.addAlbumsSelectIndexChangeListener(this.update)
    if (isFunction(fresh)) {
      fresh()
    }
  }

  // invoked immediately before a component is unmounted & destroyed. 
  componentWillUnmount() {
    UnsplashActions.removeAlbumsChangeListener(this.update)
    UnsplashActions.removeAlbumsSelectIndexChangeListener(this.update)
  }

  handlePrevBtnClick = () => {
    const { albums, selectIndex } = this.state
    updateSelectIndex(0 >= selectIndex ? albums.length-1 : selectIndex-1)
  }

  handleNextBtnClick = () => {
    const { albums, selectIndex } = this.state
    updateSelectIndex(albums.length > (selectIndex+1) ? selectIndex+1 : 0)
  }

  renderDetail = () => {
    if (this.state.selectIndex < 0) {
      return null
    }
    const { albums, selectIndex } = this.state
    return (
      <div className="unsplash-albums-detail">
        <div className="opt">
          <Button onClick={this.handlePrevBtnClick}>上一张</Button>
          <Button onClick={this.handleNextBtnClick}>下一张</Button>
        </div>
        <Unsplash {...albums[selectIndex]}/>
      </div>
    )
  }

  render() {
    return (
      <div className="unsplash-albums">
        <Albums { ...this.state } updateSelectIndex={updateSelectIndex} />
        {this.renderDetail()}
      </div>
    )
  }

  update = () => this.setState({
    albums: UnsplashStore.getAlbums(),
    selectIndex: UnsplashStore.getSelectIndex(),
  })
}
