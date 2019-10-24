import React from 'react';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import styles from './Login.module.css';
import https from '../../../../utils/https';

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const { form, userLogin, saveLoginData, closeModal, login } = this.props;
    const { username, password, rememberMe } = form.getFieldsValue();

    form.validateFields((err, values) => {

      if (!err) {
        console.log('Received values of form: ', values);
      }

      if (username && password) {
        https
        .post(
          'login',
          {
            name: username,
            password,
          },
        )
        .then(res => {
          if (res.status === 200) {
            closeModal();
            userLogin(res);
            message.success('Login successfully.');
          } else {
            message.warn('Login Error:' + JSON.stringify(res));
          }
        })
        .catch(err => {
          console.log(err);
          message.warn('Login Request Error:' + JSON.stringify(err));
        });
      } else {
        form.setFields({
          username: {
            value: values.username,
            errors: [new Error('Please make sure the username is correct.')]
          },
          password: {
            value: values.password,
            errors: [new Error('Please make sure the password is correct.')]
          }
        });
        message.warn('Login failed. Please make sure the username or password are both correct.');
      }
    });
  };

  render() {
    const { loginData={}, form={} } = this.props
    const { username, password } = loginData;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" className={styles.inputPrefix} />}
              placeholder="Username"
              autoComplete='off'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: password,
            rules: [
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" className={styles.inputPrefix}/>}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rememberMe', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block={true}
          >
            Log in
          </Button>
          {/*Or <a href="">register now!</a>*/}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export { WrappedLoginForm };