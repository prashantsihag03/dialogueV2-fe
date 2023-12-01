import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigState {
  greet: boolean
  runGuidedTour: boolean
  showGuidedTourFinishedDialog: boolean
}

const initialState: ConfigState = {
  greet: true,
  runGuidedTour: false,
  showGuidedTourFinishedDialog: false,
}

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    setGreet: (state, action: PayloadAction<boolean>) => {
      state.greet = action.payload
    },
    setRunGuidedTour: (state, action: PayloadAction<boolean>) => {
      state.runGuidedTour = action.payload
    },
    setShowGuidedTourFinishedDialog: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showGuidedTourFinishedDialog = action.payload
    },
  },
})

export const { setGreet, setRunGuidedTour, setShowGuidedTourFinishedDialog } =
  configSlice.actions
export const configReducer = configSlice.reducer
