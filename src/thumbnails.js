"use strict";

function test() {
  chrome.runtime.sendMessage({ getThumbs: "" }, (thumbs) => {
    this.setState({
      thumbs: thumbs
    })
  });
}

module.exports = {
  test: test
}