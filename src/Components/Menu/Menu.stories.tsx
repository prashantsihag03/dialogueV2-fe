import { Box } from '@mui/system'
import { ComponentMeta } from '@storybook/react'
import useCreateTheme from '../../hooks/useDisplayMode'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { Menu } from './Menu'

export default {
  title: 'Molecules/Menu',
  component: Menu,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'Menu including dark mode toggle, notification, setting and user profile.',
      },
    },
  },
} as ComponentMeta<typeof Menu>

interface Args {
  width: number
}

export const Main = (args: Args) => {
  const { displayMode, toggleDisplayMode } = useCreateTheme()
  return (
    <Box sx={{ width: `${args.width}px`, margin: 'auto' }}>
      <Menu displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
    </Box>
  )
}

Main.args = {
  width: 450,
}
