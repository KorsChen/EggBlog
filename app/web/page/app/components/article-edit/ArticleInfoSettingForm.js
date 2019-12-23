import React, { Component } from "react";

import { Row, Col, Button, Form, Input, Select, message } from "antd";

import { checkImageUrlIsValid } from "../../utils";

import styles from "./ArticleInfoSetting.module.css";

import https from '../../utils/https';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class ArticleInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: {
        url: '',
        authorName: '',
        authorLink: ''
      },
      id: props.id,
      isUrlChanged: false,
      isCoverUrlValid: false,
      coverPreviewMsg: 'The preview of cover will be here.'
    };
  }

  componentDidMount() {
    // To load the cover based on saved url.
    this.checkCoverUrl(undefined, this.props.coverUrl);
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.markdown !== this.props.markdown) {
      this.setState({
        markdown: newProps.markdown,
      });
    } 
  }

  selectCover = (photoData) => {
    const coverUrl = photoData.photoUrl;
    const cover = this.state.cover;

    this.setState({
      cover: {
        ...cover,
        authorName: photoData.photoAuthorName,
        authorLink: photoData.photoAuthorLink
      }
    });

    const form = this.props.form;
    form.setFieldsValue({ coverUrl });

    this.checkCoverUrl(undefined, coverUrl);
  };

  checkCoverUrl = async(rule, url, cb=((e) => e? e: '')) => {
    if (url) {
      try {
        const coverUrl = await checkImageUrlIsValid(url);
        const cover = this.state.cover;

        this.setState({
          cover: {
            ...cover,
            url: coverUrl
          },
          isUrlChanged: true,
          isCoverUrlValid: true
        });
      } catch (error) {
        this.setState({
          isUrlChanged: true,
          isCoverUrlValid: false,
          coverPreviewMsg: 'The url of cover is invalid. Please check the url.'
        });

        // It is failed to pass the validation, the submit button will be disable.
        // 告知 form 校验失败，不能提交表单
        cb(error);
      }
    } else {
      // 将cover相关的数据重置
      this.setState({
        cover: {
          url: '',
          authorName: '',
          authorLink: ''
        },
        isUrlChanged: false,
        isCoverUrlValid: false,
        coverPreviewMsg: 'The preview of cover will be here.'
      });
    }

    // If no error, pass the validation, call cb() to finish the validation
    // 校验通过，总是要调用 cb()，告知 validator 完成校验
    // https://github.com/ant-design/ant-design/issues/5155
    cb();
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.props.form.getFieldsValue();
    // 这里只需要使用data提交表单的数据即可
    // console.log(data);

    const { id, markdown } = this.props;
    const { title, excerpt, tags, author, coverUrl } = data;

    let strTags = '';
    if (tags && tags.length > 0) {
      tags.forEach((value) => {
        strTags = strTags ? strTags + ',' + value : strTags + value;
      });
    }

    https
    .post(
      '/article/save',
      {
        id,
        markdown,
        title,
        excerpt,
        tags: strTags,
        author,
        coverUrl
      },
    )
    .then(res => {
      if (res.status === 200) {
        this.props.afterSubmit();
        message.success('Save successfully.');
      } else {
        message.warn('Save Error:' + JSON.stringify(res));
      }
    })
    .catch(err => {
      console.log(err);
      message.warn('Save Request Error:' + JSON.stringify(err));
    });    
  };

  render() {
    // const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;

    // const titleError = isFieldTouched('userName') && getFieldError('userName');
    // const excerptError = isFieldTouched('password') && getFieldError('password');

    const { getFieldDecorator, getFieldsError } = this.props.form;

    const { articleTitle, articleExcerpt, articleTags, articleAuthor, articleCoverUrl } = this.props.article;

    return (
      <div>
        <Form>
          <Form.Item
            {...formItemLayout}
            label={'Title'}
          >
            {getFieldDecorator('title', {
              initialValue: articleTitle,
              rules: [
                {
                  required: true,
                  message: 'Please input your article title. ',
                },
                {
                  max: 100,
                  message: 'The maximum letters of title is 100. '
                }
              ]
            })(
              <Input placeholder="Please input your article title." />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={'Excerpt'}
          >
            {getFieldDecorator('excerpt', {
              initialValue: articleExcerpt,
              rules: [
                {
                  required: true,
                  message: 'Please input your article excerpt. ',
                },
                {
                  max: 320,
                  message: 'The maximum letters of excerpt is 320. '
                }
              ]
            })(
              <Input.TextArea
                rows={8}
                autosize={true}
                placeholder='Please input your article excerpt.'
              />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label='Tags'
          >
            {getFieldDecorator('tags', {
              initialValue: articleTags,
              rules: [{
                max: 4,
                type: 'array',
                message: 'The number of tags is up to 4.'
              }]
            })(
              <Select
                mode='tags'
                maxTagCount={4}
                placeholder="Please type some keywords for the article. "
              />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={'Author Name'}
          >
            {getFieldDecorator('author', {
              initialValue: articleAuthor,
              rules: [
                {
                  required: true,
                  message: 'Please input the author name. ',
                },
                {
                  max: 30,
                  message: 'The maximum letters of title is 30. '
                }
              ]
            })(
              <Input placeholder="Please input the author name." />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={'Cover Url'}
          >
            {getFieldDecorator('coverUrl', {
              initialValue: articleCoverUrl,
              rules: [{
                validator: this.checkCoverUrl
              }]
            })(
              <Input placeholder="Please input a valid url of the cover of your article. " />
            )}
          </Form.Item>
          <Row>
            <Col span={6} className={styles.submitButtonWrapper}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                  onClick={this.onSubmit}
                >
                  Save
                </Button>
              </Form.Item>
            </Col>
            <Col span={14}>
              <div className={styles.coverPreviewArea}>
                {
                  this.state.isCoverUrlValid
                    ? <img className={styles.coverPreviewImage} src={this.state.cover.url} alt=" loading..."/>
                    : (
                      <div className={styles.coverPreviewAreaTipWrapper}>
                        {
                          this.state.isUrlChanged
                            ? <p className={styles.coverPreviewAreaTipWithFeedback}>{this.state.coverPreviewMsg}</p>
                            : <p className={styles.coverPreviewAreaTip}>{this.state.coverPreviewMsg}</p>
                        }
                      </div>
                    )
                }
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedFormInModal = Form.create()(ArticleInfoForm);

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export { WrappedFormInModal };