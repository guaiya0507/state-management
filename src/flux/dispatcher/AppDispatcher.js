import { Dispatcher } from 'flux'

import AppConstants from '@flux/constants/AppConstants'

const AppDispatcher = new Dispatcher()

AppDispatcher.handleViewAction = function (action) {
  const payload = {
    source: AppConstants.VIEW_ACTION,
    action,
  }
  this.dispatch(payload)
}

AppDispatcher.handleServerAction = function (action) {
  const payload = {
    source: AppConstants.SERVER_ACTION,
    action,
  }
  console.log('handleServerAction', payload)
  this.dispatch(payload)
}

export default AppDispatcher
