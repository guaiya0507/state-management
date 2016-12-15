import 'whatwg-fetch'
import { EventEmitter } from 'events'

import AppDispatcher from '@flux/dispatcher/AppDispatcher'
import AppConstants from '@flux/constants/AppConstants'

// stores
let albums = []
let albumsSelectIndex = -1
let errMsg = ''

const ALBUMS_CHANGE_EVENT = 'albums_change'
const ALBUMS_SELECT_INDEX_CHANGE = 'albums_select_index_change'

const fetchAlbums = () => {
  fetch('./unsplash.json')
    .then(response => response.json())
    .then(data => {
      albums = data
      albumsSelectIndex = albums.length > 0 ? 0 : -1
      UnsplashStore.emitAlbumsChange()
    })
    .catch(err => {
      console.log(err)
      errMsg = err
    })
}

const UnsplashStore = Object.assign({}, EventEmitter.prototype, {
  getAlbums: () => albums,
  emitAlbumsChange: function () { this.emit(ALBUMS_CHANGE_EVENT) },
  addAlbumsChangeListener: function (fn) { this.on(ALBUMS_CHANGE_EVENT, fn) },
  removeAlbumsChangeListener: function (fn) { this.removeListener(ALBUMS_CHANGE_EVENT, fn) },

  getSelectIndex: () => albumsSelectIndex,
  emitAlbumsSelectIndexChange: function () { this.emit(ALBUMS_SELECT_INDEX_CHANGE) },
  addAlbumsSelectIndexChangeListener: function (fn) { this.on(ALBUMS_SELECT_INDEX_CHANGE, fn) },
  removeAlbumsSelectIndexChangeListener: function (fn) { this.removeListener(ALBUMS_SELECT_INDEX_CHANGE, fn) },
})

AppDispatcher.register(function (payload) {
  const action = payload.action
  switch(action.type) {
    case AppConstants.UNSPLASH_FRESH: {
      fetchAlbums()
    }
    break
    case AppConstants.UNSPLASH_ALBUMS_SELECT_INDEX: {
      if (action.index >= 0 && action.index < albums.length) {
        albumsSelectIndex = action.index
        UnsplashStore.emitAlbumsSelectIndexChange()
      }
    }
    break

    default: // no opt
  }
})

export default UnsplashStore
