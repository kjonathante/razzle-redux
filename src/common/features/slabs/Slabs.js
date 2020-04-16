import React from 'react'
import { connect } from 'react-redux'
import { getSlab } from './slabsSlice'

const mapStateToProps = (state) => ({ slabs: state.slabs })

const Slabs = (props) => {
  return (
    <div>
      <p>{props.slabs.isFetching && 'Fetching ...'}</p>
      <p>
        {props.slabs.error &&
          props.slabs.error.message &&
          `Error: ${props.slabs.error.message}`}
      </p>
      <button onClick={props.getSlab}>Search</button>
      <ul>
        {props.slabs.result &&
          props.slabs.result.map((element, idx) => (
            <li key={idx}>{element.description}</li>
          ))}
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, { getSlab })(Slabs)
