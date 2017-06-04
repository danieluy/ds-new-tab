module.exports = {
  app_name: 'DS NewTab',
  bookmarks: 'Bookmarks',
  wallpaper: 'Wallpaper',
  history: 'History',
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
        `Future versions will include custom shortcuts and more personalization.`
      ]
    },
    changelog: {
      'v0.3.0': 'New about panel',
      'v0.2.1': 'Bug fixes',
      'v0.2.0': 'New functionalities: Wallpaper and synced bookmarks',
      'v0.1.0': 'Alpha1 with basic functionality'
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