const obj = new Proxy({}, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`, target)
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, value, receiver) {
    console.log(`setting ${key}!`, target)
    return Reflect.set(target, key, value, receiver)
  },
})


obj.count = 1
++ obj.count
obj.name = 'solome'
