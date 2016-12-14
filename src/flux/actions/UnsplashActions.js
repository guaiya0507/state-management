import AppDispatcher from '@flux/dispatcher/AppDispatcher'
import AppConstants from '@flux/constants/AppConstants'


export function fresh() {
  AppDispatcher.handleServerAction({
    type: AppConstants.UNSPLASH_FRESH,
  })
}

export function updateSelectIndex(index) {
  AppDispatcher.handleViewAction({
    type: AppConstants.UNSPLASH_ALBUMS_SELECT_INDEX,
    index,
  })
}
