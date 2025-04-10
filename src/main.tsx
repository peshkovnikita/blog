import './styles/index.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'

import { setupStore } from './store/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = setupStore()

console.log(store.getState())

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
