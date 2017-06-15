# DS NewTab
## Changelog
### ToDo
 - Thumbnails provider that handles the most visited, and favorite thumbs
 - Handle the permissions request
 - Report issue rendering ListItem with secondaryText to Material-UI
### v0.3.0
* 20170615 | F | Working on thumbnails service implementation
* 20170615 | F | Solved some issues on thumbnails service
* 20170614 | F | Improved wallpaper loading performance
* 20170613 | F | Fixed reference on Wallpaper component
* 20170612 | P | Minor improvements to Tiles
* 20170609 | P | Added tiles
* 20170608 | P | Added ThumbnailsProvider
* 20170608 | R | Refactored MainDrawer
* 20170608 | R | Refactored MainDrawer
* 20170607 | R | Refactored lost of stuff
* 20170606 | P | Added first version of the thumbnails background service
* 20170606 | F | Completely stopped the styles leak (new workaround: encapsulate everything on #ds-new-tab)
* 20170605 | P | Improvements made to History's logic & UI
* 20170604 | P | Added menu toggle for History
* 20170602 | P | Added History list on Dialog, work in progress
* 20170601 | P | Added some logic to the HistoryProvider
* 20170601 | P | Minor UI improvements
* 20170601 | P | Added History provider
* 20170531 | P | New bookmark bar behaviour as drawer
* 20170531 | P | Improved scrollbar appearance
* 20170531 | F | Solved a Chrome bug that leaks styles, using more specific CSS selectors (workaround: ::-webkit-scrollbar -> div.custom-scrollbar::-webkit-scrollbar)
* 20170530 | P | New primary color blue500
* 20170530 | P | Added new info to about panel
* 20170529 | P | Added about panel
### v0.2.1
* 20170529 | F | Bookmarks folder delete function solved. It now checkes against .dateGroupModified instead of .children.
### v0.2.0
* 20170526 | P | Added Bookmarks syncing
* 20170526 | P | Added Bookmarks option delete
* 20170526 | P | Added Bookmarks favicons
* 20170526 | P | Added local storage error handling
* 20170525 | P | Added Wallpapers options
### v0.1.0
* 20170524 | P | Added basic functionality
* 20170518 | P | Switched to react
* 20170518 | P | PageTiles module ready & tested
* 20170518 | P | storage module ready & tested
* 20170509 | P | New scaffold for new development path
* 20170509 | P | Converted old idea to Chrome new tab replacement extension
* 20170509 | P | Started development
#### References
| Ref. | Meaning |
| ------ | ------ |
| P | Added something (plus) |
| M | Removed something (minus) |
| R | Refactoring |
| B | Bug |
| F | Bug fix |