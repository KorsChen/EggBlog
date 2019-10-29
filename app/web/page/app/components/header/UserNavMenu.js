import React from "react";
import { Link } from "react-router-dom";
import { Menu, message } from "antd";
import https from '../../utils/https';
import { LoginModal } from '../login/Login';

import styles from "./Header.module.css";

const UserNavMenu = (props) => {
  console.log('UserNavMenu--------------' + JSON.stringify(isLoggedIn));
  const { history, error, createArticle, userLogout, isLoggedIn, isCreatingFinished, createArticleStatusReset, ...rest } = props;

  const handleLogout = () => {
    https
    .get('/logout')
    .then(res => {
      if (res.status === 200) {
        message.success('You have logged out.')
        window.location.reload()
      } else {
        message.warn('logged out Error:' + JSON.stringify(res));
      }
    })
    .catch(err => {
      console.log(err);
      message.warn('logged out Request Error:' + JSON.stringify(err));
    }); 
  };

  if (isCreatingFinished && error) {
    message.error('Failed to update article.');
  } else if (isCreatingFinished) {
    message.success('New article has been created.');
    createArticleStatusReset();

    // jump to the new article editing page after it has been created successfully
    history.push('/article/new');
  }

  return (
    <>
      {
        isLoggedIn
          ? (
            <Menu {...rest}>
              <Menu.Item key="1">
                <Link to={'/article/new'}>New Article</Link>
              </Menu.Item>
              {/* <Menu.Item key="2">
                <Link to={'/drafts'}>My Draft</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={'/articles'}>My Articles</Link>
              </Menu.Item> */}
              <Menu.Divider/>
              {/*<Menu.Item key="4">*/}
              {/*<Link to={'/user'}>User Profile</Link>*/}
              {/*</Menu.Item>*/}
              <Menu.Item key="5">
                <button className={styles.navMenuOption} onClick={handleLogout}>
                  Log out
                </button>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu {...rest}>
              <Menu.Item key="6">
                <LoginModal/>
              </Menu.Item>
            </Menu>
          )
      }
    </>
  );
};

export { UserNavMenu };