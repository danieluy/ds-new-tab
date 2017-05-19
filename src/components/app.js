import React, { Component } from 'react';

import BookmarksProvider from '../bookmarks';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';


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
      drawer_open: false
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
  doNothing() {
    console.log('Nothing done!');
  }
  render() {
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    return (
      <MuiThemeProvider>
        <div>

          <AppBar
            title="DS Newtab"
            onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
          />

          <Drawer
            docked={false}
            width={250}
            open={this.state.drawer_open}
            onRequestChange={(drawer_open) => this.setState({ drawer_open })}
          >
            <MenuItem onTouchTap={this.doNothing}>Menu Item 1</MenuItem>
            <MenuItem onTouchTap={this.doNothing}>Menu Item 2</MenuItem>
          </Drawer>

          <div>
            {this.state.bookmarks.bookmarks_bar.map((bookmark, i) => {
              console.log(bookmark);
              return <Chip key={i} style={styles.chip}>{bookmark.title ? bookmark.title : bookmark.url}</Chip>
            })}
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
