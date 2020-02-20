import React, { Component } from 'react'
import './Wall.scss';

import Dashboard from '../molecules/Dashboard';
import NoteList from '../molecules/NoteList';

class Wall extends Component {
  render() {
    console.log(this.props.notes);
    return (
      <Dashboard>
        <div id="content" className="wall">
          <NoteList />
        </div>
      </Dashboard>
    )
  }
}


export default Wall;