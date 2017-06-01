"use strict";

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


module.exports = {
  getAll: getHistoryWithVisits
}