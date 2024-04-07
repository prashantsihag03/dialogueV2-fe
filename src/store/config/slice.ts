import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigState {
  greet: boolean
  runGuidedTour: boolean
  showGuidedTourFinishedDialog: boolean
  compactConversationView: boolean
}

const initialState: ConfigState = {
  greet: true,
  runGuidedTour: false,
  showGuidedTourFinishedDialog: false,
  compactConversationView: false,
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
    setCompactConversationView: (state, action: PayloadAction<boolean>) => {
      state.compactConversationView = action.payload
    },
  },
})

export const { setGreet, setRunGuidedTour, setShowGuidedTourFinishedDialog } =
  configSlice.actions
export const configReducer = configSlice.reducer
