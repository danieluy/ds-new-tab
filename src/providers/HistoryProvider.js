"use strict";

import Events from './EventsProvider';
import ThumbnailsProvider from './ThumbnailsProvider';
import StorageProvider from './StorageProvider';
import url from 'url';

const MAX_ITEMS_TOP = 5;

Events.on('thumbnails_updated', updateStoredTopVisited);
if (chrome.history)
  chrome.history.onVisited.addListener(updateStoredTopVisited);

function updateStoredTopVisited() {
  Promise.all([
    getTop(MAX_ITEMS_TOP),
    ThumbnailsProvider.get()
  ])
    .then(top_and_thumbs => {
      storeTop(mergeTopVisitedAndThumbs(top_and_thumbs[0], top_and_thumbs[1]));
    })
    .catch(err => { console.error('updateStoredTopVisited()', err) })
}

function mergeTopVisitedAndThumbs(top_visited, thumbs) {
  if (!top_visited || !thumbs)
    throw new Error('top_visited and thumbs parameters must be provided');
  return top_visited.map(item => {
    item.thumb = null;
    for (let i = 0; i < thumbs.length && !item.thumb; i++) {
      if (thumbs[i].url === item.url) {
        item.thumb = thumbs[i].thumb;
      }
    }
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
        const sorted = history
          .sort((a, b) => b.visitCount - a.visitCount)
          // .reduce((domains, item) => {
          //   return domains
          // }, [])
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
  const stored = StorageProvider.loadLocal('top_visited');
  // console.log(`StorageProvider.loadLocal('top_visited')`, stored)
  return stored || [];
}

module.exports = {
  get: getHistory,
  getTopTen: loadTop
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