import { Box } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { Chats } from './Chats'

export default {
  title: 'Molecules/Chats',
  component: Chats,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "List of all messages that the signed-in user is part of. All messages are represented by Chat's Quick View",
      },
    },
  },
} as ComponentMeta<typeof Chats>

interface Args {
  width: number
  height: number
}

export const Main = (args: Args) => {
  return (
    <Box
      sx={{
        width: `${args.width}px`,
        height: `${args.height}px`,
        margin: 'auto',
      }}
    >
      <Chats />
    </Box>
  )
}

Main.args = {
  width: 450,
  height: 700,
}
