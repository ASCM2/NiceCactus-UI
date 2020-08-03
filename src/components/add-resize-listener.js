/* global window: false */

const listeners = [];


window.onresize = (event) => {
  listeners.map((listener) => {
    listener(event);

    return null;
  });
};

const addResizeListener = (newListener) => {
  if (listeners.find((listener) => newListener === listener)) return;

  listeners.push(newListener);
};

export default addResizeListener;
