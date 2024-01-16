import { ComponentMeta } from '@storybook/react'
import useCreateTheme from '../../hooks/useDisplayMode'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { Header } from './Header'

export default {
  title: 'Organisms/Header',
  component: Header,
  decorators: [baseCustomDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'Header for DialogueV2-FE providing logo, dark mode toggle, notifications, settings, and user profile',
      },
    },
  },
} as ComponentMeta<typeof Header>

export const Main = () => {
  const { displayMode, toggleDisplayMode } = useCreateTheme()
  return (
    <Header displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
  )
}
