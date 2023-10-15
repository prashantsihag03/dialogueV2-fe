import { Box } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { Profile } from './Profile'

export default {
  title: 'Organisms/Profile',
  component: Profile,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as ComponentMeta<typeof Profile>

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
      }}
    >
      <Profile userid="steverogers" />
    </Box>
  )
}

Main.args = {
  width: 450,
  height: 900,
}
