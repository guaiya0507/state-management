import https from 'https'
import jsdom from 'jsdom'

const log = console.log

// API https://source.unsplash.com/random
const API_UNSPLASH_RANDOM = 'https://source.unsplash.com/random'

// Callback
function getRandomPhotoCallback(category, callback) {
  https.get(`${API_UNSPLASH_RANDOM}/${category}`,
    res => res.on('data', data => callback(data.toString('ascii')))
  ).on('error', e => log(e))
}

getRandomPhotoCallback('nature',
  html => jsdom.env(
    html, ['http://code.jquery.com/jquery.js'],
    (err, window) => log('Callback', window.$('a')[0].href)
  )
)


// Promise/A+
function getRandomPhotoPromise(category) {
  return new Promise((fulfill, reject) =>
    https.get(`${API_UNSPLASH_RANDOM}/${category}`,
      res => res.on('data', data => fulfill(data.toString('ascii')))
    ).on('error', e => reject(e))
  )
}

getRandomPhotoPromise('food')
  .then(html => new Promise((fulfill, reject) =>
    jsdom.env(
      html, ['http://code.jquery.com/jquery.js'],
      (err, window) => {
        if (err) reject(err)
        else fulfill(window.$('a')[0].href)
    })
  ))
  .then(href => log('Promise/A+', href)).catch(e => log(e))


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
