/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChatQuickView } from '../../Components/ChatQuickView/types'

export interface IProfileData {
  id: string
  fullname: string
  profileImgSrc: string
  lastOnlineUTCDateTime: string
}

export interface IMessageData {
  messageId: string
  senderUserId: string
  timestamp: string
  source: 'outgoing' | 'incoming'
  text: string
}

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getChats: builder.query<IChatQuickView[], void>({
      query: () => '/conversations',
    }),
    getProfile: builder.query<IProfileData, string | undefined>({
      query: (userid: string | undefined) => {
        if (userid) return `/profile/${userid}`
        return `/profile`
      },
    }),
    getMessages: builder.query<IMessageData[], void>({
      query: () => '/messages',
    }),
  }),
})

export const { useGetChatsQuery, useGetProfileQuery, useGetMessagesQuery } =
  apiSlice
