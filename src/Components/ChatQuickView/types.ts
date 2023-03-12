export interface IChatQuickView {
  /**
   * Name of the chat. This could be a person with who signed in
   * user has previously created a chat with or a group chat.
   */
  name: string

  /**
   * Text representing most recent message sent in a particular chat.
   * This could be from either party or anyone from the group chat.
   */
  lastMessage: string

  /**
   * Number of text messages signed in user has not seen in a particular chat.
   */
  unseen: number

  /**
   * Timestamp of the lastMessage in following format.
   * If the message was send
   * - today, then actual 24h time e.g. 9:13
   * - yesterday, then just "yest"
   * - anytime before yesterday, date followed by first
   * three letter of the month. e.g. 21 Jan, 01 Sep
   */
  lastMessageTime: string
}
