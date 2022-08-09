import { iUserState, iStateAction } from "../../types";
import * as actions from "../actionTypes"

export const UserInitialState: iUserState = {
  id: undefined,
  displayName: undefined,
  username: undefined
}

export const UserReducer = (state: iUserState, action: iStateAction): iUserState => {
  switch(action.type) {
    case actions.SET_USER:
      const {id, username, displayName} = action.payload
      return { id, username, displayName }
    default:
      return state
  }
}