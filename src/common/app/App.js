import React from 'react'
import Items from '../features/items/Items'
import Slabs from '../features/slabs/Slabs'

const App = () => (
  <>
    <h1>Hello World</h1>
    <Items someName={{ property: 'value' }} />
    <Slabs />
  </>
)

export default App
