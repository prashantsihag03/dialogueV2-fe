import { Box } from '@mui/system'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { ChatQuickView } from './ChatQuickView'
import { IChatQuickView } from './types'

export default {
  title: 'ChatQuickView',
  component: ChatQuickView,
  decorators: [baseCustomDecorator],
} as ComponentMeta<typeof ChatQuickView>

interface Args extends IChatQuickView {
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
  name: 'Steve Rogers',
  unseen: 1,
  lastMessageTime: '9:13',
  lastMessage:
    'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.',
  width: 450,
}
