"use strict";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  getTab(tabId)
    .then(tab => captureVisibleTab())
    .then(thumb => { save({ tab: tab, thumb: thumb }) })
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.getThumbs === "simple")
      sendResponse(load());
  }
);

function captureVisibleTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab({ format: 'jpeg', quality: 10 }, img => { resolve(img) })
  })
}

function getTab(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.get(tabId, tab => resolve(tab))
  })
}

function save(thumbs) {
  let stored = load();
  if (Array.prototype.isPrototypeOf(stored))
    stored.push(thumbs);
  else
    stored = [];
  localStorage.setItem('dsNewTabThumbs', JSON.stringify(stored));
}

function load() {
  const stored = JSON.parse(localStorage.getItem('dsNewTabThumbs'));
  if (!stored || stored.length > 200)
    reset();
  return stored;
}

function reset() {
  localStorage.setItem('dsNewTabThumbs', JSON.stringify([]));
}