import React, { PureComponent } from 'react';

import _ from 'lodash';

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
import Clock from './Clock';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// Needed for onTouchTap ///////////////////////////////////////////////////////////
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
////////////////////////////////////////////////////////////////////////////////////

class App extends PureComponent {
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
    Events.on('bookmars_changed', this.updateBookmarks.bind(this));
    Events.on('top_visited_updated', this.updateTopVisited.bind(this));
    window.onresize = _.debounce(this.updateWindowState.bind(this));
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
  updateHistory() {
    HistoryProvider.get()
      .then(history => {
        this.syncStoredState({
          history: history
        })
      })
  }
  openCloseDrawer() {
    this.syncStoredState({
      drawer_open: !this.state.drawer_open
    })
  }
  openCloseWallpaperDialog() {
    this.syncStoredState({
      wallpaper_settings_dialog_open: !this.state.wallpaper_settings_dialog_open
    })
  }
  openCloseBookmarksDialog() {
    this.syncStoredState({
      bookmarks_settings_dialog_open: !this.state.bookmarks_settings_dialog_open
    })
  }
  openCloseTopVisitedDialog() {
    this.syncStoredState({
      top_visited_settings_dialog_open: !this.state.top_visited_settings_dialog_open
    })
  }
  openCloseAboutPanel() {
    this.syncStoredState({
      about_panel_modal_open: !this.state.about_panel_modal_open
    })
  }
  openHistoryDialog() {
    this.syncStoredState({
      history_open: !this.state.history_open
    })
  }
  handleSettingsFromChilds(settings) {
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

          <Clock />

          <AppBar
            onLeftIconButtonTouchTap={this.openCloseDrawer.bind(this)}
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
              onRequestChange: this.openCloseDrawer.bind(this),
              app_bar: {
                onLeftIconButtonTouchTap: this.openCloseDrawer.bind(this)
              },
              menu_items: {
                wallpaper: {
                  onTouchTap: this.openCloseWallpaperDialog.bind(this)
                },
                bookmarks: {
                  onTouchTap: this.openCloseBookmarksDialog.bind(this)
                },
                top_visited: {
                  onTouchTap: this.openCloseTopVisitedDialog.bind(this)
                },
                history: {
                  onTouchTap: this.openHistoryDialog.bind(this)
                },
                permissions: {
                  onTouchTap: this.requestAllURLPermission
                },
                about: {
                  onTouchTap: this.openCloseAboutPanel.bind(this)
                }
              }
            }}
          />

          <div style={styles.body_wrapper}>

            <div style={bookmarks_wrapper} className="bookmarks-bar">
              <BookmarksList
                language={LANG}
                bookmarks={this.state.bookmarks.bookmarks_bar}
                actions={{
                  delete: BookmarksProvider.delete
                }}
                visible={this.state.bookmarks_on && this.state.window.width >= 1000}
              />
            </div>

            <Tiles
              status={{
                tiles: this.state.top_visited
              }}
              visible={this.state.top_visited_on}
            />

          </div>

          <Wallpaper
            visible={this.state.wallpaper_on}
            src={this.state.wallpaper_src}
            color={this.state.wallpaper_backgroung_color}
          />

          <History
            visible={this.state.history_open}
            onRequestClose={this.openHistoryDialog.bind(this)}
            history={this.state.history}
          />


          {/*--  Dialogs  --------------------------------------------------------------------------------------*/}
          <WallpaperSettingsDialog
            status={{
              open: this.state.wallpaper_settings_dialog_open,
              main_switch_toggled: this.state.wallpaper_on,
              current_wallpaper: this.state.wallpaper_src
            }}
            handleSettings={this.handleSettingsFromChilds
              .bind(this)}
            actions={{
              open: this.openCloseWallpaperDialog.bind(this)
            }}
          />

          <BookmarksSettingsDialog
            status={{
              open: this.state.bookmarks_settings_dialog_open,
              main_switch_toggled: this.state.bookmarks_on,
              language: this.state.lang
            }}
            actions={{
              open: this.openCloseBookmarksDialog.bind(this),
              handleSettings: this.handleSettingsFromChilds
                .bind(this)
            }}
          />

          <TopVisitedSettingsDialog
            status={{
              open: this.state.top_visited_settings_dialog_open,
              main_switch_toggled: this.state.top_visited_on,
              language: this.state.lang
            }}
            actions={{
              open: this.openCloseTopVisitedDialog.bind(this),
              handleSettings: this.handleSettingsFromChilds
                .bind(this)
            }}
          />

          <AboutPanelDialog
            status={{
              open: this.state.about_panel_modal_open
            }}
            actions={{
              open: this.openCloseAboutPanel.bind(this)
            }}
            lang={LANG}
          />

        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
