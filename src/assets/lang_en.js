module.exports = {
  app_name: 'DS NewTab',
  bookmarks: 'Bookmarks',
  wallpaper: 'Wallpaper',
  top_visited: 'Most Visited',
  history: 'History',
  active: 'Active',
  permissions: 'Enable thumbnails on recent shortcuts',
  about: {
    title: 'About',
    subtitle: `Chrome's new tab replacement by Daniel Sosa`,
    label: {
      description: 'Description',
      versioning: 'Versioning',
      author: 'Author',
      changelog: 'Changelog',
      features: `Features`,
      license: 'License'
    },
    description: {
      title: `Configurable new tab for Google Chrome browser.`,
      features: [
        `Bookmarks bar replacement in case you want to maintain the functionality from the default new tab. This functionality is fully synced across devices using the Chrome bookmarks API.`,
        `Wallpaper saved locally for better performance. The size of the used image is limited by browser's localStorage API, the and it is not recomended to use anything above 3MB.`,
        `Tiles displaying the top five of the most visited sites with thumbnails. Optional feature that uses your local history.`,
        `Simple local history viewer.`
      ]
    },
    changelog: {
      'v0.6.3': 'New default wallpaper & Permissions handling',
      'v0.6.2': 'Added Tiles settings & Bug fixes',
      'v0.6.1': 'Lots of bug fixes and some performance improvements',
      'v0.6.0': 'New functionality Tiles (most visited thumbnails)',
      'v0.5.1': 'Under the hood improvements',
      'v0.5.0': 'New functionality Thumbnails background service',
      'v0.4.2': 'Mayor bug fix',
      'v0.4.1': 'Improved History functionality',
      'v0.4.0': 'New functionality History Viewer',
      'v0.3.1': 'New Bookmarks drawer & bug fixes',
      'v0.3.0': 'New About panel',
      'v0.2.1': 'Bug fixes',
      'v0.2.0': 'New functionalities: Wallpaper and synced bookmarks',
      'v0.1.0': 'Alpha with basic functionality'
    },
    author: {
      name: 'Daniel Sosa',
      web: 'www.danielsosa.uy',
      web_url: 'http://www.danielsosa.uy/dev'
    },
    license: {
      title: 'MIT License',
      subtitle: 'Copyright (c) 2017 danielsosauy',
      body: [
        `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:`,
        `The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.`,
        `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
      ]
    }
  }
}