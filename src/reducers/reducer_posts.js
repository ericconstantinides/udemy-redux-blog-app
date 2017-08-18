import _ from 'lodash'
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index'

// so reducers always take state and action
// return the new state

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      // take the id out of the state object
      return _.omit(state, action.payload)
    case FETCH_POSTS:
      // let's convert the array to an object
      return _.mapKeys(action.payload.data, 'id')
    case FETCH_POST:
      // in the brackets[] is "key interpolation"
      // this also destructures state and adds in the fetched post
      return {...state, [action.payload.data.id]: action.payload.data}
    default:
      return state
  }
}
