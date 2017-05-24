import React, { Component } from 'react';

import { app as styles, bookmarks_wrapper, color } from './styles';

import BookmarksProvider from '../bookmarks';
import ImageHandler from '../image-handler';

import BookmarksList from './bookmarks-list';
import Wallpaper from './wallpaper';
import WallpaperSettings from './wallpaper-settings';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


// Needed for onTouchTap ///////////////////////////////////////////////////////////
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
////////////////////////////////////////////////////////////////////////////////////

class App extends Component {
  constructor() {
    super();
    this.state = {
      bookmarks: {
        bookmarks_bar: [],
        other_bookmarks: []
      },
      drawer_open: false,
      wallpaper_modal_open: false
    }
  }
  componentWillMount() {
    BookmarksProvider.get().then(bookmarks => {
      this.setState({
        bookmarks: {
          bookmarks_bar: bookmarks.bookmarks_bar,
          other_bookmarks: bookmarks.other_bookmarks
        }
      })
    })
  }
  toggleDrawer() {
    this.setState({
      drawer_open: !this.state.drawer_open
    })
  }
  toggleWallpaperSettings() {
    this.setState({
      wallpaper_modal_open: !this.state.wallpaper_modal_open
    })
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>

          <AppBar
            title="DS Newtab"
            onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
            style={styles.app_bar.root}
            titleStyle={styles.app_bar.title}
            iconStyleLeft={styles.app_bar.iconLeft}
          />

          <Drawer
            docked={false}
            width={250}
            open={this.state.drawer_open}
            onRequestChange={(drawer_open) => this.setState({ drawer_open })}>

            <MenuItem onTouchTap={this.toggleWallpaperSettings.bind(this)}>Wallpaper Settings</MenuItem>
          </Drawer>

          <div style={styles.body_wrapper}>

            <div style={bookmarks_wrapper}>
              <BookmarksList bookmarks={this.state.bookmarks.bookmarks_bar} />
            </div>

          </div>

          <Wallpaper src={'http://cdn.wallpapersafari.com/1/42/PcS1bg.jpg'}>
          </Wallpaper>
          <WallpaperSettings
            open={this.state.wallpaper_modal_open}
            actions={{
              cancel: this.toggleWallpaperSettings.bind(this),
              submit: this.toggleWallpaperSettings.bind(this)
            }}
          />
          {/*<Wallpaper src={'http://wallpaper-gallery.net/images/white-wallpaper/white-wallpaper-24.jpg'} />*/}



        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
