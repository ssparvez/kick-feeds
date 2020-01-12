import React from 'react';
import EmptyState from '../../atoms/EmptyState';
import notFoundImage from '../../../assets/undraw_Taken_if77.svg';

const PageNotFound = () => {
  const redirect = ['home', '/']

  return (
    <div>
      <EmptyState image={notFoundImage} label="This page doesn't exist... or was abducted" redirect={redirect} />
		</div>
  );
}

export default PageNotFound;