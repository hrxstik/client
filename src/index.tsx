import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ScrollProvider } from './components/Navigation/ScrollContext';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
);
