import ReactDOM from 'react-dom/client'
import dotenv from 'dotenv'
import App from './App.jsx'
import './index.css'
import {persistor, store} from './redux/store.js'
import { Provider } from 'react-redux'
dotenv.config()
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    <ToastContainer />
    </PersistGate>
  </Provider>
)
