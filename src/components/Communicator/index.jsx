import React from 'react';
import { PostRobotContext } from 'react-hook-post-robot';

const Communicator = (props) => {
  return (
    <PostRobotContext.Provider value={{ window: window.parent }} {...props} />
  );
};

export default Communicator;