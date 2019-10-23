import { connect } from 'react-redux';

import ArticleRead from '../components/article-read/ArticleRead';

const mapState = (state, ownProps) => {
  
  const { articleTitle, articleAuthor, excerpt, cover='', articleContent, articleTime, updatedAt } = state.article;

  return {
    articleTitle,
    articleAuthor,
    excerpt,
    cover,
    articleContent,
    articleTime,
    updatedAt
  }
};

export default connect(
  mapState,
  null
)(ArticleRead);