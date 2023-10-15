import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserDetail {
  userId: string
  fullName: string | undefined
}

interface IProfileState {
  /**
   * This is a userid for which profile data will be displayed in the
   * profile component on the sidebar.
   */
  activeProfileUser: UserDetail | undefined
}

const initialState: IProfileState = {
  activeProfileUser: undefined,
}

const profileSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setActiveProfileUserId: (state, action: PayloadAction<UserDetail>) => {
      state.activeProfileUser = action.payload
    },
  },
})

export const { setActiveProfileUserId } = profileSlice.actions
export const profileReducer = profileSlice.reducer
