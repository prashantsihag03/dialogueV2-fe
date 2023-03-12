import { Box } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { MainSection } from './MainSection'

export default {
  title: 'Organisms/MainSection',
  component: MainSection,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'Main section for YourChatsV2-FE providing one major partition and one minor side partition.',
      },
    },
  },
} as ComponentMeta<typeof MainSection>

export const Main = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', margin: '0' }}>
      <MainSection />
    </Box>
  )
}
