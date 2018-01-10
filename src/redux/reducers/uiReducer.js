import {
  TOGGLE_MODAL_ADD
}                          from "../constants/constants"

const default_state = {
  modalAddShow: false,
  modalCreateShow: false
}

export function uiReducer(state = default_state, action) {
  switch (action.type) {
    case TOGGLE_MODAL_ADD:
      return {
        ...state, ...{modalAddShow: !state.modalAddShow}
      }
    default:
      return state
  }
}
