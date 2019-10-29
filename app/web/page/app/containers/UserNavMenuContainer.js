import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createArticle, createArticleStatusReset } from '../ducks/articles';
import { userLogout } from '../ducks/user';

import { UserNavMenu } from '../components/header/UserNavMenu';

const mapState = (state) => (
  {
    state,
    isLoggedIn: state.isLoggedIn
  }
);

const mapDispatch = {
  createArticle,
  userLogout
};

export default withRouter(connect(
  mapState,
  mapDispatch
)(UserNavMenu));



