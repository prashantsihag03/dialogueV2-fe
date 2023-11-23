import { Box } from '@mui/system'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { ChatQuickView } from './ChatQuickView'
import { IChatQuickView } from './types'

export default {
  title: 'Molecules/ChatQuickView',
  component: ChatQuickView,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'A quick view of a particular chat. This provides a quick glance at important information about a particular chat.',
      },
    },
  },
} as ComponentMeta<typeof ChatQuickView>

interface Args extends IChatQuickView {
  /**
   * Non component control. Only applicable to story.
   * Sets the width of the component wrapper.
   * Actual component takes width from parent and is set to 100%.
   */
  width: number
}

export const Main = (args: Args) => {
  return (
    <Box sx={{ width: `${args.width}px` }}>
      <ChatQuickView {...args} />
    </Box>
  )
}

Main.args = {
  conversationId: 'steverogers',
  conversationName: 'Steve Rogers',
  unseen: 1,
  lastMessageTime: '9:13',
  lastMessage:
    'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.',
  width: 450,
}
