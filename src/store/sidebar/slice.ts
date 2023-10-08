import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SIDEBAR_TYPE = 'profile' | 'chats'

interface ISideBarState {
  activeSideBar: SIDEBAR_TYPE
}

const initialState: ISideBarState = {
  activeSideBar: 'chats',
}

const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState: initialState,
  reducers: {
    setActiveSideBar: (state, action: PayloadAction<SIDEBAR_TYPE>) => {
      state.activeSideBar = action.payload
    },
  },
})

export const { setActiveSideBar } = sideBarSlice.actions
export const sideBarReducer = sideBarSlice.reducer
