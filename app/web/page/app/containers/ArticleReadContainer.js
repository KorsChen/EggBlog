import { connect } from 'react-redux';

import ArticleRead from '../components/article-read/ArticleRead';

const mapState = (state, ownProps) => {
  
  const { articleTitle, articleAuthor, articleExcerpt, articleCoverUrl, articleContent, articleTime, updatedAt } = state.article;

  return {
    articleTitle,
    articleAuthor,
    articleExcerpt,
    articleCoverUrl,
    articleContent,
    articleTime,
    updatedAt
  }
};

export default connect(
  mapState,
  null
)(ArticleRead);