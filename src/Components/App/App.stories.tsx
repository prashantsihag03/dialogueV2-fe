import { Box } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { App } from './App'

export default {
  title: 'App',
  component: App,
  decorators: [baseCustomDecorator],
} as ComponentMeta<typeof App>

export const Main = () => {
  return (
    <Box
      sx={{
        height: '90vh',
        width: '100%',
        margin: '0',
        position: 'absolute',
        top: '0',
      }}
    >
      <App />
    </Box>
  )
}
