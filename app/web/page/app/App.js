import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import 'normalize.css/normalize.css';

import './App.css';

import ArticleListPage from './containers/ArticleListContainer';
import ArticleEditPage from './containers/ArticleEditContainer';
import ArticleReadPage from './containers/ArticleReadContainer';
import NoMatchPage from './components/no-match/NoMatch';

class App extends React.Component {
  componentDidMount() {
  //  window.onpopstate = () => {
  //   window.location.reload();
  //  }
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
      {/*<Route exact path={'/'} component={ArticleEditPage}/>*/}
      <Route exact path={'/'} component={ArticleListPage}/>
      <Route path={'/articles'} component={ArticleListPage}/>
      <Route path={'/article/:articleID/read/'} component={ArticleReadPage}/>
      <Route path={'/article/new/'} component={ArticleEditPage}/>
      <Route path={'/article/:articleID/edit/'} component={ArticleEditPage}/>
      {/*<Route path={'/user'} component={UserPage}/>*/}
      <Route component={NoMatchPage}/>
    </AnimatedSwitch>
  </div>
);

export default App;
