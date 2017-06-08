"use strict";

module.exports = {
  events: {},
  on: function (evt, fn) {
    this.events[evt] = this.events[evt] || [];
    this.events[evt].push(fn);
  },
  off: function (evt, fn) {
    if (this.events[evt])
      for (let i = 0; i < this.events[evt].length; i++)
        if (this.events[evt][i] === fn) {
          this.events[evt].splice(i, 1);
          break;
        }
  },
  emit: function (evt, data) {
    if (this.events[evt])
      this.events[evt].forEach(function (fn) { fn(data) });
  }
};