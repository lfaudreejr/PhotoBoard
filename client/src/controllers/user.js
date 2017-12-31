import { authNotifier } from '../authentication/AuthService'

export let user = null

authNotifier.on('profileChange', (state) => {
  user = state.currentUser
})

