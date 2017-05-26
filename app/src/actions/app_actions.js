export const USER_LOGIN = 'USER_LOGIN'

export function getUserInfo( username ) {
  console.log('get user info called with', username)
  return {
    type: USER_LOGIN,
    payload: { username } 
  }
}
