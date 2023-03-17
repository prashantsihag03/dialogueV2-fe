import { Box } from '@mui/system'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { IMessage, Message } from './Message'

export default {
  title: 'Molecules/Message',
  component: Message,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'A component used for displaying a message sent on this platform including timestamp, username, and user profile picture.',
      },
    },
  },
} as ComponentMeta<typeof Message>

interface Args extends IMessage {
  /**
   * Non component control. Only applicable to story.
   * Sets the width of the component wrapper.
   * Actual component takes width from parent and is set to 100%.
   */
  width: number
}

const Template: ComponentStory<React.FC<Args>> = (args: Args) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: `${args.width}px`,
          margin: 'auto',
          backgroundColor: 'background.paper',
        }}
      >
        <Message {...args} />
      </Box>
    </Box>
  )
}

export const Incoming = Template.bind({})
Incoming.args = {
  name: 'Steve Rogers',
  timeStamp: '9:13',
  source: 'incoming',
  text: 'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.',
  width: 450,
}

export const Outgoing = Template.bind({})
Outgoing.args = {
  name: 'Steve Rogers',
  timeStamp: '9:13',
  source: 'outgoing',
  text: 'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.',
  width: 450,
}
