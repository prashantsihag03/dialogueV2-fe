import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { getMyProfile } from './thunk'

interface ProfileDetail {
  id: string
  name: string | undefined
  isLoggedInUser: boolean
}

export interface MyProfileData {
  id: string
  fullname: string
  email: string
  profileImgSrc: string
  lastOnlineUTCDateTime: string
  bio: string
}

interface MyProfileState {
  isLoading: boolean
  error: SerializedError | undefined
  data: MyProfileData
}

interface IProfileState {
  /**
   * This is a userid for which profile data will be displayed in the
   * profile component on the sidebar.
   */
  activeProfileUser: ProfileDetail | undefined
  myProfile: MyProfileState
  editingMyProfile: boolean
}

const initialState: IProfileState = {
  activeProfileUser: undefined,
  myProfile: {
    isLoading: false,
    data: {
      bio: '',
      email: '',
      fullname: '',
      id: '',
      lastOnlineUTCDateTime: '',
      profileImgSrc: '',
    },
    error: undefined,
  },
  editingMyProfile: false,
}

const profileSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setActiveProfileUserId: (state, action: PayloadAction<ProfileDetail>) => {
      state.activeProfileUser = action.payload
    },
    setEditingMyProfile: (state, action: PayloadAction<boolean>) => {
      state.editingMyProfile = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getMyProfile.fulfilled, (state, { payload }) => {
      state.myProfile.data = {
        ...payload,
      }
      state.myProfile.isLoading = false
      state.myProfile.error = undefined
    })
    builder.addCase(getMyProfile.rejected, (state, { error }) => {
      state.myProfile.isLoading = false
      state.myProfile.error = error
    })
    builder.addCase(getMyProfile.pending, (state) => {
      state.myProfile.data = {
        bio: '',
        email: '',
        fullname: '',
        id: '',
        lastOnlineUTCDateTime: '',
        profileImgSrc: '',
      }
      state.myProfile.isLoading = true
      state.myProfile.error = undefined
    })
  },
})

export const { setActiveProfileUserId, setEditingMyProfile } =
  profileSlice.actions
export const profileReducer = profileSlice.reducer
