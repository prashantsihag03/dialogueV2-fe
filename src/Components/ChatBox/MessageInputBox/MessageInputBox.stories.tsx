import { Box } from '@mui/system'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../../utils/storybook-utils'
import { MessageInputBox } from './MessageInputBox'

export default {
  title: 'Molecules/MessageInputBox',
  component: MessageInputBox,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'An Input box to write message including options to add attachment, speech, and smileys',
      },
    },
  },
} as ComponentMeta<typeof MessageInputBox>

interface Args {
  /**
   * Non component control. Only applicable to story.
   * Sets the width of the component wrapper.
   * Actual component takes width from parent and is set to 100%.
   */
  width: number
}

export const Main = (args: Args) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          width: `${args.width}px`,
          paddingBottom: '12vh',
        }}
      >
        <MessageInputBox />
      </Box>
    </Box>
  )
}

Main.args = {
  width: 1024,
}
