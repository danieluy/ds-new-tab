"use strict";

import Events from './EventsProvider';
import ThumbnailsProvider from './ThumbnailsProvider';
import StorageProvider from './StorageProvider';

const MAX_ITEMS_TOP = 5;

chrome.history.onVisited.addListener(updateStored);

function updateStored() {
  Promise.all([
    getTop(MAX_ITEMS_TOP),
    ThumbnailsProvider.get()
  ])
    .then(top_and_thumbs => {
      storeTop(mergeHistoryThumbs(top_and_thumbs[0], top_and_thumbs[1]));
    })
}

function mergeHistoryThumbs(history, thumbs) {
  return history.map(item => {
    item.thumb = null;
    if (thumbs)
      for (let i = 0; i < thumbs.length && !item.thumb; i++) {
        console.log(i < thumbs.length && !item.thumb)
        if (thumbs[i].url === item.url)
          item.thumb = thumbs[i].thumb;
      }
    return item;
  })
}

function getHistory() {
  return new Promise((resolve, reject) => {
    chrome.history.search({ text: '', startTime: 0 }, resolve);
  })
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

function getVisits(url) {
  return new Promise((resolve, reject) => {
    chrome.history.getVisits({ url: url }, (visits) => {
      resolve(visits);
    })
  })
}

function getTop(limit) {
  if (!limit || isNaN(parseInt(limit)))
    throw new Error('Missing or unexpected parameter. Limit must be an integer.');
  return new Promise((resolve, reject) => {
    getHistory()
      .then(history => {
        const sorted = history.sort((a, b) => b.visitCount - a.visitCount);
        const top = [];
        for (let i = 0; i < limit; i++)
          top.push(sorted[i]);
        resolve(top);
      })
  })
}

function storeTop(top) {
  StorageProvider.saveLocal('top_visited', top);
  Events.emit('stored_top_visited_updated');
}

function loadTop() {
  return StorageProvider.loadLocal('top_visited') || [];
}

module.exports = {
  get: getHistory,
  getTopTen: loadTop
}