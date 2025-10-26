import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { customStore } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={customStore}>
    <App />
  </Provider>,
)
