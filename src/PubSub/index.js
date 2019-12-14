const topics = {};

export const subscribe = (topic, callback) => topics[topic] = callback;

export const unsubscribe = (topic) => delete topics[topic];

export const publish = (topic, message) => topics[topic] && topics[topic](message);