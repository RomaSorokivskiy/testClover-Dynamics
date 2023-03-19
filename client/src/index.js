import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";

import App from "./app";
import {store} from "./app/stores";
import { DndProvider } from 'react-dnd'
import {HTML5toTouch} from 'rdndmb-html5-to-touch'
import {MultiBackend} from "react-dnd-multi-backend"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                  <App/>
              </DndProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

