import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class MobX extends Component {

  render() {
    return (
      <main>
        <h1>
          MobX
          <img className="mobx-logo"
          src="https://mobxjs.github.io/mobx/getting-started-assets/images/mobservable.png"
          width="50" height="50"
          data-pin-nopin="true"/>
          <span>a simple, scalable and battle tested state management solution.</span>
        </h1>
      </main>
    )
  }
}

ReactDOM.render(
   <MobX name="Lyons" />,
  document.getElementById('container')
)

