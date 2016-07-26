/* eslint no-param-reassign: 0*/
// http://jsfiddle.net/t1dv1rbo/
const smoothScrollTo = (element, target, duration) => {
  target = Math.round(target) - 5;
  duration = Math.round(duration);
  if (duration < 0) {
    return Promise.reject('bad duration');
  }
  if (duration === 0) {
    element.scrollTop = target;
    return Promise.resolve();
  }

  const startTime = Date.now();
  const endTime = startTime + duration;

  const startTop = element.scrollTop;
  const distance = target - startTop;

  // based on http://en.wikipedia.org/wiki/Smoothstep
  const smoothStep = (start, end, point) => {
    if (point <= start) { return 0; }
    if (point >= end) { return 1; }
    const step = (point - start) / (end - start); // interpolation
    return step * step * (3 - 2 * step);
  };

  return new Promise(resolve => {
    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    let previousTop = element.scrollTop;

    // This is like a think function from a game loop
    const scrollFrame = () => {
      if (element.scrollTop !== previousTop) {
        return;
      }

      // set the scrollTop for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + (distance * point));
      element.scrollTop = frameTop;

      // check if we're done!
      if (now >= endTime) {
        resolve();
        return;
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (element.scrollTop === previousTop
          && element.scrollTop !== frameTop) {
        resolve();
        return;
      }
      previousTop = element.scrollTop;

      // schedule next frame for execution
      setTimeout(scrollFrame, 0);
    };

    // boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
};

const Scroller = {
  scrollTo: smoothScrollTo,
};

export default Scroller;
