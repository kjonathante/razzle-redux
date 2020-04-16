import express from 'express'
import qs from 'qs'
import serialize from 'serialize-javascript'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import fs from 'fs'
import initSqlJs from 'sql.js'

import App from '../common/app/App'
import { configureStore } from '../common/app/store'
// import { fetchCounter } from '../common/api/counter'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

// const sqlite = await initSqlJs()
// const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3')
// const db = new sqlite.Database(filebuffer)

// const server = express()

// server
//   .disable('x-powered-by')
//   .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
// .get('/api/food', (req, res) => {
//   const COLUMNS = [
//     'carbohydrate_g',
//     'protein_g',
//     'fa_sat_g',
//     'fa_mono_g',
//     'fa_poly_g',
//     'kcal',
//     'description',
//   ]
//   const param = req.query.q

//   if (!param) {
//     res.json({
//       error: 'Missing required parameter `q`',
//     })
//     return
//   }

//   // WARNING: Not for production use! The following statement
//   // is not protected against SQL injections.
//   const r = db.exec(`
//   select ${COLUMNS.join(', ')} from entries
//   where description like '%${param}%'
//   limit 100
// `)

//   if (r[0]) {
//     res.json(
//       r[0].values.map((entry) => {
//         const e = {}
//         COLUMNS.forEach((c, idx) => {
//           // combine fat columns
//           if (c.match(/^fa_/)) {
//             e.fat_g = e.fat_g || 0.0
//             e.fat_g = (
//               parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
//             ).toFixed(2)
//           } else {
//             e[c] = entry[idx]
//           }
//         })
//         return e
//       })
//     )
//   } else {
//     res.json([])
//   }
// })
//   .get('/*', (req, res) => {
//     // fetchCounter((apiResult) => {
//     const apiResult = 0
//     // Read the counter from the request, if provided
//     const params = qs.parse(req.query)
//     const counter = parseInt(params.counter, 10) || apiResult || 0
//     const items = [
//       {
//         id: 1,
//         attribute: 'preloaded value #1',
//       },
//     ]

//     // Compile an initial state
//     // const preloadedState = { counter }
//     const preloadedState = { items }

//     // Create a new Redux store instance
//     const store = configureStore(preloadedState)

//     // Render the component to a string
//     const markup = renderToString(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )

//     // Grab the initial state from our Redux store
//     const finalState = store.getState()

//     res.send(`
// <!doctype html>
// <html lang="">
//   <head>
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta charSet='utf-8' />
//     <title>Razzle Redux Example</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     ${
//       assets.client.css
//         ? `<link rel="stylesheet" href="${assets.client.css}">`
//         : ''
//     }
//     ${
//       process.env.NODE_ENV === 'production'
//         ? `<script src="${assets.client.js}" defer></script>`
//         : `<script src="${assets.client.js}" defer crossorigin></script>`
//     }
//   </head>
//   <body>
//     <div id="root">${markup}</div>
//     <script>
//       window.__PRELOADED_STATE__ = ${serialize(finalState)}
//     </script>
// </body>
// </html>
//       `)
//     // })
//   })

async function init() {
  const sqlite = await initSqlJs()
  console.log(__dirname)
  const filebuffer = fs.readFileSync(
    '/Users/kitjonathante/workspace/Razzle/redux-fullstack/src/server/db/usda-nnd.sqlite3'
  )
  const db = new sqlite.Database(filebuffer)
  const server = express()
  return server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/api/food', (req, res) => {
      const COLUMNS = [
        'carbohydrate_g',
        'protein_g',
        'fa_sat_g',
        'fa_mono_g',
        'fa_poly_g',
        'kcal',
        'description',
      ]
      const param = req.query.q

      if (!param) {
        res.json({
          error: 'Missing required parameter `q`',
        })
        return
      }

      // WARNING: Not for production use! The following statement
      // is not protected against SQL injections.
      const r = db.exec(`
    select ${COLUMNS.join(', ')} from entries
    where description like '%${param}%'
    limit 100
  `)

      if (r[0]) {
        res.json(
          r[0].values.map((entry) => {
            const e = {}
            COLUMNS.forEach((c, idx) => {
              // combine fat columns
              if (c.match(/^fa_/)) {
                e.fat_g = e.fat_g || 0.0
                e.fat_g = (
                  parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
                ).toFixed(2)
              } else {
                e[c] = entry[idx]
              }
            })
            return e
          })
        )
      } else {
        res.json([])
      }
    })
    .get('/*', (req, res) => {
      // fetchCounter((apiResult) => {
      const apiResult = 0
      // Read the counter from the request, if provided
      const params = qs.parse(req.query)
      const counter = parseInt(params.counter, 10) || apiResult || 0
      const items = [
        {
          id: 1,
          attribute: 'preloaded value #1',
        },
      ]

      // Compile an initial state
      // const preloadedState = { counter }
      const preloadedState = { items }

      // Create a new Redux store instance
      const store = configureStore(preloadedState)

      // Render the component to a string
      const markup = renderToString(
        <Provider store={store}>
          <App />
        </Provider>
      )

      // Grab the initial state from our Redux store
      const finalState = store.getState()

      res.send(`
  <!doctype html>
  <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Razzle Redux Example</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
    </head>
    <body>
      <div id="root">${markup}</div>
      <script>
        window.__PRELOADED_STATE__ = ${serialize(finalState)}
      </script>
  </body>
  </html>
        `)
      // })
    })
}
export default init
