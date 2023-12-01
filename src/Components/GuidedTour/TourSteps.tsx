import { Step } from 'react-joyride'

const convoBoxRightTourWidth = '290px'

const TourSteps: Step[] = [
  // App tour
  {
    target: '.chatbox-joyride',
    content: (
      <p>
        This is a conversation box. Selected conversation will appear here. We
        will see how that looks soon.
      </p>
    ),
    disableBeacon: true,
    placement: 'right',
    styles: {
      options: {
        width: convoBoxRightTourWidth,
      },
    },
  },
  {
    target: '.sidebar-joyride',
    content: (
      <p style={{ fontSize: '1rem' }}>
        This is a default sidebar. It shows list of all conversations you have.
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
        This sorts the list below by the time when the last message was
        received.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.search-in-list-conversation',
    content: (
      <p>This can help you find conversations that you have by their name.</p>
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
          them! Please click on the icon to proceed further.
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
        You can find users using this. Lets search a user. Please type
        <i> prashant </i>in the below input field and press enter.
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
        This is one of the user that matches your search term. Please click on
        the username to proceed further.
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
  // create conversation - create user convo
  {
    target: '.create-convo-btn',
    content: (
      <p>
        Clicking this will create the conversation. Please click the below
        button to proceed further.
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
  // conversation list part 2
  {
    target: '.first-conversation-quickview-joyride',
    content: (
      <p>
        This is a quick view of one of the conversation you have. Please click
        on this conversation to proceed further.
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
        Selected conversation will open here. You can manage and engage in the
        conversation from here.
      </p>
    ),
    disableBeacon: true,
    hideBackButton: true,
    placement: 'right',
    styles: {
      options: {
        width: convoBoxRightTourWidth,
      },
    },
  },
  {
    target: '.conversation-box-profile-heading',
    content: (
      <p>
        This tells you which conversation you are currently in. It displays the
        profile picture, name and online status of the user you are in this
        conversation with.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom-start',
  },
  {
    target: '.conversation-box-header-options',
    content: (
      <p>
        You can manage media files, create a audio-only or video call from here.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.message-input-box',
    content: (
      <p>
        This is a message input box. <br />
        You can type and send text, audio files, and other supported files from
        your local file system.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.message-input-box',
    content: (
      <p>
        NOTE: <br />
        Please feel free to send a feedback message to me straight from here.
      </p>
    ),
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.latest-message-container',
    content: (
      <p>
        This is a message. It shows the message text, when it was sent,
        sender&apos;s profile picture and their userid.
      </p>
    ),
    disableBeacon: true,
    placement: 'right',
    styles: {
      options: {
        width: convoBoxRightTourWidth,
      },
    },
  },
  {
    target: '.conversation-box-conversation-profile-box',
    content: (
      <p>
        You can check out this user&apos;s profile by clicking on this. Please
        click on this to proceed further.
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
    content: (
      <p>
        This is profile sidebar. Let&apos;s look into some details on this
        profile.
      </p>
    ),
    disableBeacon: true,
    placement: 'left-start',
  },
  {
    target: '.profile-avatar',
    content:
      "This displays user's profile picture, full name, and their userid.",
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.profile-bio-textfield',
    content: "You can read this user's bio here.",
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.other-profile-options',
    content:
      'You can clear all messages and delete the conversation with this user. You can also block and report this user.',
    disableBeacon: true,
    placement: 'top',
  },
  {
    target: '.logged-in-profile-avatar',
    content: (
      <p>
        This shows your profile picture and your online status. Please click on
        this to proceed further.
      </p>
    ),
    disableBeacon: true,
    placement: 'top',
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
  {
    target: '.profile-email-textfield',
    content: 'You will only see email for your own profile.',
    disableBeacon: true,
    placement: 'top',
    hideBackButton: true,
  },
  {
    target: '.other-profile-options',
    content: 'You can logout and delete your acount from here',
    disableBeacon: true,
    placement: 'top',
  },
  {
    target: '.profile-edit',
    content: (
      <p>
        You can edit your profile from here. This is only available for your own
        profile. Please click on this icon to proceed further.
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
  {
    target: '.profile-fields',
    content: (
      <p>
        You can edit your profile. All fields except userid are now editable and
        you can update the values. Please feel free to update the values if you
        like before moving onto next step.
      </p>
    ),
    disableBeacon: true,
    placement: 'left',
    spotlightClicks: true,
  },
  {
    target: '.profile-save',
    content: (
      <p>
        This will save your profile with the current values. Please click on
        this to proceed further.
      </p>
    ),
    disableBeacon: true,
    placement: 'left',
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
  {
    target: '.profile-sidebar',
    content: (
      <p>You should now be able to see the updated values in your profile.</p>
    ),
    disableBeacon: true,
    placement: 'left',
  },
  {
    target: '.main-menu-conversations-joyride',
    content: <p>Click this to bring conversations list into the sidebar.</p>,
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.main-menu-display-mode-joyride',
    content: <p>Click this to toggle between dark and light mode.</p>,
    disableBeacon: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.settings-joyride',
    content: (
      <p>
        This opens settings sidebar. Please click on this to proceed further.
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
  {
    target: '.setting-sidebar',
    content: (
      <p>
        This is settings sidebar. You can change the application behaviour
        regarding several aspects.
      </p>
    ),
    disableBeacon: true,
    placement: 'left',
    spotlightClicks: false,
  },
]

export default TourSteps
