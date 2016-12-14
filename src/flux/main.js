import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import UnsplashAlbum from '@flux/pages/unsplash-album'

class Flux extends Component {

  render() {
    return (
      <main>
        <h1>
          Flux Architecture
          <img className="flux-logo"
            src="https://facebook.github.io/flux/img/flux_logo.svg"
            width="50" height="50"
            data-pin-nopin="true"/>
        </h1>
        <UnsplashAlbum />
      </main>
    )
  }
}


ReactDOM.render(
  <Flux name="Lyons" />,
  document.getElementById('container')
)

