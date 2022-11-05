import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

import Main from "./components/Main";

import { store } from './redux/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if(rootElement){
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}



