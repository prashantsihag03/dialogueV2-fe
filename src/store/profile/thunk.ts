import { createAsyncThunk } from '@reduxjs/toolkit'
import apiInstance from '../../utils/api-instance'
import { AxiosResponse } from 'axios'
import { MyProfileData } from './slice'

export const getMyProfile = createAsyncThunk('GET_MY_PROFILE', async () => {
  const response: AxiosResponse<MyProfileData> = await apiInstance.get(
    '/profile'
  )
  return response.data
})
