import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ content }) => (
  typeof (content) === 'string' ? <span dangerouslySetInnerHTML={{ __html: content }} /> : content
);

Content.propTypes = {
  content: PropTypes.any
};

export default Content;