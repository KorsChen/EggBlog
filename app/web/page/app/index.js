import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {match, RouterContext} from 'react-router'
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { create } from './components/store';
// import routes from './components/router'
import './index.css';

const clientRender = () => {
  const store = create(window.__INITIAL_STATE__);
  const { articles } = store.getState();
  const Entry = () => (<div>
    <Provider store={ store }>
      <BrowserRouter forceRefresh={true}>
        <App articles/>
      </BrowserRouter>
    </Provider>
  </div>
  );
  const render = Page =>{
    ReactDOM.hydrate(EASY_ENV_IS_DEV ? <AppContainer><Page /></AppContainer> : <Page />, document.getElementById('app'));
  };
  if (EASY_ENV_IS_DEV && module.hot) {
    module.hot.accept();
  }
  render(Entry);
  import('service-worker-register').then(sw =>{
    sw.default.register('service-worker.js');
  });
};

export default clientRender();