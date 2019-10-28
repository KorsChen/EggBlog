import { connect } from 'react-redux';

import { updateArticle } from '../ducks/articles';

import { InfoSettingPreview } from '../components/article-edit/ArticleInfoSettingPreview';
import { WrappedFormInModal as InfoSettingForm } from '../components/article-edit/ArticleInfoSettingForm';

const mapState = (state) => {
  // const selectedArticle = state.articles.data.find(article => article.id === articleID);

  // if (selectedArticle && Object.keys(selectedArticle).length !== 0) {
  const { articleID, title, excerpt, tags, author, coverUrl } = state;
  if (coverUrl) {
    return {
      id: articleID,
      title,
      excerpt,
      tags,
      author,
      coverUrl: coverUrl
    };
  }

  return {
    id: articleID,
    author: 'KorsChen'
  };
};

const mapDispatch = {
  updateArticle
};

const InfoSettingFormContainer = connect(
  mapState,
  mapDispatch
)(InfoSettingForm);

const InfoSettingPreviewContainer = connect(
  mapState,
  null
)(InfoSettingPreview);

export {
  InfoSettingFormContainer,
  InfoSettingPreviewContainer
};