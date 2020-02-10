import React, { Component } from 'react';
import JotBar from '../atoms/JotBar';
import Dashboard from '../molecules/Dashboard';

export default class TagDetail extends Component {
  render() {
    return (
      <Dashboard>
      <div id="content" className="tag-detail">
        asdasdasd
        {/* {this.renderContent()} */}
        <JotBar onSubmit={this.onSubmit} />
      </div>
    </Dashboard>
    )
  }
}