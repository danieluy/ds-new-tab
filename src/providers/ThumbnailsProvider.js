"use strict";

import HistoryProvider from './HistoryProvider';
import Events from './EventsProvider';

function getThumbnails() {
  // chrome.runtime.sendMessage({ getThumbs: "simple" }, (thumbs) => {

  // });
}

module.exports = {
  get: getThumbnails
}