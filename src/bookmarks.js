"use strict";

function getBookmarks() {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarks_tree) => {
      return resolve({
        bookmarks_bar: bookmarks_tree[0].children[0].children,
        other_bookmarks: bookmarks_tree[0].children[1].children
      });
    });
  })
}

module.exports = {
  get: getBookmarks
}