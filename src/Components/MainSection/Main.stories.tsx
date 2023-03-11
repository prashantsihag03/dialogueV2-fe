import { Box } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { MainSection } from './MainSection'

export default {
  title: 'Main Section',
  component: MainSection,
  decorators: [baseCustomDecorator],
} as ComponentMeta<typeof MainSection>

export const Main = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', margin: '0' }}>
      <MainSection />
    </Box>
  )
}
