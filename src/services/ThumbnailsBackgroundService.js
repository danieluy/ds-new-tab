"use strict";

chrome.tabs.onUpdated.addListener(mergeTabThumb);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.getThumbs === "simple")
      sendResponse(load());
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
        thumb: tab_thumb[0].thumb
      })
    })
    .catch(err => {
      console.error(err)
    })
}

function captureVisibleTab() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.captureVisibleTab({ format: 'jpeg', quality: 10 }, img => { resolve(img) })
    } catch (err) {
      reject(err);
    }
  })
}

function getTab(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.get(tabId, tab => resolve(tab))
  })
}

let full = false;

function save(thumbs) {
  console.log('save(thumbs)', (load() ? load().length : ''));
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
  console.log('load()');
  const stored = JSON.parse(localStorage.getItem('dsNewTabThumbs'));
  if (full)
    reset();
  return stored;
}

function reset() {
  console.log('reset()');
  localStorage.removeItem('dsNewTabThumbs');
}