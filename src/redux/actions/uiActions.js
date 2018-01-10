import {
  TOGGLE_MODAL_ADD
}                          from "../constants/constants"

export function toggleModalAdd(t) {
  return {
    type: TOGGLE_MODAL_ADD,
    t
  }
}
