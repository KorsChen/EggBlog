import React, { Component } from 'react';
import './index.css';
export default class Header extends Component {
  componentDidMount() {
    console.log('----Header componentDidMount-----');
  }

  render() {
    return <header className="header">
      <div className="container">
        <h1>KorsChen的博客</h1>
      </div>
    </header>;
  }
}
