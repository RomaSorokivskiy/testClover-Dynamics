import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";

import App from "./app";
import {store} from "./app/stores";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <DndProvider backend={HTML5Backend}>
                  <App/>
              </DndProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

