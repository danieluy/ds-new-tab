module.exports = {
  app_name: 'DsNewTab',
  bookmarks: 'Bookmarks',
  wallpaper: 'Wallpaper',
  about: {
    title: 'About',
    subtitle: `Chrome's new tab replacement by Daniel Sosa`,
    label: {
      description: 'Description',
      versioning: 'Versioning',
      author: 'Author'
    },
    description: {
      title: `Configurable new tab for Google Chrome browser.`,
      features_lbl: `Features:`,
      features: [
        `Bookmarks bar replacement in case you want to maintain the functionality from the default new tab. This functionality is fully synced across devices using the Chrome bookmarks API.`,
        `Wallpaper saved locally for better performance. The size of the used image is limited by browser's localStorage API, the and it is not recomended to use anything above 3MB.`,
        `Future versions will include custom shortcuts and more personalization.`
      ],
      changelog_lbl: 'Changelog:',
      changelog:{
        'v0.3.0':'New about panel',
        'v0.2.1':'Bug fixes',
        'v0.2.0':'New functionalities: Wallpaper and synced bookmarks',
        'v0.1.0':'Alpha1 with basic functionality'
      },
      author:{
        name: 'Daniel Sosa',
        web: 'www.danielsosa.uy',
        web_url: 'http://www.danielsosa.uy/dev'
      }
    }
  }
}