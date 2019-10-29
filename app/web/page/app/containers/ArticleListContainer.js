import {connect} from "react-redux";

import { selectArticle, removeArticle, removeArticleStatusReset } from '../ducks/articles';

import ArticleList from '../components/article-list/ArticleList';

const selectThePublishedArticles = (list = []) => {
  console.log('list===============' + JSON.stringify(list.articles));
  // return list.filter((article) => article.isPublished === true);
  return list;
};

const mapState = (state) => (
  {
    articles: state.articles,
    isFetching: state.articles.isFetching,
    isLoggedIn: state.isLoggedIn,
    isRemovingFinished: state.articles.isRemovingFinished,
    error: state.articles.error
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



