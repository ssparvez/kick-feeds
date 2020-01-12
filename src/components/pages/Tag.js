import React from 'react';
import EmptyState from '../atoms/EmptyState';
import emptyImage from '../../assets/undraw_Working_oh83.svg'; // Tell Webpack this JS file uses this image
import Dashboard from '../molecules/Dashboard';


const Tags = () => {
  let tags = [];
  return (
    <Dashboard>
      <div id="content" className="following">
        {tags.length > 0 ? 'show the different tags here' : <EmptyState image={emptyImage} label="Add a tag below" />}
      </div>
    </Dashboard>
  )
}

export default Tags;