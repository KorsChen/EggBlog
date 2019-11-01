import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import 'normalize.css/normalize.css';

import './App.css';

import ArticleListPage from './containers/ArticleListContainer';

const ArticleEditPage =  lazy( () => import('./containers/ArticleEditContainer'));
const ArticleReadPage =  lazy( () => import('./containers/ArticleReadContainer'));

class App extends React.Component {
  componentDidMount() {
   window.onpopstate = () => {
    window.location.reload();
   }
  }

  render() {
    return <AppRouter />;
  }
}

const AppRouter = () => (
  <div className="App">
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
      <Suspense fallback={<div>Loading...</div>}>
      <Route exact path={'/'} component={ArticleListPage}/>
      <Route path={'/articles'} component={ArticleListPage}/>
      <Route path={'/article/:articleID/read/'} component={ArticleReadPage}/>
      <Route path={'/article/new/'} component={ArticleEditPage}/>
      <Route path={'/article/:articleID/edit/'} component={ArticleEditPage}/>
      </Suspense>
    </AnimatedSwitch>
  </div>
);

export default App;
