import { RootState } from '..'

export const getActiveProfileUser = (state: RootState) =>
  state.profile.activeProfileUser
