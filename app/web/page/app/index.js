import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { create } from './components/store';
import './index.css';

const clientRender = () => {
  const store = create(window.__INITIAL_STATE__);
  // const { articles } = store.getState();
  const Entry = () => (<div>
    <Provider store={ store }>
      {/* 在做服务端渲染时，需要使用将BrowserRouter 替换为 StaticRouter 区别在于，BrowserRouter 会通过HTML5 提供的 history API来保持页面与URL的同步，而StaticRouter 则不会改变URL */}
      <BrowserRouter forceRefresh={true}>
        <App/>
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