"use strict";

chrome.tabs.onUpdated.addListener(updateStored);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.thumbnails_service === 'get_thumbnails')
    sendResponse(load());
});

function updateStored(tabId, changeInfo, tab) {
  if (!ignored(tab.url))
    mergeTabThumb(tabId)
      .then(tab_thumb => {
        save({
          url: tab_thumb[0].url,
          thumb: tab_thumb[1] || null
        })
      })
      .catch(err => {
        console.error('updateStored', err)
      })
}

function ignored(url) {
  if (url.match(/chrome:\/\//)) // Chrome local addresses
    return true;
}

function mergeTabThumb(tabId) {
  return Promise.all([
    getTab(tabId),
    captureVisibleTab()
  ])
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
    console.log("Thumbnails background service's storage reached its limit and was emptied");
  }
  finally {
    chrome.runtime.sendMessage({ thumbnails_service: 'stored_updated' });
  }
}

function load() {
  let stored = JSON.parse(localStorage.getItem('dsNewTabThumbs'));
  if (!Array.prototype.isPrototypeOf(stored) || full) {
    reset();
    full = false;
  }
  return stored;
}

window.resetThumbnailsService = reset;

function reset() {
  localStorage.removeItem('dsNewTabThumbs');
  localStorage.setItem('dsNewTabThumbs', JSON.stringify([]));
}