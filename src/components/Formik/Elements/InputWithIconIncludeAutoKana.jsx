import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { okColor, errorColor, baseBorderColor } from '../../shared/baseStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import AutoKana from 'react-auto-kana';

const base = css`
  padding: 8px 25px 8px 8px;
  border-radius: 3px;
  background-color: #ffffff;
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  font-size: 1.05em;
  box-sizing: border-box;
  &:focus {
    border-left-width 5px;
    transition: all 300ms 0s ease;
  }
`;

const title = css`
  font-size: 0.9em;
  line-height: 1;
  padding-top: 6px;
  padding-bottom: 4px;
`;

const isOk = css`
  border: solid 2px ${okColor};
`;

const noTouched = css`
  border: solid 2px ${baseBorderColor};
`;

const withError = css`
  border: solid 2px ${errorColor};
`;

const okIcon = css`
  float: right;
  position: relative;
  right: 5px;
  top: -31px;
  color: ${okColor};
  height: 0px;
`;

const style = ({ form, field }) => {
  const { name } = field;
  const { errors, touched, initialValues } = form;
  if (!errors[name]) return [base, isOk];
  if (!touched[name] && errors[name] && initialValues[name].length === 0) return [base, noTouched];
  if (errors[name]) return [base, withError];
};

const InputWithIconIncludeAutoKana = ({ field, form, innerRef, autoFocus, onUpdate, ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!autoFocus) return;
    if (innerRef) innerRef.current, focus();
    else ref.current.focus();
  }, []);

  return (
    <>
      <div css={title}>{props.title}</div>
      <AutoKana {...field} {...props} ref={innerRef || ref} css={style({ form, field })} onUpdate={onUpdate} />
      {!form.errors[field.name] &&
        <div css={okIcon}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      }
    </>
  );
};

InputWithIconIncludeAutoKana.defaultProps = {
  autoFocus: false
};

InputWithIconIncludeAutoKana.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  innerRef: PropTypes.object,
  autoFocus: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default InputWithIconIncludeAutoKana;