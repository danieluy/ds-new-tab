"use strict";

function sync(key, data) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: data }, () => {
      return resolve();
    });
  })
}

function fetch(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, data => {
      return resolve(data[key]);
    });
  })
}

module.exports = {
  save: sync,
  load: fetch
}