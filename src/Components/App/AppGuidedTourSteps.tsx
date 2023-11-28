import { Step } from 'react-joyride'

const AppGuidedTourSteps: Step[] = [
  // App tour
  {
    target: '.chatbox-joyride',
    content: (
      <p>
        This is a conversation box. It will display conversation whenever you
        select one. Currently, no conversation is selected.
      </p>
    ),
    disableBeacon: true,
    placement: 'right',
    styles: {
      options: {
        width: '250px',
      },
    },
  },
  {
    target: '.sidebar-joyride',
    content: (
      <p style={{ fontSize: '1rem' }}>
        This is a default sidebar. Currently its showing list of all
        conversations you have.
      </p>
    ),
    disableBeacon: true,
    placement: 'left-start',
  },
  //   conversations list part 1
  {
    target: '.sort-conversation-joyride',
    content: (
      <p>
        This sorts the below list. You can toggle between ascending and
        descending order by the time when last message was received in the
        conversations.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.search-in-list-conversation',
    content: (
      <p>
        This can help you find a particular conversation by its name in the
        below list.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.create-conversation-icon',
    content: (
      <>
        <p>
          This will let you search other users and create new conversations with
          them! <br />
          <br />
          Please CLICK on the icon to proceed further.
        </p>
      </>
    ),
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
    styles: {
      buttonNext: {
        display: 'none',
      },
    },
  },
  // create conversation - search user convo
  {
    target: '.create-convo-search-userid',
    content: (
      <p>
        You can find users using this. Lets search a user. <br />
        <br /> Please enter &quot;prashant&quot; in the below input field and
        PRESS enter.
      </p>
    ),
    disableBeacon: true,
    spotlightClicks: true,
    placement: 'top',
    hideBackButton: true,
    styles: {
      options: {
        zIndex: 100000,
      },
      buttonNext: {
        display: 'none',
      },
    },
  },
  // create conversation - result user convo
  {
    target: '.first-user-search-result',
    content: (
      <p>
        This is one of the user that matches your search term.
        <br />
        <br />
        Please CLICK it to proceed further.
      </p>
    ),
    disableBeacon: true,
    spotlightClicks: true,
    placement: 'top',
    styles: {
      options: {
        zIndex: 100000,
      },
      buttonNext: {
        display: 'none',
      },
    },
  },
  // create conversation - create user convo
  {
    target: '.create-convo-btn',
    content: (
      <p>
        Clicking this would create the conversation. <br />
        <br />
        Please CLICK this button to proceed further.
      </p>
    ),
    disableBeacon: true,
    spotlightClicks: true,
    placement: 'top',
    styles: {
      options: {
        zIndex: 100000,
      },
      buttonNext: {
        display: 'none',
      },
    },
  },
  // conversation list part 2
  {
    target: '.first-conversation-quickview-joyride',
    content: (
      <p>
        This is a brief and quick view of one of the conversation you have.
        <br />
        <br />
        Please CLICK on this conversation to proceed further.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
    hideBackButton: true,
    styles: {
      buttonNext: {
        display: 'none',
      },
    },
  },
  // conversation box
  {
    target: '.chatbox-joyride',
    content: (
      <p>
        Selected conversation will open here. You can converse with people from
        here and manage your shared assets. Let&apos;s check out some of the
        features.
      </p>
    ),
    disableBeacon: true,
    placement: 'right',
    styles: {
      options: {
        width: '250px',
      },
    },
  },
  {
    target: '.conversation-box-conversation-profile-picture',
    content: (
      <p>
        For one-one conversation, this will be the profile picture of the other
        user. For group conversation, this would be the group&apos;s profile
        picture.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.conversation-box-conversation-name',
    content: (
      <p>
        For one-one conversation, this will be the name of the other user. For
        group conversation, this would be the group name.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.conversation-box-conversation-live-status',
    content:
      'This tells you whether the other user in this conversation is online or offline. You will only see this feature for one-one conversation.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.conversation-box-conversation-media-icon',
    content:
      'This will present all the media files exchanged in this conversation so far in one place.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.conversation-box-conversation-audio-call-icon',
    content:
      'This allows you to create a audio-only call for anyone in this conversation to join in. ',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.conversation-box-conversation-video-call-icon',
    content:
      'This allows you to create a video call for anyone in this conversation to join in. ',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.message-input-box',
    content: 'You can type your message here.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.message-input-box-audio-file',
    content: 'You can generate and send audio files using this.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.message-input-box-attachments',
    content: 'You can attach any files from you local file system from here.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.latest-message-container',
    content: 'This is a message',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.latest-message-profile-picture',
    content: 'This is the profile picture of the user who sent this message.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.latest-message-timestamp',
    content: 'This tells you when this message was sent.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.latest-message-sender-id',
    content:
      'This shows userid of message sender. For you, it will say "you". For other users in this conversation, it will show their user id.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.latest-message-text',
    content: 'This is the message content.',
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.conversation-box-conversation-profile-box',
    content: (
      <p>
        Clicking on this allows you to open this conversation&apos;s profile.
        <br />
        <br />
        Please CLICK on this to proceed further.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 100000,
      },
      buttonNext: {
        display: 'none',
      },
    },
  },
  // Profile
  {
    target: '.profile-sidebar',
    content:
      "This is profile sidebar. It can present profiles for you, other users and groups. Its currently showing profile of the user that we just clicked on. Let's look into some details on this profile.",
    disableBeacon: true,
    placement: 'left-start',
  },
  {
    target: '.profile-fullname-textfield',
    content:
      "This is the other user's full name. For group's profile, this will show group name",
    disableBeacon: true,
    placement: 'left-start',
  },
  {
    target: '.profile-userid',
    content:
      'This shows you the userid of the user whose profile is being displayed.',
    disableBeacon: true,
    placement: 'left-start',
  },
  {
    target: '.other-profile-options',
    content:
      'You can clear all messages and delete the conversation with this user. You can also block and report this user.',
    disableBeacon: true,
    placement: 'top',
  },
]

export default AppGuidedTourSteps
