import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import store from './redux/store';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
