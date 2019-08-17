import React from 'react';
import { connect } from 'react-redux';

import './IndexView.scss';

const IndexView = (props) => {
  return (
    <div className='IndexView'>
      <img src='/tram.svg' alt='' />
      <div className='IndexView__text'>
        <h1>Tailor-made traveling.</h1>
        <h3>Everyone can be a pro-commuter.</h3>
      </div>
    </div>
  );
};

export default IndexView;
