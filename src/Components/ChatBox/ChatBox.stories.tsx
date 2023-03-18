import { Box } from '@mui/system'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { ChatBox } from './ChatBox'
import { IActiveChatHeader } from './Header/Header'

export default {
  title: 'Molecules/ChatBox',
  component: ChatBox,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'A Header for active chat providing details about chat name,and online status along with access to media shared within this chat so far, ability to create just audio as well as video calls.',
      },
    },
  },
} as ComponentMeta<typeof ChatBox>

interface Args extends IActiveChatHeader {
  /**
   * Non component control. Only applicable to story.
   * Sets the width of the component wrapper.
   * Actual component takes width from parent and is set to 100%.
   */
  width: number
}

export const Main = (args: Args) => {
  return (
    <Box sx={{ width: `${args.width}px`, height: '99%' }}>
      <ChatBox {...args} />
    </Box>
  )
}

Main.args = {
  name: 'Steve Rogers',
  online: true,
  width: 1024,
}
