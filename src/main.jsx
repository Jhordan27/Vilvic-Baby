import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", // Fallback "test" for dev purposes
  currency: "USD",
  intent: "capture",
};

import { CartProvider } from './context/CartContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <CartProvider>
        <BrowserRouter>
          <Toaster
            position="bottom-right"
            toastOptions={{
            duration: 3000,
              style: {
                background: '#fff',
                color: '#1e293b',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
                fontWeight: '500',
              }
            }}
          />
          <App />
        </BrowserRouter>
      </CartProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
)
