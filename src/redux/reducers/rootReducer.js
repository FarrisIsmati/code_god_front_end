import { combineReducers }      from 'redux'

import { dataReducer }  from './dataReducer'

const rootReducer = combineReducers({
  userData: dataReducer
})

export default rootReducer
