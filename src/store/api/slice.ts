/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MyProfileData } from '../profile/slice'

export interface IProfileData {
  id: string
  fullname: string
  email?: string
  profileImg: string
  lastOnlineUTCDateTime: string
  bio: string
}

export interface IMessageData {
  messageId: string
  senderUserId: string
  timestamp: string
  source: 'outgoing' | 'incoming'
  text: string
  img?: File
  file?: string
}

export interface MessagePostResult {
  conversationId: string
  messageId: string
  timeStamp: number
  message: string
  senderId: string
  localMessageId: string
  file?: string
  fileContent?: File
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
  openExistingConversation: boolean
}

export type IUserSetting = {
  key: keyof IUserSettings
  value: unknown
}

export type IUserSettingResponse = {
  [key in keyof IUserSettings]: unknown
}

export interface UpdateProfileBody extends Omit<MyProfileData, 'profileImg'> {
  profileImg?: File
}

export interface GetMsgAttachmentQueryParams {
  conversationId: string
  messageId: string
  attachmentId: string
}

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  tagTypes: ['Profile', 'Conversation', 'Settings'],
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getMessageAttachment: builder.query<string, GetMsgAttachmentQueryParams>({
      query: (params: GetMsgAttachmentQueryParams) => {
        console.log('generating query')
        return `/conversations/${params.conversationId}/messages/${params.messageId}/attachment/${params.attachmentId}`
      },
    }),
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
    updateMyProfile: builder.mutation<void, UpdateProfileBody>({
      query: (body) => {
        const formData = new FormData()
        if (body.profileImg) formData.append('profileImg', body.profileImg)
        formData.append('bio', body.bio)
        formData.append('email', body.email)
        formData.append('fullname', body.fullname)
        formData.append('id', body.id)
        return {
          url: `/profile`,
          method: 'POST',
          body: formData,
        }
      },

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
      query: (body) => {
        const formData = new FormData()
        if (body.img) formData.append('img', body.img)
        formData.append('conversationId', body.conversationId)
        formData.append('localMessageId', body.localMessageId)
        formData.append('messageId', body.messageId)
        formData.append('senderUserId', body.senderUserId)
        formData.append('text', body.text)
        formData.append('timestamp', body.timestamp)
        formData.append('source', body.source)
        return {
          url: `/conversations/message`,
          method: 'POST',
          body: formData,
        }
      },
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
  useGetMessageAttachmentQuery,
} = apiSlice
