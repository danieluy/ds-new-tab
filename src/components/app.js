import React, { Component } from 'react';

import { app as styles, bookmarks_wrapper, color } from '../assets/styles';

import StorageProvider from '../providers/StorageProvider';
import Language from '../assets/Language';
import BookmarksProvider from '../providers/BookmarksProvider';
import HistoryProvider from '../providers/HistoryProvider';
import ThumbnailsProvider from '../providers/ThumbnailsProvider';

import BookmarksList from './BookmarksList';
import Wallpaper from './Wallpaper';
import History from './History';
import WallpaperSettingsDialog from './WallpaperSettingsDialog';
import BookmarksSettingsDialog from './BookmarksSettingsDialog';
import AboutPanelDialog from './AboutPanelDialog';
import Tiles from './Tiles';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';

import { Bookmark, Wallpaper as WallpaperIcon, About, History as HistoryIcon, Permissions } from '../assets/icons';
import { DefaultWallpaper } from '../assets/wallpaper-default';

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
      history_open: false
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
  }
  syncStoredState(new_state) {
    this.setState(new_state, () => {
      StorageProvider.save('state', {
        bookmarks_on: this.state.bookmarks_on,
        wallpaper_on: this.state.wallpaper_on
      })
      StorageProvider.saveLocal('wallpaper', this.state.wallpaper_src)
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
      // The callback argument will be true if the user granted the permissions.
      if (granted)
        console.log('Permission granted');
      else
        console.log('Permission denied');
    });
  }
  render() {
    const LANG = this.state.lang;
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue500
      }
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>

          <AppBar
            onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
            style={styles.app_bar.root}
            titleStyle={styles.app_bar.title}
            iconStyleLeft={styles.app_bar.iconLeft}
          />

          <Drawer
            docked={false}
            width={400}
            open={this.state.drawer_open}
            onRequestChange={(drawer_open) => this.syncStoredState({ drawer_open })}>
            <AppBar /*Drawer Header*/
              iconElementLeft={<IconButton><NavigationClose /></IconButton>}
              title={LANG.app_name}
              onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
              style={styles.app_bar.drawer_header}
            />

            <MenuItem
              leftIcon={<WallpaperIcon />}
              onTouchTap={this.toggleWallpaperSettings.bind(this)}>{LANG.wallpaper}
            </MenuItem>

            <MenuItem
              leftIcon={<Bookmark />}
              onTouchTap={this.toggleBookmarksSettings.bind(this)}>{LANG.bookmarks}
            </MenuItem>

            <MenuItem
              leftIcon={<HistoryIcon />}
              onTouchTap={this.toggleHisrotyOpen.bind(this)}>{LANG.history}
            </MenuItem>

            <Divider />

            <MenuItem
              leftIcon={<Permissions />}
              onTouchTap={this.requestAllURLPermission}>{LANG.permissions}
            </MenuItem>

            <MenuItem
              leftIcon={<About />}
              onTouchTap={this.toggleAboutPanel.bind(this)}>{LANG.about.title}
            </MenuItem>

          </Drawer>

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
