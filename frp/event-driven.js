// event-driven
import EventEmitter from 'events'


class DataStore extends EventEmitter {
  static EVENT_NAME = 'data_store_update'
  _name = 'solome'
  _email = 'solome@outlook.com'

  get name() { return this._name }
  set name(name) {
    this._name = name
    this.emitDataStoreUpdate()
  }

  get email() { return this._email }
  set email(email) {
    this._email = email
    this.emitDataStoreUpdate()
  }

  constructor() {
    super()
    this.addDataStoreUpdateListener()
  }

 emitDataStoreUpdate() {
   this.emit(DataStore.EVENT_NAME)
 }

 report() {
   // notify `this.setState()`
   console.log(this.name, this.email)
 }
 addDataStoreUpdateListener() {
    this.on(DataStore.EVENT_NAME, this.report)
 }
 removeDataStoreUpdateListener() {
   this.removeListener(DataStore.EVENT_NAME, this.report)
 }
}

const dataStore = new DataStore()
dataStore.emitDataStoreUpdate()
// => solome solome@outlook.com
dataStore.name = 'lyons'
// => lyons solome@outlook.com
dataStore.email = 'example@outlook.com'
// => lyons example@outlook.com

dataStore.removeDataStoreUpdateListener()
dataStore.email = 'example@gamil.com'
// none

