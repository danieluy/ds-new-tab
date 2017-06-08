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
/******/ 	return __webpack_require__(__webpack_require__.s = 218);
/******/ })
/************************************************************************/
/******/ ({

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  getTab(tabId).then(function (tab) {
    return captureVisibleTab();
  }).then(function (thumb) {
    save({ tab: tab, thumb: thumb });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.getThumbs === "simple") sendResponse(load());
});

function captureVisibleTab() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.captureVisibleTab({ format: 'jpeg', quality: 10 }, function (img) {
      resolve(img);
    });
  });
}

function getTab(tabId) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.get(tabId, function (tab) {
      return resolve(tab);
    });
  });
}

function save(thumbs) {
  var stored = load();
  if (Array.prototype.isPrototypeOf(stored)) stored.push(thumbs);else stored = [];
  localStorage.setItem('dsNewTabThumbs', JSON.stringify(stored));
}

function load() {
  var stored = JSON.parse(localStorage.getItem('dsNewTabThumbs'));
  if (stored.length > 200) reset();
  return stored;
}

function reset() {
  localStorage.setItem('dsNewTabThumbs', JSON.stringify([]));
}

/***/ })

/******/ });