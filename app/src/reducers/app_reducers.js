import { USER_LOGIN } from '../actions/app_actions'

const INITIAL_STATE = {
  username: ''
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {

    case USER_LOGIN:
      console.log('got called with', action.payload)
      return{...state, username: action.payload.username}

    default: return state
  }

}