"use strict";

import Events from './EventsProvider';
import ThumbnailsProvider from './ThumbnailsProvider';

chrome.history.onVisited.addListener(notifyVisited);

function notifyVisited() {
  Events.emit('url_visited')
}

function getHistory() {
  return new Promise((resolve, reject) => {
    chrome.history.search({ text: '', startTime: 0 }, resolve);
  })
}

function getHistoryWithVisits() {
  return new Promise((resolve, reject) => {
    getHistory()
      .then((history) => {
        return Promise.all(history.map(visit_item => insertVisits(visit_item)));
      })
      .then(visits => { resolve(visits) })
      .catch(err => { reject(err) });
  })
}

function insertVisits(visit_item) {
  return new Promise((resolve, reject) => {
    getVisits(visit_item.url)
      .then((visits) => {
        visit_item.visits = visits;
        resolve(visit_item);
      })
  })
}

function getVisits(url) {
  return new Promise((resolve, reject) => {
    chrome.history.getVisits({ url: url }, (visits) => {
      resolve(visits);
    })
  })
}

function getTop(limit) {
  if (!limit || isNaN(parseInt(limit)))
    throw new Error('Missing or unexpected parameter. Limit must be an integer.')
  return new Promise((resolve, reject) => {
    getHistory()
      .then(history => {
        const sorted = history.sort((a, b) => {
          return b.visitCount - a.visitCount;
        })
        const top = [];
        for (let i = 0; i < limit; i++) {
          top.push(sorted[i]);
        }
        resolve(top);
      })
  })
}

function getTopWithThumbnails(limit) {
  return new Promise((resolve, reject) => {
    getTop(limit)
      .then(top => {
        console.log('TODO add the tumbnails to the top visited', top);
        resolve(top);
      })
  })
}

module.exports = {
  get: getHistory,
  getTop: getTopWithThumbnails
}