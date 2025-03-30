import './styles/index.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'

import { setupStore } from './store/store.ts';
import { Provider } from 'react-redux';

const store = setupStore()

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
