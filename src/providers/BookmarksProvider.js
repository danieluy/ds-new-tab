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

function deleteBookmark(id) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.get(id, (bookmark) => {
      if (bookmark[0].dateGroupModified)
        chrome.bookmarks.removeTree(id, () => {
          resolve();
        })
      else
        chrome.bookmarks.remove(id, () => {
          resolve();
        })
    })
  })
}

function onChange(cb){
  chrome.bookmarks.onCreated.addListener(cb);
  chrome.bookmarks.onRemoved.addListener(cb);
  chrome.bookmarks.onChanged.addListener(cb);
  chrome.bookmarks.onMoved.addListener(cb);
  chrome.bookmarks.onChildrenReordered.addListener(cb);
  chrome.bookmarks.onImportBegan.addListener(cb);
  chrome.bookmarks.onImportEnded.addListener(cb);
}

module.exports = {
  get: getBookmarks,
  delete: deleteBookmark,
  onChange: onChange
}