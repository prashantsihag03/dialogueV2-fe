/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChatQuickView } from '../../Components/ChatQuickView/types'

export interface IProfileData {
  id: string
  fullname: string
  profileImgSrc: string
  lastOnlineUTCDateTime: string
  bio: string
}

export interface IMessageData {
  messageId: string
  senderUserId: string
  timestamp: string
  source: 'outgoing' | 'incoming'
  text: string
}

export interface IMessagePostBody extends IMessageData {
  conversationId: string
}

export interface ConversationAttributes {
  isGroup: boolean
  conversationUserId: string
  conversationName?: string
}

export interface ISearchUser {
  id: string
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
    createConversation: builder.mutation<string, ConversationAttributes>({
      query: (body) => ({
        url: `/conversations`,
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<IProfileData, string | undefined>({
      query: (userid: string | undefined) => {
        if (userid) return `/profile/${userid}`
        return `/profile`
      },
    }),
    getMembers: builder.query<string[], string | undefined>({
      query: (conversationId: string) => {
        return `/conversations/${conversationId}/members`
      },
    }),
    getMessages: builder.query<IMessageData[], string>({
      query: (conversationId: string) =>
        `/conversations/${conversationId}/messages`,
    }),
    sendMessage: builder.mutation<string, IMessagePostBody>({
      query: (body) => ({
        url: `/conversations/message`,
        method: 'POST',
        body: {
          ...body,
          source: 'outgoing',
        },
      }),
    }),
    searchUser: builder.query<ISearchUser[], string>({
      query: (userid: string) => `/user/search/${userid}`,
    }),
  }),
})

export const {
  useGetChatsQuery,
  useGetProfileQuery,
  useGetMessagesQuery,
  useSearchUserQuery,
  useCreateConversationMutation,
  useGetMembersQuery,
  useSendMessageMutation,
} = apiSlice
