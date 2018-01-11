import { combineReducers }      from 'redux'

import { dataReducer }  from './dataReducer'
import { uiReducer }  from './uiReducer'

const rootReducer = combineReducers({
  userData: dataReducer,
  uiState: uiReducer
})

export default rootReducer
