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
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


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
      wallpaper_modal_open: false
    }

  }
  syncStoredState(new_state) {
    this.setState(new_state, () => {
      Storage.save('state', {
        bookmarks_on: this.state.bookmarks_on,
        wallpaper_on: this.state.wallpaper_on
      })
    })
  }
  loadStoredState() {
    Storage.load('state')
      .then((stored_state) => {
        console.log('Stored State:', stored_state)
        this.syncStoredState({
          bookmarks_on: stored_state.bookmarks_on !== undefined ? stored_state.bookmarks_on : true,
          wallpaper_on: stored_state.wallpaper_on !== undefined ? stored_state.wallpaper_on : true
        });
      })
  }
  componentWillMount() {
    BookmarksProvider.get().then(bookmarks => {
      this.syncStoredState({
        bookmarks: {
          bookmarks_bar: bookmarks.bookmarks_bar,
          other_bookmarks: bookmarks.other_bookmarks
        }
      })
    })
    this.loadStoredState();
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
    this.syncStoredState({
      wallpaper_on: settings.wallpaper_visible
    })
  }
  render() {
    const LNG = this.state.lang;
    const BookmarkIcon = (props) => (
      <SvgIcon {...props}>
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
      </SvgIcon>
    );
    const WallpaperIcon = (props) => (
      <SvgIcon {...props}>
        <path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z" />
      </SvgIcon>
    );
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
            src={'http://cdn.wallpapersafari.com/1/42/PcS1bg.jpg'}
          />
          <WallpaperSettings
            status={{
              open: this.state.wallpaper_modal_open,
              switch_visible: this.state.wallpaper_on
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
