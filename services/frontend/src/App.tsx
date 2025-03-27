import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import routes from './constants/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProviderWrapper } from './theme/ThemeContext';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map((route) => {
                return <Route 
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              })}
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProviderWrapper>
    </Provider>
  );
}

export default App;
