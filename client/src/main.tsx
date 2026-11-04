import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ClerkProvider } from '@clerk/clerk-react'

import { clerkPublishableKey, hasClerk } from "./config/clerk";
import CustomerSessionSync from "./components/auth/CustomerSessionSync";

const app = (
  <CartProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </CartProvider>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {hasClerk ? (
      <ClerkProvider publishableKey={clerkPublishableKey}><CustomerSessionSync />{app}</ClerkProvider>
    ) : (
      app
    )}
  </StrictMode>,
)
