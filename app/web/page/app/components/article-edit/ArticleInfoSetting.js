import React from "react";
import { Icon, Modal } from "antd";

// import { InfoSettingPreviewContainer } from "../../containers/ArticleInfoSettingContainer";
// import { InfoSettingFormContainer } from "../../containers/ArticleInfoSettingContainer";
import { InfoSettingPreview } from './ArticleInfoSettingPreview';
import { WrappedFormInModal as InfoSettingForm } from './ArticleInfoSettingForm';

import styles from "./ArticleInfoSetting.module.css";

const InfoSettingButton = props => {
  return (
    <button className={styles.button} onClick={props.onClick}>
    <Icon type="form" theme="outlined" />
  </button>
  );
};

class ArticleInfoSettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      visible: false,
      markdown: props.markdown,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.markdown !== this.props.markdown) {
      this.setState({
        markdown: newProps.markdown,
      });
    } 
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <InfoSettingButton
          onClick={this.showModal}
        />
        <Modal
          style={{top: 20}}
          width={880}
          title="Article Info Setting"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <InfoSettingForm
            markdown={this.state.markdown}
            id={this.state.id}
            article={this.props.article}
            afterSubmit={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleInfoSettingModal;