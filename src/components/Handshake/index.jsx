import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Postmate from 'postmate';
import { publish } from '../../pubSub';
import { start } from '../../conversation';
import { setting } from '../../dataStore';

const handshake = new Postmate.Model({
  publishMessage: ([topic, message]) => publish(topic, message),
  startChat: () => start('hello'),
  isReady: false,
});

const prepare = (parent) => {
  const { setting: fromParent } = parent.model;
  Object.keys(fromParent).forEach(key => {
    setting[key] = fromParent[key];
  });
};

const ready = (parent) => {
  parent.model.isReady = true;
  parent.emit('readyToStartChat');
};

const Handshake = ({ children }) => {
  const [parent, setParent] = useState({});
  useEffect(() => {
    handshake.then(prnt => {
      prepare(prnt);
      setParent(prnt);
    });
  }, []);

  return <>{parent.emit && children({ onReady: () => ready(parent), handshake })}</>;
};

Handshake.propTypes = {
  children: PropTypes.any
};

export default Handshake;