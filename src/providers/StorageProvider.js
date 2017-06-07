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

function saveLocalStorage(key, data) {// throws local storage exceptions
  localStorage.setItem(key, JSON.stringify(data));
}

function loadLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

module.exports = {
  save: sync,
  load: fetch,
  saveLocal: saveLocalStorage,
  loadLocal: loadLocalStorage
}