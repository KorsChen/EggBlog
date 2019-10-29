import {connect} from "react-redux";

import { selectArticle, removeArticle, removeArticleStatusReset } from '../ducks/articles';

import DraftList from '../components/article-list/ArticleDraftList';

const mapState = (state) => (
  {
    isLoggedIn: state.isLoggedIn
  }
);

const mapDispatch = {
  selectArticle,
  removeArticle,
  removeArticleStatusReset
};


export default connect(
  mapState,
  mapDispatch
)(DraftList);



