"use strict";

const notify = require('./notifications');
let storage = require('./storage');
const LANG = require('./assets/lang').getLang();

function getBookmarks() {
  return storage.load('BOOKMARKS');
}

function setBookmarks(bookmarks) {
  return storage.save('BOOKMARKS', bookmarks);
}

function addBookmark(bookmark) {
  return getBookmarks().then((bookmarks) => {
    bookmarks.push(bookmark);
    return setBookmarks(bookmarks);
  })
}

module.exports = {
  get: getBookmarks,
  set: setBookmarks,
  add: addBookmark,
  stubStorageDependency: _storage => storage = _storage
}