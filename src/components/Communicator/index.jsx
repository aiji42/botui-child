import React from 'react';
import { PostRobotContext } from '../../hooks/PostRobot';

const Communicator = (props) => {
  return (
    <PostRobotContext.Provider value={{ window: window.parent }} {...props} />
  );
};

export default Communicator;