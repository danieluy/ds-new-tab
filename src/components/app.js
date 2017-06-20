import React, { Component } from 'react';

import { app as styles, bookmarks_wrapper, color } from '../assets/styles';
import { DefaultWallpaper } from '../assets/images-base64/wallpaper-default';

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
import TopVisitedSettingsDialog from './TopVisitedSettingsDialog';
import AboutPanelDialog from './AboutPanelDialog';
import Tiles from './Tiles';

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
      wallpaper_src: null,
      wallpaper_settings_dialog_open: false,
      wallpaper_backgroung_color: '#eeeeee',
      about_panel_modal_open: false,
      bookmarks_settings_dialog_open: false,
      history_open: false,
      top_visited_on: false,
      top_visited_settings_dialog_open: false,
      top_visited: [],
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }

  componentWillMount() {
    this.updateWallpaper();
    this.updateStateFromStored();
  }

  componentDidMount() {
    this.updateBookmarks();
    this.updateHistory();
    this.updateTopVisited();
    this.checkPermissions();
    Events.on('bookmars_changed', this.updateBookmarks.bind(this));
    Events.on('top_visited_updated', this.updateTopVisited.bind(this));
    window.onresize = this.updateWindowState.bind(this);
  }

  updateWindowState() {
    this.setState({
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  syncStoredState(new_state) {
    this.setState(new_state, () => {
      StorageProvider.sync('state', {
        bookmarks_on: this.state.bookmarks_on,
        wallpaper_on: this.state.wallpaper_on,
        top_visited_on: this.state.top_visited_on
      });
      StorageProvider.saveLocal('wallpaper', this.state.wallpaper_src);
    })
  }
  updateStateFromStored() {
    StorageProvider.load('state')
      .then((stored_state) => {
        this.syncStoredState({
          bookmarks_on: (stored_state && stored_state.bookmarks_on !== undefined) ? stored_state.bookmarks_on : true,
          wallpaper_on: (stored_state && stored_state.wallpaper_on !== undefined) ? stored_state.wallpaper_on : true,
          top_visited_on: (stored_state && stored_state.top_visited_on !== undefined) ? stored_state.top_visited_on : false
        });
      })
  }

  updateWallpaper() {
    this.syncStoredState({
      wallpaper_src: StorageProvider.loadLocal('wallpaper') || DefaultWallpaper
    })
  }
  updateTopVisited() {
    this.syncStoredState({
      top_visited: HistoryProvider.getTopTen()
    })
  }
  updateBookmarks() {
    BookmarksProvider.get()
      .then(bookmarks => {
        this.syncStoredState({
          bookmarks: {
            bookmarks_bar: bookmarks.bookmarks_bar,
            other_bookmarks: bookmarks.other_bookmarks
          }
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
  toggleDrawer() {
    this.syncStoredState({
      drawer_open: !this.state.drawer_open
    })
  }
  toggleWallpaperSettings() {
    this.syncStoredState({
      wallpaper_settings_dialog_open: !this.state.wallpaper_settings_dialog_open
    })
  }
  toggleBookmarksSettings() {
    this.syncStoredState({
      bookmarks_settings_dialog_open: !this.state.bookmarks_settings_dialog_open
    })
  }
  toggleTopVisitedSettings() {
    this.syncStoredState({
      top_visited_settings_dialog_open: !this.state.top_visited_settings_dialog_open
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
  handleSettings(settings) {
    this.syncStoredState(settings);
  }
  render() {
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
                top_visited: {
                  onTouchTap: this.toggleTopVisitedSettings.bind(this)
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

            {this.state.bookmarks_on && this.state.window.width >= 1000 ?
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

            {this.state.top_visited_on ?
              <Tiles
                status={{
                  tiles: this.state.top_visited
                }}
              />
              : null
            }

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
              open: this.state.wallpaper_settings_dialog_open,
              main_switch_toggled: this.state.wallpaper_on,
              current_wallpaper: this.state.wallpaper_src
            }}
            handleSettings={this.handleSettings.bind(this)}
            actions={{
              open: this.toggleWallpaperSettings.bind(this)
            }}
          />

          <BookmarksSettingsDialog
            status={{
              open: this.state.bookmarks_settings_dialog_open,
              main_switch_toggled: this.state.bookmarks_on,
              language: this.state.lang
            }}
            actions={{
              open: this.toggleBookmarksSettings.bind(this),
              handleSettings: this.handleSettings.bind(this)
            }}
          />

          <TopVisitedSettingsDialog
            status={{
              open: this.state.top_visited_settings_dialog_open,
              main_switch_toggled: this.state.top_visited_on,
              language: this.state.lang
            }}
            actions={{
              open: this.toggleTopVisitedSettings.bind(this),
              handleSettings: this.handleSettings.bind(this)
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
