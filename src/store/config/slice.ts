import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigState {
  greet: boolean
  runGuidedTour: boolean
}

const initialState: ConfigState = {
  greet: true,
  runGuidedTour: false,
}

const configSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setGreet: (state, action: PayloadAction<boolean>) => {
      state.greet = action.payload
    },
    setRunGuidedTour: (state, action: PayloadAction<boolean>) => {
      state.runGuidedTour = action.payload
    },
  },
})

export const { setGreet, setRunGuidedTour } = configSlice.actions
export const configReducer = configSlice.reducer
