import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { okColor } from '../../shared/baseStyle';

const base = css`
  font-size: 1.1em;
  border: solid 2px gray;
  border-radius: 3px;
  background-color: #ffffff;
  display: table;
  width: 100%;
  i {
    vertical-align: middle;
    display: inline-block;
    margin: 13px;
  }
  span {
    vertical-align: middle;
    display: inline-block;
    width: 75%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const input = css`
  display: none;
`;

const unCheckedStyle = css`
  border-color: gray;
  background-color: #ffffff;
  i {
    color: gray;
  }
`;

const checkedStyle = css`
  border-color: ${okColor()};
  background-color: #fffdcf;
  i {
    color: ${okColor()};
  }
`;

const RadioInput = ({ field, form, id, ...props }) => {
  const checked = id === form.values[field.name];

  return (
    <div>
      <label css={[base, (checked ? checkedStyle : unCheckedStyle)]}>
        <i className={`fa fa-lg ${checked ? 'fa-dot-circle-o' : 'fa-circle-o'}`} />
        <span>{props.title}</span>
        <input {...field} {...props} value={id} type="radio" css={input} checked={checked} />
      </label>
    </div>
  );
};

RadioInput.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default RadioInput;