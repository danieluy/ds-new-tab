"use strict";

import Events from './EventsProvider';
import ThumbnailsProvider from './ThumbnailsProvider';
import StorageProvider from './StorageProvider';
import URL from 'url';

const MAX_ITEMS_TOP = 5;


Events.on('thumbnails_updated', updateStoredTopVisited);
Events.on('ignored_on_top_visited_updated', updateStoredTopVisited);

setTimeout(function () {
  chrome.history.onVisited.addListener(updateStoredTopVisited);
}, 100);

function updateStoredTopVisited() {
  Promise.all([
    getTop(MAX_ITEMS_TOP),
    ThumbnailsProvider.get()
  ])
    .then(top_and_thumbs => {
      const top_with_thumbs = mergeStoredThumbnails(top_and_thumbs[0]);
      const updated_thumbs = updateTumbnails(top_with_thumbs, top_and_thumbs[1]);
      storeTop(updated_thumbs);
    })
    .catch(err => { console.error('updateStoredTopVisited()', err) })
}

function mergeStoredThumbnails(top) {
  return top.map(upd_top => {
    loadTop().forEach(str_top => {
      if (upd_top.url === str_top.url)
        upd_top.thumb = str_top.thumb;
    });
    return upd_top;
  })
}

function updateTumbnails(top, thumbs) {
  if (!top || !thumbs)
    throw new Error('top and thumbs parameters must be provided');
  return top.map(item => {
    thumbs.forEach(thumb => {
      if (item.url === thumb.url)
        item.thumb = thumb.thumb;
    })
    return item;
  })
}

function getHistory() {
  return new Promise((resolve, reject) => {
    if (chrome.history)
      chrome.history.search({ text: '', startTime: 0 }, resolve);
    else
      reject('Chrome History is not available');
  })
}

function getVisits(url) {
  return new Promise((resolve, reject) => {
    if (chrome.history)
      chrome.history.getVisits({ url: url }, (visits) => {
        resolve(visits);
      })
    else
      reject('Chrome History is not available');
  })
}

function getTop(limit) {
  if (!limit || isNaN(parseInt(limit)))
    throw new Error('Missing or unexpected parameter. Limit must be an integer.');
  return new Promise((resolve, reject) => {
    getHistory()
      .then(history => {
        const hostnames = [];
        const sorted = history
          .sort((a, b) => b.visitCount - a.visitCount)
          .filter(item => {
            const hostname = getRelevantURL(item.url);
            if (hostnames.indexOf(hostname, 0) < 0) {
              hostnames.push(hostname);
              return isIgnored(item.url);
            }
            return false;
          })
        const top = [];
        for (let i = 0; i < limit; i++)
          top.push(sorted[i]);
        resolve(top);
      })
  })
}

function getRelevantURL(url) {
  const parsed_url = URL.parse(url);
  return parsed_url.protocol + parsed_url.hostname;
}

function isIgnored(url) {
  const ignored = StorageProvider.loadLocal('ignored_on_top_visited') || [];
  return ignored.indexOf(url, 0) < 0;
}

function storeTop(top) {
  try {
    StorageProvider.saveLocal('top_visited', top);
    Events.emit('top_visited_updated', top);
  }
  catch (err) {
    console.error(err);
  }
}

function ignoreOnTopVisited(url) {
  StorageProvider.addLocal('ignored_on_top_visited', url);
  Events.emit('ignored_on_top_visited_updated');
}

window.ignoreOnTopVisited = ignoreOnTopVisited;
window.getIgnored = () => { console.log(StorageProvider.loadLocal('ignored_on_top_visited')) }
window.resetIgnored = () => { localStorage.removeItem('ignored_on_top_visited') }

function loadTop() {
  return StorageProvider.loadLocal('top_visited') || [];
}

module.exports = {
  get: getHistory,
  getTopTen: loadTop,
  ignoreOnTop: ignoreOnTopVisited
}




// function getHistoryWithVisits() {
//   return new Promise((resolve, reject) => {
//     getHistory()
//       .then((history) => {
//         return Promise.all(history.map(visit_item => insertVisits(visit_item)));
//       })
//       .then(visits => { resolve(visits) })
//       .catch(err => { reject(err) });
//   })
// }

// function insertVisits(visit_item) {
//   return new Promise((resolve, reject) => {
//     getVisits(visit_item.url)
//       .then((visits) => {
//         visit_item.visits = visits;
//         resolve(visit_item);
//       })
//   })
// }