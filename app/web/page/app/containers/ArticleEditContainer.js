import { connect } from 'react-redux';

import { updateContentEditStatus } from '../ducks/currentEdit';

import ArticleEdit from '../components/article-edit/ArticleEdit';
import { stat } from 'fs';
import { articles } from '../ducks/articles';

const mapState = (state, ownProps) => {
  console.log('mapState-----state--------' + JSON.stringify(state));
  console.log('mapState-----ownProps--------' + JSON.stringify(ownProps));
  const { article = {}, isLoggedIn } = state;
  const {
    articleID,
    articleContent
  } = article;
  // const isLoggedIn = state.user.isLoggedIn;
  // const isMarkdownTouch = state.currentEdit.isTouch;

  // const idFromRedux = state.currentEdit.id;
  // const idFromParams = ownProps.match.params.articleID;

  // const articleID = idFromParams? idFromParams: idFromRedux;

  // const selectedArticle = state.articles.data.find(article => article.id === articleID);

  // if (selectedArticle && Object.keys(selectedArticle).length !== 0) {
  //   const { id, markdown, htmlOutput } = selectedArticle;

  //   return {
  //     id,
  //     markdown,
  //     htmlOutput,
  //     isMarkdownTouch,
  //     isLoggedIn
  //   };
  // }

  return {
    isLoggedIn,
    id: articleID,
    markdown: articleContent,
    article
  };
};

const mapDispatch = {
  updateContentEditStatus
};

export default connect(
  mapState,
  mapDispatch
)(ArticleEdit);