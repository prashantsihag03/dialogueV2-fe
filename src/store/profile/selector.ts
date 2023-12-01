import { RootState } from '..'

export const getActiveProfileUser = (state: RootState) =>
  state.profile.activeProfileUser

export const getMyProfileData = (state: RootState) =>
  state.profile.myProfile.data

export const isMyProfileDataLoading = (state: RootState) =>
  state.profile.myProfile.isLoading

export const getMyProfileDataError = (state: RootState) =>
  state.profile.myProfile.error

export const isEditingMyProfile = (state: RootState) =>
  state.profile.editingMyProfile
