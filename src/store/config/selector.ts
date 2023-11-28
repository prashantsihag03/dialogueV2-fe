import { RootState } from '..'

export const getGreet = (state: RootState) => state.config.greet

export const getRunGuidedTour = (state: RootState) => state.config.runGuidedTour
