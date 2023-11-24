"use strict";
module.exports = function (dateData) {
  return dateData.toLocaleString("tr-tr", {
    dateStyle: "full",
    timeStyle: "medium",
  });
};
