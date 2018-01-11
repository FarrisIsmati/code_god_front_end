import {
  TOGGLE_MODAL_CREATE_SUBTOPIC,
  TOGGLE_MODAL_ADD,
  TOGGLE_MODAL_CREATE
}                          from "../constants/constants"

export function toggleModalCreateSubtopic() {
  return {
    type: TOGGLE_MODAL_CREATE_SUBTOPIC
  }
}

export function toggleModalAdd() {
  return {
    type: TOGGLE_MODAL_ADD
  }
}

export function toggleModalCreate() {
  return {
    type: TOGGLE_MODAL_CREATE
  }
}
