export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export function getUserInfo( username ) {
  return {
    type: USER_LOGIN,
    payload: { username } 
  }
}

export function userLogout(){
  return{
    type: USER_LOGOUT,
  }
}
