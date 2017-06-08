import React, { Component } from 'react';

import { app as styles, bookmarks_wrapper, color } from '../assets/styles';
import { DefaultWallpaper } from '../assets/wallpaper-default';

import StorageProvider from '../providers/StorageProvider';
import Language from '../assets/Language';
import BookmarksProvider from '../providers/BookmarksProvider';
import HistoryProvider from '../providers/HistoryProvider';
import Events from '../providers/EventsProvider';

import BookmarksList from './BookmarksList';
import MainDrawer from './MainDrawer';
import Wallpaper from './Wallpaper';
import History from './History';
import WallpaperSettingsDialog from './WallpaperSettingsDialog';
import BookmarksSettingsDialog from './BookmarksSettingsDialog';
import AboutPanelDialog from './AboutPanelDialog';
// import Tiles from './Tiles';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// Needed for onTouchTap ///////////////////////////////////////////////////////////
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
////////////////////////////////////////////////////////////////////////////////////

class App extends Component {
  constructor() {
    super();
    this.state = {
      lang: Language.getLang('en'),
      bookmarks: {
        bookmarks_bar: [],
        other_bookmarks: []
      },
      history: [],
      drawer_open: false,
      wallpaper_modal_open: false,
      wallpaper_backgroung_color: '#ffffff',
      about_panel_modal_open: false,
      bookmarks_modal_open: false,
      history_open: false,
      top_visited: []
    }
  }
  componentWillMount() {
    this.updateBookmarks();
    this.updateHistory();
    BookmarksProvider.onChange(this.updateBookmarks.bind(this));
    this.loadStoredState();
  }
  updateBookmarks() {
    BookmarksProvider.get()
      .then(bookmarks => {
        this.syncStoredState({
          bookmarks: {
            bookmarks_bar: bookmarks.bookmarks_bar,
            other_bookmarks: bookmarks.other_bookmarks
          },
          wallpaper_src: StorageProvider.loadLocal('wallpaper') || DefaultWallpaper
        })
      })
  }
  updateHistory() {
    HistoryProvider.get()
      .then(history => {
        this.syncStoredState({
          history: history
        })
      })
    HistoryProvider.getTop()
      .then(top => { console.log(top) })
  }
  syncStoredState(new_state) {
    this.setState(new_state, () => {
      StorageProvider.save('state', {
        bookmarks_on: this.state.bookmarks_on,
        wallpaper_on: this.state.wallpaper_on
      });
      StorageProvider.saveLocal('wallpaper', this.state.wallpaper_src);
    })
  }
  loadStoredState() {
    StorageProvider.load('state')
      .then((stored_state) => {
        this.syncStoredState({
          bookmarks_on: stored_state && stored_state.bookmarks_on !== undefined ? stored_state.bookmarks_on : false,
          wallpaper_on: stored_state && stored_state.wallpaper_on !== undefined ? stored_state.wallpaper_on : true
        });
      })
  }
  toggleDrawer() {
    this.syncStoredState({
      drawer_open: !this.state.drawer_open
    })
  }
  toggleWallpaperSettings() {
    this.syncStoredState({
      wallpaper_modal_open: !this.state.wallpaper_modal_open
    })
  }
  toggleBookmarksSettings() {
    this.syncStoredState({
      bookmarks_modal_open: !this.state.bookmarks_modal_open
    })
  }
  toggleAboutPanel() {
    this.syncStoredState({
      about_panel_modal_open: !this.state.about_panel_modal_open
    })
  }
  toggleHisrotyOpen() {
    this.syncStoredState({
      history_open: !this.state.history_open
    })
  }
  toggleBookmarks(evt, toggle) {
    this.syncStoredState({
      bookmarks_on: toggle
    })
  }
  handleWallpaperSettings(settings) {
    this.syncStoredState(settings);
  }
  handleBookmarksSettings(settings) {
    this.syncStoredState(settings);
  }
  requestAllURLPermission() {
    // Permissions must be requested from inside a user gesture, like a button's click handler.
    chrome.permissions.request({ origins: ["<all_urls>"] }, (granted) => {
      if (granted)
        console.log('Permission granted');
      else
        console.log('Permission denied');
    });
  }
  render() {
    console.log(this.state.top_visited)
    const LANG = this.state.lang;
    return (
      <MuiThemeProvider muiTheme={
        getMuiTheme.call(this, {
          palette: {
            primary1Color: color.primary
          }
        })
      }>
        <div /*Single element for MuiThemeProvider*/>

          <AppBar
            onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
            style={styles.app_bar.root}
            titleStyle={styles.app_bar.title}
            iconStyleLeft={styles.app_bar.iconLeft}
          />

          <MainDrawer
            status={{
              open: this.state.drawer_open,
              language: LANG
            }}
            actions={{
              onRequestChange: this.toggleDrawer.bind(this),
              app_bar: {
                onLeftIconButtonTouchTap: this.toggleDrawer.bind(this)
              },
              menu_items: {
                wallpaper: {
                  onTouchTap: this.toggleWallpaperSettings.bind(this)
                },
                bookmarks: {
                  onTouchTap: this.toggleBookmarksSettings.bind(this)
                },
                history: {
                  onTouchTap: this.toggleHisrotyOpen.bind(this)
                },
                permissions: {
                  onTouchTap: this.requestAllURLPermission
                },
                about: {
                  onTouchTap: this.toggleAboutPanel.bind(this)
                }
              }
            }}
          />

          <div style={styles.body_wrapper}>

            {this.state.bookmarks_on ?
              <div style={bookmarks_wrapper} className="bookmarks-bar">
                <BookmarksList
                  language={LANG}
                  bookmarks={this.state.bookmarks.bookmarks_bar}
                  actions={{
                    delete: BookmarksProvider.delete
                  }}
                />
              </div>
              : null
            }

            {/*<TilesFrame />*/}

          </div>


          <Wallpaper
            status={{
              visible: this.state.wallpaper_on
            }}
            src={this.state.wallpaper_src}
            color={this.state.wallpaper_backgroung_color}
          />

          <History
            status={{
              open: this.state.history_open
            }}
            actions={{
              open: this.toggleHisrotyOpen.bind(this)
            }}
            history={this.state.history}
          />


          {/*--  Dialogs  --------------------------------------------------------------------------------------*/}
          <WallpaperSettingsDialog
            status={{
              open: this.state.wallpaper_modal_open,
              main_switch_toggled: this.state.wallpaper_on,
              current_wallpaper: this.state.wallpaper_src
            }}
            handleSettings={this.handleWallpaperSettings.bind(this)}
            actions={{
              open: this.toggleWallpaperSettings.bind(this)
            }}
          />

          <BookmarksSettingsDialog
            status={{
              open: this.state.bookmarks_modal_open,
              main_switch_toggled: this.state.bookmarks_on,
              language: this.state.lang
            }}
            actions={{
              open: this.toggleBookmarksSettings.bind(this),
              handleSettings: this.handleBookmarksSettings.bind(this)
            }}
          />

          <AboutPanelDialog
            status={{
              open: this.state.about_panel_modal_open
            }}
            actions={{
              open: this.toggleAboutPanel.bind(this)
            }}
            lang={LANG}
          />

        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
