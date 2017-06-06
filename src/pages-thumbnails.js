function createThumbnail() {
  chrome.tabs.onCreated.addListener(() => {
    chrome.tabs.query({ highlighted: true }, (tabs) => {
      chrome.tabs.captureVisibleTab({}, img => console.log(img))
    })
  })
}

createThumbnail();