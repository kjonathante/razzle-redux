import express from 'express'

let server = require('./server').default
console.log('server', server)

if (module.hot) {
  module.hot.accept('./server', function () {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      server = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = process.env.PORT || 3000

export default express()
  .use(async (req, res) => {
    const app = await server()
    app.handle(req, res)
  })
  .listen(port, function (err) {
    if (err) {
      console.error(err)
      return
    }
    console.log(`> Started on port ${port}`)
  })
