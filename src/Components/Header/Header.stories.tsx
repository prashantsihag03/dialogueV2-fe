import { ComponentMeta } from '@storybook/react'
import useDisplayMode from '../../hooks/useDisplayMode'
import { baseCustomDecorator } from '../../utils/storybook-utils'
import { Header } from './Header'

export default {
  title: 'Header',
  component: Header,
  decorators: [baseCustomDecorator],
} as ComponentMeta<typeof Header>

export const Main = () => {
  const { displayMode, toggleDisplayMode } = useDisplayMode()
  return (
    <Header displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
  )
}
