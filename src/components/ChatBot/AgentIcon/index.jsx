import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import icon from './operator.jpg';

const base = css`
  position: relative;
  float: left;
  margin-right: 5px;
`;

const hidden = css`
  position: relative;
  float: left;
  margin-right: 5px;
  width: 44px;
  height: 44px;
`;

const image = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #0f84fe;
`;

const AgentIcon = ({ display }) => {
  return (
    <div css={display ? base : hidden}>
      {display && <img src={icon} css={image} />}
    </div>
  );
};

AgentIcon.defaultProps = {
  display: true
};

AgentIcon.propTypes = {
  display: PropTypes.bool.isRequired
};

export default AgentIcon;