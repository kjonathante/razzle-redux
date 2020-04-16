import React from 'react'
import { connect } from 'react-redux'
import { loadItems } from './itemsSlice'
import Item from './Item'

const mapStateToProps = (state, ownProps) => {
  console.log('Items Component mapStateToProps', state, ownProps)
  return {
    items: state.items,
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   console.log('mapDispatchToProps', typeof dispatch, ownProps)
//   return {
//     loadItems: (...args) => dispatch(loadItems(...args)),
//   }
// }

const Items = (props) => {
  console.log('Items component props', props)
  const { items, loadItems } = props
  return (
    <div>
      {items.map((e) => (
        <Item key={e.id}>{e.attribute}</Item>
      ))}
      <button onClick={loadItems}>Load Items</button>
    </div>
  )
}

// export default connect(mapStateToProps, mapDispatchToProps)(Items)
export default connect(mapStateToProps, { loadItems })(Items)
