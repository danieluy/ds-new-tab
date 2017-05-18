"use strict";

let data = {};

function sync(key, bookmarks) {
  return new Promise((resolve, reject) => {
    data[key] = bookmarks;
    resolve();
  })
}

function fetch(key) {
  return Promise.resolve(data[key]);
}

function clear() {
  data = {};
}

module.exports = {
  save: sync,
  load: fetch,
  clear: clear
}