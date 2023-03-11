import { Box } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { Chats } from './Chats'

export default {
  title: 'Chats',
  component: Chats,
  decorators: [baseCustomDecorator],
} as ComponentMeta<typeof Chats>

interface Args {
  width: number
}

export const Main = (args: Args) => {
  return (
    <Box sx={{ width: `${args.width}px` }}>
      <Chats />
    </Box>
  )
}

Main.args = {
  width: 450,
}
