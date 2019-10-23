import React from "react";

import { Row, Col, Tooltip, BackTop } from 'antd';
import dayjs from "dayjs";

import { GeneralHeader as Header } from "../header/TheHeader";

// ScrollToTop is used to reset the scroll bar to top, due to react-router doesn't handle it.
import { MarkdownParser, ScrollToTop } from '../../utils';

import styles from './ArticleRead.module.css';

const ArticleRead = (props) => {
  const { articleTitle, articleAuthor, cover, excerpt, articleContent, articleTime, updatedAt } = props;

  const articleInfo = {
    articleAuthor,
    articleTime,
    updatedAt
  };

  return (
    <div>
      <ScrollToTop/>
      <Header/>
      <Row
        className={styles.readPageContainer}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col className={styles.readPageContent}>
          <Title title={articleTitle}/>
          <ArticleInfo {...articleInfo}/>
          <Excerpt excerpt={excerpt}/>
          <HeaderPhoto cover={cover} />
          <Content markdown={articleContent}/>
          <BackTop/>
        </Col>
      </Row>
    </div>

  )
};

const Title = ({ title }) => (
  <h1 className={styles.title}>
    {title}
  </h1>
);

const HeaderPhoto = ({ cover }) => {
  const { url, ...coverInfo } = cover;

  return (
    <div>
      {
        url
          ? (
            <div>
              <img className={styles.coverImage} src={url} alt="cover"/>
              <IsPhotoFromUnsplash coverInfo={coverInfo}/>
            </div>
          ) : (
            null
          )
      }
    </div>
  );
};

const IsPhotoFromUnsplash = ({ coverInfo }) => {
  const { authorName, authorLink } = coverInfo;

  return (
    <>
      {
        authorName
          ? (
            <div className={styles.coverInfo}>
              Photo by &nbsp;
              <a
                className={styles.coverInfoLink}
                href={authorLink + '?utm_source=write-down&utm_medium=referral'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {authorName}
              </a>
              &nbsp; on &nbsp;
              <a
                className={styles.coverInfoLink}
                href={'https://unsplash.com?utm_source=write-down&utm_medium=referral'}
                target="_blank"
                rel="noopener noreferrer"
              >
                unsplash
              </a>
            </div>
          ) : (
            null
          )
      }
    </>
  );
};

const ArticleInfo = ({ articleAuthor, articleTime, updatedAt }) => {
  const DisplayUpdatedTime = (
    <span>Updated on {dayjs(updatedAt).format('MMM. D, YYYY')}</span>
  );

  return (
    <Row className={styles.infoWrapper} type='flex' justify='space-between'>
      <Col>
        Posted by <span className={styles.author}>{articleAuthor}</span>
      </Col>
      <Col>
        {
          dayjs(updatedAt).format('M. D, YYYY') === dayjs(articleTime).format('M. D, YYYY')
            ? (
              <span>
                {dayjs(articleTime).format('MMM. D, YYYY')}
              </span>
            ) : (
              <Tooltip title={DisplayUpdatedTime}>
                <div className={styles.postedTimeWithUpdated}>
                  {dayjs(articleTime).format('MMM. D, YYYY')}
                </div>
              </Tooltip>
            )
        }
      </Col>
    </Row>
  );
};

const Excerpt = ({ excerpt }) => (
  <p className={styles.excerptContainer}>
    <span className={styles.excerpt}>
      {excerpt}
    </span>
  </p>
);

const Content = ({ markdown }) => {
  const htmlOutput = MarkdownParser.render(markdown);

  const renderResult = {
    __html: htmlOutput
  };

  // The content styling setting mostly comes from
  // globally import styling in src/components/article-edit/ArticleEdit.js,
  // and some global setting in src/components/article-edit/ArticleEdit.module.css.

  return (
    <div className={styles.content}>
      <div
        className={'markdown-body'}
        dangerouslySetInnerHTML={renderResult}
      />
    </div>
  );
};

export default ArticleRead;