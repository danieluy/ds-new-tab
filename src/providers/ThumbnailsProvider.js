"use strict";

import HistoryProvider from './HistoryProvider';
import Events from './EventsProvider';

function getThumbnails() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ getThumbs: "simple" }, (thumbs) => {
      resolve(thumbs);
    });
  })

}

module.exports = {
  get: getThumbnails
}