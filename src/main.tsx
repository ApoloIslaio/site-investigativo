import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.js'
import './index.css'
import { ApolloProvider } from '@apollo/client';
import { client } from './services/api.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
