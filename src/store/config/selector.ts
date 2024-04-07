import { RootState } from '..'

export const getGreet = (state: RootState) => state.config.greet

export const getRunGuidedTour = (state: RootState) => state.config.runGuidedTour

export const showGuidedTourFinishedDialog = (state: RootState) =>
  state.config.showGuidedTourFinishedDialog

export const isConversationViewCompact = (state: RootState) =>
  state.config.compactConversationView
