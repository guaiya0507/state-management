import https from 'https'
import jsdom from 'jsdom'

const log = console.log
// API https://source.unsplash.com/random
const API_UNSPLASH_RANDOM = 'https://source.unsplash.com/random'


// Generators
async function getRandomPhotoGenerator(category) {
  return new Promise((fulfill, reject) =>
    https.get(`${API_UNSPLASH_RANDOM}/${category}`,
      res => res.on('data', data => fulfill(data.toString('ascii')))
    ).on('error', e => reject(e))
  )
}

const run = async () => {
  const html = await getRandomPhotoGenerator()
  const href = await new Promise((fulfill, reject) =>
    jsdom.env(
      html, ['http://code.jquery.com/jquery.js'],
      (err, window) => {
        if (err) reject(err)
        else fulfill(window.$('a')[0].href)
    })
  )
  console.log('Generators(async/await)', href)
}

run()

function * generatorFunc() {
  yield 1
  yield 2
  yield 3
}

const iter = generatorFunc()
log(iter)
do {
  const result = iter.next()
  log(result)
  if (result.done === true) {
    break
  }
} while(true)


function *foo() {
  console.log('hello')
  yield 10086           // 在此處中斷 coroutine
  console.log('world')
}

const bar = foo()                   // bar 保留 coroutine 内部状态的变量
bar.next()                          // 調用`foo()`函數，遇到 yield 中斷程序調用
console.log('main, not in `foo()`') // 已經從`foo()`函數中跳出來了，可以幹些其它事情
bar.next()                          // 恢復`foo()`的調用，從 yield 中斷處繼續執行
