import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import styles from './Header.module.css';

const EditPageHeader = ({
  id,
  markdown,
  article,
  toggleDisplayMode,
  toggleScrollSync
}) => {
  const ArticleInfoSetting = lazy(() => import('../article-edit/ArticleInfoSetting'));
  const UserNavButton = lazy(() => import('./UserNavButton'));
  return (
    <Row className={styles.header} type="flex" justify="start" align="middle">
      <Col span={4} offset={4}>
        <Link to={'/'}>
          <LogoButton/>
        </Link>
      </Col>
      <Col span={1}>
        <Suspense fallback={<div>loading...</div>}>
          <ArticleInfoSetting 
              id={id}
              markdown={markdown}
              article={article}
            />
        </Suspense>
      </Col>
      <Col span={1}>
        <UserNavButton/>
      </Col>
    </Row>
  );
};

class GeneralHeader extends Component {
  render() {
    const UserNavButton = lazy(() => import('./UserNavButton'));
    return (
      <Row className={styles.header} type="flex" justify="start" align="middle">
        <Col span={4} offset={4}>
          <Link to={'/'}>
            <LogoButton/>
          </Link>
        </Col>
        <Col span={1} offset={11}>
          <UserNavButton/>
        </Col>
      </Row>
    );
  }
}

const LogoButton = () => (
  <button className={styles.logo}>
    KorsChen's Markdown
  </button>
);

EditPageHeader.propTypes = {
  toggleScrollSync: PropTypes.func.isRequired,
  toggleDisplayMode: PropTypes.func.isRequired
};

export {
  EditPageHeader,
  GeneralHeader
};