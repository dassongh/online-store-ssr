function createAnalytics() {
  let counter = 0;
  let isDestroyed = false;

  const listener = () => counter++;

  window.addEventListener('click', listener);

  return {
    destroy() {
      window.removeEventListener('click', listener);
      isDestroyed = true;
    },

    getClicks() {
      if (isDestroyed) return `Analytics is destroyed. Total clicks = ${counter}`;
      return counter;
    },
  };
}

window.analytics = createAnalytics();
