import { Box } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { App } from './App'

export default {
  title: 'Pages/App',
  component: App,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'The home page for YourChatsV2-FE where users will be able to view and receive messages, manage their accounts, and receive notifications.',
      },
    },
  },
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
