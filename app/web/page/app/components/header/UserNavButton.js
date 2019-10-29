import React from "react";
import { Dropdown, Icon } from "antd";
import UserNavMenuContainer from '../../containers/UserNavMenuContainer'
import styles from "./Header.module.css";

const UserNavButton = () => {
  return (
    <Dropdown
      className={styles.button}
      overlay={<UserNavMenuContainer/>}
      trigger={['click']}
      placement='bottomCenter'
    >
      {/* <Icon type="user" theme="outlined" title='Navigation'/> */}
      <img className={styles.avatar} src={require('../../../../asset/images/favicon.png')}/> 
    </Dropdown>
  )
};

export { UserNavButton };