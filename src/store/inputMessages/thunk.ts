import { createAsyncThunk } from '@reduxjs/toolkit'
import apiInstance from '../../utils/api-instance'
import { AxiosResponse } from 'axios'
import { IChatQuickView } from '../../Components/ChatQuickView/types'

export const getUserConversations = createAsyncThunk(
  'GET_CONVERSATIONS',
  async () => {
    const response: AxiosResponse<IChatQuickView[]> = await apiInstance.get(
      '/conversations'
    )
    return response.data
  }
)
