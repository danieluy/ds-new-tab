"use strict";

chrome.tabs.onUpdated.addListener(mergeTabThumb);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.getThumbs === '') {
    const thumbs = load();
    sendResponse(thumbs);
  }
});

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
      console.error('mergeTabThumb', err)
    })
}

function captureVisibleTab() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.captureVisibleTab({ format: 'jpeg', quality: 10 }, img => { resolve(img) })
    } catch (err) {
      console.error('captureVisibleTab', err)
    }
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

function save(thumb) {
  let stored = load();
  try {
    stored.push(thumb);
    localStorage.setItem('dsNewTabThumbs', JSON.stringify(stored));
  }
  catch (err) {
    full = true;
    console.error(err);
  }
}

function load() {

  let stored = localStorage.getItem('dsNewTabThumbs');

  if (Array.prototype.isPrototypeOf(stored))
    stored.push(thumbs);
  else
    stored = [];

  if (full) {
    reset();
    full = false;
  }

  console.log(`localStorage.getItem('dsNewTabThumbs')`, stored);
  return stored;
}

window.resetThumbnailsService = reset;

function reset() {
  localStorage.removeItem('dsNewTabThumbs');
}