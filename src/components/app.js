import React, { Component } from 'react';

import { app as styles, bookmarks_wrapper, color } from './styles';

import Lang from '../assets/lang';
import Storage from '../storage';
import BookmarksProvider from '../bookmarks';
import ImageHandler from '../image-handler';

import BookmarksList from './bookmarks-list';
import Wallpaper from './wallpaper';
import WallpaperSettings from './wallpaper-settings';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { BookmarkIcon, WallpaperIcon } from '../assets/icons';
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
      lang: Lang.getLang('en'),
      bookmarks: {
        bookmarks_bar: [],
        other_bookmarks: []
      },
      drawer_open: false,
      wallpaper_modal_open: false,
      wallpaper_backgroung_color: '#D7211A'
    }

  }
  componentWillMount() {
    BookmarksProvider.get().then(bookmarks => {
      this.syncStoredState({
        bookmarks: {
          bookmarks_bar: bookmarks.bookmarks_bar,
          other_bookmarks: bookmarks.other_bookmarks
        },
        wallpaper_src: Storage.loadLocal('wallpaper') || DefaultWallpaper
      })
    })
    this.loadStoredState();
  }
  syncStoredState(new_state) {
    this.setState(new_state, () => {
      Storage.save('state', {
        bookmarks_on: this.state.bookmarks_on,
        wallpaper_on: this.state.wallpaper_on
      })
      Storage.saveLocal('wallpaper', this.state.wallpaper_src)
    })
  }
  loadStoredState() {
    Storage.load('state')
      .then((stored_state) => {
        this.syncStoredState({
          bookmarks_on: stored_state.bookmarks_on !== undefined ? stored_state.bookmarks_on : true,
          wallpaper_on: stored_state.wallpaper_on !== undefined ? stored_state.wallpaper_on : true
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
  toggleBookmarks(evt, toggled) {
    this.syncStoredState({
      bookmarks_on: toggled
    })
  }
  handleWallpaperSettings(settings) {
    this.syncStoredState(settings);
  }
  render() {
    if (this.state.wallpaper_src)
      console.log(this.state.wallpaper_src.slice(0, 50))
    const LNG = this.state.lang;
    return (
      <MuiThemeProvider>
        <div>

          <AppBar
            title={LNG.app_name}
            onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
            style={styles.app_bar.root}
            titleStyle={styles.app_bar.title}
            iconStyleLeft={styles.app_bar.iconLeft}
          />

          <Drawer
            docked={false}
            width={250}
            open={this.state.drawer_open}
            onRequestChange={(drawer_open) => this.syncStoredState({ drawer_open })}>
            <AppBar /*Drawer Header*/
              iconElementLeft={<IconButton><NavigationClose /></IconButton>}
              title={LNG.app_name}
              onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
              style={styles.app_bar.drawer_header}
            />
            <MenuItem /*disabled={true}*/ leftIcon={<WallpaperIcon />} onTouchTap={this.toggleWallpaperSettings.bind(this)}>{LNG.wallpaper}</MenuItem>
            <MenuItem leftIcon={<BookmarkIcon />}>
              <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
                <Toggle
                  label={LNG.bookmarks}
                  defaultToggled={this.state.bookmarks_on}
                  onToggle={this.toggleBookmarks.bind(this)}
                />
              </div>
            </MenuItem>
          </Drawer>

          <div style={styles.body_wrapper}>

            {this.state.bookmarks_on ?
              <div style={bookmarks_wrapper}>
                <BookmarksList language={LNG} bookmarks={this.state.bookmarks.bookmarks_bar} />
              </div>
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
          <WallpaperSettings
            status={{
              open: this.state.wallpaper_modal_open,
              switch_visible: this.state.wallpaper_on,
              current_wallpaper: this.state.wallpaper_src
            }}
            handleSettings={this.handleWallpaperSettings.bind(this)}
            actions={{
              ok: this.toggleWallpaperSettings.bind(this)
            }}
          />



        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
