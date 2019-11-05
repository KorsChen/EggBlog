import React from 'react';
import { Col, Row, Divider, BackTop } from 'antd';
import { GeneralHeader as Header } from '../header/TheHeader';
import ArticleItem from './ArticleListItem';
import styles from './ArticleList.module.css';

const ArticlesPage = ({ articles, isLoggedIn, selectArticle, removeArticle, removeArticleStatusReset }) => {
  let ArticleList = undefined;

  if (Array.isArray(articles)) {
    ArticleList = articles.map(data => (
      <ArticleItem
        metaData={data}
        key={data.articleID}
        isLoggedIn={isLoggedIn}
      />
    ));
  }

  // const SpinIndicator = (
  //   <Icon type='loading' className={styles.spinIndicator}/>
  // );

  return (
    <div className={styles.pageContainer}>
      {
        // isFetching?
        //   (
        //     <div className={styles.spinContainer}>
        //       <Spin tip={'Loading...'} indicator={SpinIndicator}/>
        //     </div>
        //   ) :  null
      }
      <>
        <Header/>
        <Row>
          <Col className={styles.list}>
            <Divider className={styles.pageIndicator}>随 笔</Divider>
            {ArticleList? ArticleList: null}
            <BackTop/>
          </Col>
        </Row>
      </>
    </div>
  );
};

export default ArticlesPage;