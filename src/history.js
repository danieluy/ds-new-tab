"use strict";

chrome.history.search({ text: '', startTime: 0 }, (res) => {
  res.map(page => {
    chrome.history.getVisits({ url: page.url }, (res) => {
      console.log(page.url, res.length)
    })
  })
})