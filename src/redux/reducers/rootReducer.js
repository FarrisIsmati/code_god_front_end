import { combineReducers }      from 'redux'

import { userReducer }  from './userReducer'
import { uiReducer }  from './uiReducer'

const rootReducer = combineReducers({
  userData: userReducer,
  uiState: uiReducer
})

export default rootReducer
