import { RootState } from '..'

export const getActiveSideBar = (state: RootState) =>
  state.sideBar.activeSideBar

export const getShowSideDrawer = (state: RootState) =>
  state.sideBar.showSideDrawer

export const getSideBarPreference = (state: RootState) =>
  state.sideBar.sideBarPreference
