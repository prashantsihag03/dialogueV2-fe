/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MyProfileData } from '../profile/slice'

export interface IProfileData {
  id: string
  fullname: string
  email?: string
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

export interface MessagePostResult {
  conversationId: string
  messageId: string
  timeStamp: number
  message: string
  senderId: string
  localMessageId: string
}

export interface IMessagePostBody extends IMessageData {
  conversationId: string
  localMessageId: string
}

export interface ConversationAttributes {
  isGroup: boolean
  conversationUserId: string
  conversationName?: string
}

export interface ISearchUser {
  id: string
}

export interface IUserSettings {
  enterSendsMessage: boolean
  greetMeEverytime: boolean
}

export type IUserSetting = {
  key: keyof IUserSettings
  value: unknown
}

export type IUserSettingResponse = {
  [key in keyof IUserSettings]: unknown
}

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  tagTypes: ['Profile', 'Conversation', 'Settings'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    createConversation: builder.mutation<void, ConversationAttributes>({
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
      providesTags: (result, error, args) => {
        // Make sure to provide an array of FullTagDescriptions
        return args
          ? [{ type: 'Profile', id: args }]
          : [{ type: 'Profile', id: 'myProfile' }]
      },
    }),
    updateMyProfile: builder.mutation<void, MyProfileData>({
      query: (body) => ({
        url: `/profile`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Profile', id: 'myProfile' }],
    }),
    getUserSettings: builder.query<IUserSettingResponse, keyof IUserSettings>({
      query: (settingKey) => {
        return `/user/settings/${settingKey}`
      },
      providesTags: (result, error, settingKey) => {
        // Make sure to provide an array of FullTagDescriptions
        return [{ type: 'Settings', id: settingKey }]
      },
    }),
    updateUserSetting: builder.mutation<void, IUserSetting>({
      query: (body) => ({
        url: `/user/settings/${body.key}/${body.value}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { key }) => [
        { type: 'Settings', id: key },
      ],
    }),
    clearConversation: builder.mutation<void, string>({
      query: (body) => ({
        url: `/conversations/${body}/messages`,
        method: 'DELETE',
      }),
    }),
    deleteConversation: builder.mutation<void, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
        method: 'DELETE',
      }),
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
    sendMessage: builder.mutation<MessagePostResult, IMessagePostBody>({
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
  useGetProfileQuery,
  useGetMessagesQuery,
  useSearchUserQuery,
  useCreateConversationMutation,
  useGetMembersQuery,
  useSendMessageMutation,
  useUpdateMyProfileMutation,
  useClearConversationMutation,
  useDeleteConversationMutation,
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
} = apiSlice
