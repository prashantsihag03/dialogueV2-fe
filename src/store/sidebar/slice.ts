import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SIDEBAR_TYPE = 'profile' | 'chats' | 'setting' | 'none'
export type SIDEBAR_PREFERENCE = 'mobile' | 'web'

interface ISideBarState {
  /**
   * Determines which sidebar to show in the sidebar content box
   */
  activeSideBar: SIDEBAR_TYPE
  /**
   * Determines whether to open the side drawer or not. Used in mobile browser to show main menu options
   */
  showSideDrawer: boolean
  sideBarPreference: SIDEBAR_PREFERENCE
}

const initialState: ISideBarState = {
  activeSideBar: 'chats',
  showSideDrawer: false,
  sideBarPreference: 'web',
}

const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState: initialState,
  reducers: {
    setActiveSideBar: (state, action: PayloadAction<SIDEBAR_TYPE>) => {
      state.activeSideBar = action.payload
    },
    setShowSideDrawer: (state, action: PayloadAction<boolean>) => {
      state.showSideDrawer = action.payload
    },
    setSideBarPreference: (
      state,
      action: PayloadAction<SIDEBAR_PREFERENCE>
    ) => {
      state.sideBarPreference = action.payload
    },
  },
})

export const { setActiveSideBar, setShowSideDrawer, setSideBarPreference } =
  sideBarSlice.actions
export const sideBarReducer = sideBarSlice.reducer
