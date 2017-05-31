import { USER_LOGIN, USER_LOGOUT} from '../actions/app_actions'

const INITIAL_STATE = {
  username: null
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {

    case USER_LOGIN:
      return{...state, username: action.payload.username}

    case USER_LOGOUT:
      return{...state, username: null}

    default: return state
  }

}