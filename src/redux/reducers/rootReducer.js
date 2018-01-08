import { combineReducers }    from 'redux'
import getUser                from './userReducer'


const rootReducer = combineReducers({
  userData: getUser
})

export default rootReducer
