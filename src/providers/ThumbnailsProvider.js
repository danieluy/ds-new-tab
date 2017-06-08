"use strict";

import HistoryProvider from './HistoryProvider';
import StorageProvider from './StorageProvider';

const listeners = []

function init() {
  chrome.runtime.sendMessage({ getThumbs: "simple" }, (thumbs) => {

  });
}

function onChange(callback) {
  listeners.push(callback);
}

function emit(data) {
  listeners.forEach(listener => { listener(data) })
}

module.exports = {
  onChange: onChange
}