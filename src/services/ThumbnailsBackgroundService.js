"use strict";

chrome.tabs.onUpdated.addListener(mergeTabThumb);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.getThumbs)
      console.log('request.getThumbs', !!request.getThumbs)
      // sendResponse(load());
  }
);

function mergeTabThumb(tabId, changeInfo, tab) {
  Promise.all([
    getTab(tabId),
    captureVisibleTab()
  ])
    .then(tab_thumb => {
      save({
        url: tab_thumb[0].url,
        thumb: tab_thumb[1] || null
      })
    })
    .catch(err => {
      console.error(err)
    })
}

function captureVisibleTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab({ format: 'jpeg', quality: 10 }, img => { resolve(img) })
  })
}

function getTab(tabId) {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.get(tabId, tab => resolve(tab))
    } catch (err) {
      reject(err);
    }
  })
}

let full = false;

function save(thumbs) {
  let stored = load();
  if (Array.prototype.isPrototypeOf(stored))
    stored.push(thumbs);
  else
    stored = [];

  try {
    localStorage.setItem('dsNewTabThumbs', JSON.stringify(stored));
  } catch (err) {
    full = true;
    console.error(err);
  }
}

function load() {
  if (full) {
    reset();
    full = false;
  }
  return stored;
}

window.deleteTest = reset;

function reset() {
  localStorage.removeItem('dsNewTabThumbs');
}