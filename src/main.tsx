import './styles/index.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

import { setupStore } from './store/store.ts'

const store = setupStore()

createRoot(document.getElementById('root')!).render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
)
