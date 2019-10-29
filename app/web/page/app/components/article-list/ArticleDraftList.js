import React from "react";
import { Col, Row, Divider, BackTop, message } from "antd";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { GeneralHeader as Header } from '../header/TheHeader';
import ArticleDraftItem from './ArticleDraftListItem';

import styles from "./ArticleList.module.css";

dayjs.extend(relativeTime);

const ArticleDraftListPage = ({ drafts, isLoggedIn, removeArticleStatusReset }) => {
  let DraftList = undefined;

  if (Array.isArray(drafts)) {
    DraftList = drafts.map(data => (
      <ArticleDraftItem
        metaData={data}
        key={data.articleID}
        isLoggedIn={isLoggedIn}
      />
    ));
  }

  return (
    <>
      <Header/>
      <Row>
        <Col className={styles.list}>
          <Divider className={styles.pageIndicator}>Draft list</Divider>
          {DraftList? DraftList: null}
          <BackTop/>
        </Col>
      </Row>
    </>
  );
};

export default ArticleDraftListPage;