"use strict";
const paginate = (details) => {
  return {
    beforePrevious: details.pages.beforePrevious,
    previous: details.pages.previous,
    current: details.pages.current,
    next: details.pages.next,
    afterNext: details.pages.afterNext,
  };
};
module.exports.paginate = paginate;
