/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 222);
/******/ })
/************************************************************************/
/******/ ({

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


chrome.tabs.onUpdated.addListener(updateStored);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.thumbnails_service === 'get_thumbnails') sendResponse(load());
});

function updateStored(tabId, changeInfo, tab) {
  if (!ignored(tab.url)) checkTabIsActive(tabId).then(function () {
    return mergeTabThumb(tabId);
  }).then(function (tab_thumb) {
    save({
      url: tab_thumb[0].url,
      thumb: tab_thumb[1] || null
    });
  }).catch(function (err) {
    console.error('updateStored()', err);
  });
}

function checkTabIsActive(tabId) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (result) {
      result[0].id === tabId ? resolve() : reject('Active tab has changed');
    });
  });
}

function ignored(url) {
  if (url.match(/chrome:\/\//)) // Chrome local addresses
    return true;
}

function mergeTabThumb(tabId) {
  return Promise.all([getTab(tabId), captureVisibleTab(tabId)]);
}

function captureVisibleTab(tabId) {
  return new Promise(function (resolve, reject) {
    try {
      chrome.tabs.captureVisibleTab({ format: 'jpeg', quality: 10 }, function (img) {
        resolve(img);
      });
    } catch (err) {
      reject(err);
    }
  });
}

function getTab(tabId) {
  return new Promise(function (resolve, reject) {
    try {
      chrome.tabs.get(tabId, function (tab) {
        return resolve(tab);
      });
    } catch (err) {
      reject(err);
    }
  });
}

var full = false;

function save(thumb) {
  var stored = load();
  try {
    stored.push(thumb);
    localStorage.setItem('dsNewTabThumbs', JSON.stringify(stored));
  } catch (err) {
    full = true;
    console.log("Thumbnails background service's storage reached its limit and was emptied");
  } finally {
    chrome.runtime.sendMessage({ thumbnails_service: 'stored_updated' });
  }
}

function load() {
  var stored = JSON.parse(localStorage.getItem('dsNewTabThumbs'));
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

/***/ })

/******/ });