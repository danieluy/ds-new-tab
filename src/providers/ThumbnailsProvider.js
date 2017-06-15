"use strict";

import HistoryProvider from './HistoryProvider';
import Events from './EventsProvider';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.thumbnails_service === 'stored_updated')
    Events.emit('thumbnails_updated');
});

function getThumbnails() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ thumbnails_service: 'get_thumbnails' }, function (thumbs) {
      resolve(thumbs);
    });
  })
}

module.exports = {
  get: getThumbnails
}