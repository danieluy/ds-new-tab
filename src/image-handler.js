"use strict";

function toDataURL(file, callback) {
  var reader = new FileReader();
  reader.onloadend = function () {
    callback(reader.result);
  }
  reader.readAsDataURL(file);
}

function loadFile(callback) {
  return new Promise((resolve, reject) => {
    chrome.fileSystem.chooseEntry({}, (data) => {
      return resolve(data)
    });
  });
}

module.exports = {
  toDataURL: toDataURL,
  loadFile: loadFile
}