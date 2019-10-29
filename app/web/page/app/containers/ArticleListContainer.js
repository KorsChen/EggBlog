import {connect} from "react-redux";

import { selectArticle, removeArticle, removeArticleStatusReset } from '../ducks/articles';

import ArticleList from '../components/article-list/ArticleList';

const mapState = (state) => (
  {
    articles: state.articles,
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
)(ArticleList);



