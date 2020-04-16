import { combineReducers } from 'redux'
import itemsReducer from '../features/items/itemsSlice'
import slabsReducer from '../features/slabs/slabsSlice'

export default combineReducers({
  items: itemsReducer,
  slabs: slabsReducer,
})
