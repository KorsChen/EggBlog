import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Article from './article.jsx';
import { create } from './components/store';

const start = () => {
  const store = create(window.__INITIAL_STATE__);
  const { article } = store.getState();
  console.log('1>>>url', JSON.stringify(article));
  const Entry = () => (<div>
    <Provider store={ store }>
      <BrowserRouter>
        <Article article={ article } />
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

export default start();