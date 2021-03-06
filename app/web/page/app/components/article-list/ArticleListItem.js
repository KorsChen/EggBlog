import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Col, Icon, Popconfirm, Row, Tag, message } from 'antd';
import https from '../../utils/https';
import styles from "./ArticleList.module.css";
import { checkImageUrlIsValid } from "../../utils/index";

class ArticleItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: '',
      isCoverUrlValid: false,
    };
  }

  async componentDidMount() {
    try {
      const coverUrl = await checkImageUrlIsValid(this.props.metaData.articleCoverUrl);

      this.setState({
        coverUrl: coverUrl,
        isCoverUrlValid: true
      });
    } catch (error) {

    }
  }

  handleDelete = () => {
    const { articleID } = this.props.metaData;
    const { isLoggedIn } = this.props;
    if (articleID && isLoggedIn) {
      https
      .post(
        `/delete/${articleID}`,
        { articleID },
      )
      .then(res => {
        if (res.status === 200) {
          message.success('delete successfully.');
          window.location.reload()
        } else {
          message.warn('delete Error:' + JSON.stringify(res));
        }
      })
      .catch(err => {
        console.log(err);
        message.warn('delete Request Error:' + JSON.stringify(err));
      }); 
    }
  };

  render() {
    const { articleID, articleTitle, articleAuthor, articleTags, articleExcerpt='', articleTime, postedAt, articleClick } = this.props.metaData;
    const tags = (articleTags && articleTags !== null) ? articleTags.split(',') : [];
    const { isLoggedIn } = this.props;

    const toReadPage = {
      pathname: `/article/${articleID}/read`,
      state: {
        isFrom: 'articles'
      }
    };

    const DisplayUpdatedTime = (
      <span>Updated on {articleTime}</span>
    );

    return (
      <div className={styles.itemWrapper}>
        {
          this.state.isCoverUrlValid
            ? (
              <div className={styles.imageWrapper}>
                <div
                  className={styles.image}
                  style={{backgroundImage: `url(${this.state.coverUrl})`}}
                />
              </div>
            ) : (
              null
            )
        }
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>
            <Link to={toReadPage}>{articleTitle}</Link>
          </h2>
          <Row className={styles.infoWrapper} type='flex' justify='space-between'>
            <Col>
              Posted by <span className={styles.author}>{articleAuthor}</span>
            </Col>
            <Col>
              {
                // dayjs(articleTime).format('M. D, YYYY') === dayjs(articleTime).format('M. D, YYYY')
                //   ? (
                    <span>
                      {articleTime}
                    </span>
                  // ) : (
                  //   <Tooltip title={DisplayUpdatedTime}>
                  //     <div className={styles.postedTimeWithUpdated}>
                  //       {dayjs(articleTime).fromNow()}
                  //     </div>
                  //   </Tooltip>
                  // )
              }
            </Col>
          </Row>
          <Row className={styles.infoWrapper} type='flex' justify='space-between'>
            <Col>
                <p className={styles.excerpt}>
                {
                  articleExcerpt !== null && articleExcerpt.length > 300
                    ? (
                      <span>
                        {articleExcerpt.slice(0, 300) + ' ... '}
                        <span className={styles.readMoreLink}>
                          <Link to={toReadPage}>
                            Read More
                          </Link>
                        </span>
                      </span>
                    ) : (
                      <span>
                        {articleExcerpt + ' '} &nbsp;
                        <span className={styles.readMoreLink}>
                          <Link to={toReadPage}>
                            Read More
                          </Link>
                        </span>
                      </span>
                    )
                }
              </p>
            </Col>
            <Col>
              浏览 · <span>{articleClick}</span>
            </Col>
          </Row>
          <Row className={styles.bottomBar} type='flex' justify='space-between'>
            <Col>
              <div className={styles.tagList}>
                <TagGroup tags={tags}/>
              </div>
            </Col>
            <Col>
              {
                isLoggedIn
                  ? (
                    <div>
                      <Popconfirm
                        title={'Are you sure to delete this article?'}
                        okText={'Yes'}
                        onConfirm={this.handleDelete}
                      >
                        <button
                          className={styles.editOption}
                          title='Delete the article'
                        >
                          <Icon type="delete" />
                        </button>
                      </Popconfirm>

                      <Link to={`/article/${articleID}/edit`}>
                        <button
                          className={styles.editOption}
                          title='Jump to the edit page'
                        >
                          <Icon type="edit" />
                        </button>
                      </Link>
                    </div>
                  ) : (
                    null
                  )
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const TagGroup = ({ tags }) => (
  <div>
    {
      tags.map((tag) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag key={tag}>
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return tagElem;
      })
    }
  </div>
);

TagGroup.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default ArticleItem;