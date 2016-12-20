// Observable
import mobx, { observable, autorun } from 'mobx'


class DataStore {
  @observable name = 'solome'
  @observable email = 'solome@outlook.com'

  constructor() {
    autorun(this.report)
  }

  report = () => {
    console.log(this.name, this.email)
  }
}

const dataStore = new DataStore()
dataStore.name = 'lyons'


const userInfo = observable({name: 'hell0'})
autorun(() => console.log(userInfo))

userInfo.name = 'solome'
