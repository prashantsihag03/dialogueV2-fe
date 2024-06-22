import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './Components/App'
import store from './store'
import '@fontsource/roboto'

const container = document.getElementById('root')
const root = createRoot(container as Element)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
