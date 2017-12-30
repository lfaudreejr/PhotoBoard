import * as funcs from '../core/user-funcs'

let userPins

export function loadUsersPins () {
  return new Promise((resolve, reject) => {
    if (userPins) resolve(userPins)
    else {
      funcs.getUserPins()
      .then((data) => {
        userPins = data
        resolve(userPins)
      })
      .catch((err) => reject(err))
    }
  })
}
