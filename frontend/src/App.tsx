import React from 'react';
import logo from './logo.svg';
import './App.css'
import './static/modal.css'
import './static/scrollBarStyles.css'
import { RouterProvider } from 'react-router-dom';
import router from './components/Routing/Routing';
import { AuthProvider } from './components/Authorization/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PrivateRoute } from './components/Routing/PrivateRoute';
import './static/Animations.css'

const App = () => {
  return (
      <Provider store={store}>
          <AuthProvider>
              <RouterProvider router={router}/>
          </AuthProvider>
      </Provider>
  )
}

export default App;
