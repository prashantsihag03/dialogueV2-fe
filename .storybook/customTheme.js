const { create } = require('@storybook/theming')
import logo from '../src/assets/allThemedDialogueLogo.svg'

export default create({
  base: 'dark',
  brandTitle: 'Dialogue',
  brandImage: logo,
})
