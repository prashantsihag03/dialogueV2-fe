import { Box } from '@mui/system'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../../utils/storybook-utils'
import { Header, IActiveChatHeader } from './Header'

export default {
  title: 'Molecules/ChatBox/Header',
  component: Header,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'A Header for active chat providing details about chat name,and online status along with access to media shared within this chat so far, ability to create just audio as well as video calls.',
      },
    },
  },
} as ComponentMeta<typeof Header>

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
    <Box sx={{ width: `${args.width}px` }}>
      <Header {...args} />
    </Box>
  )
}

Main.args = {
  name: 'Steve Rogers',
  width: 450,
}
