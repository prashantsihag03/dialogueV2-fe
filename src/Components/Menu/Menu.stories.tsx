import { Box } from '@mui/system'
import { ComponentMeta } from '@storybook/react'
import useDisplayMode from '../../hooks/useDisplayMode'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { Menu } from './Menu'

export default {
  title: 'Menu',
  component: Menu,
  decorators: [baseCustomDecorator],
} as ComponentMeta<typeof Menu>

interface Args {
  width: number
}

export const Main = (args: Args) => {
  const { displayMode, toggleDisplayMode } = useDisplayMode()
  return (
    <Box sx={{ width: `${args.width}px`, margin: 'auto' }}>
      <Menu displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
    </Box>
  )
}

Main.args = {
  width: 450,
}
