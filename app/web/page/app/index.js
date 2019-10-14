import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {match, RouterContext} from 'react-router'
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { AppContainer } from 'react-hot-loader';
import Layout from '../../component/layout';
import App from './components';
import { create } from './components/store';
import routes from './components/router'
import './index.css';
import { json } from 'body-parser';

const clientRender = () => {
  const store = create(window.__INITIAL_STATE__);
  const { articles } = store.getState();
  console.log('1>>>url', JSON.stringify(articles));
  const Entry = () => (<div>
    <Provider store={ store }>
      <BrowserRouter>
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

const serverRender = (context, options)=> {
  const url = context.state.url;
  console.log('2>>>>url', url);
  const branch = matchRoutes(routes, url);
  const promises = branch.map(({route}) => {
    const fetch = route.component.fetch;
    return fetch instanceof Function ? fetch() : Promise.resolve(null)
  });
  return Promise.all(promises).then(data => {
    const initState = context.state;
    data.forEach(item => {
      Object.assign(initState, item);
    });
    context.state = Object.assign({}, context.state, initState);
    const store = create(initState);
    return () =>(
      <Layout>
        <div>
          <Provider store={store}>
            <StaticRouter location={url} context={{}}>
              <App url={url}/>
            </StaticRouter>
          </Provider>
        </div>
      </Layout>
    )
  });
};
export default EASY_ENV_IS_NODE ?  serverRender : clientRender();