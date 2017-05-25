import React, { Component } from 'react';
import { bookmarks_list as styles, color } from './styles';

import ListItemPlus from './bookmarks-list-item';

import { List, ListItem } from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';

class BookmarksList extends Component {

  getBookmarksList(bookmarks) {
    return bookmarks.map((bookmark, i) => {
      if (bookmark.children)
        return this.getFolder(bookmark, i)
      return <ListItemPlus key={i} item={bookmark} onTouchTap={this.openURL.bind(this, bookmark.url)} />;
    })
  }

  openURL(url) {
    chrome.tabs.update(null, { url });
  }

  getFolder(folder, i) {
    return (
      <ListItem
        key={i}
        leftIcon={<FileFolder style={{ fill: color.white_075 }} />}
        primaryText={folder.title}
        style={{ color: color.white_075 }}
        nestedListStyle={{ backgroundColor: color.black_005 }}
        nestedItems={
          folder.children.map((child, j) => {
            if (child.children)
              return this.getFolder(child, j);
            return <ListItemPlus key={i + j + 1} item={child} onTouchTap={this.openURL.bind(this, child.url)} />;
          })
        }
      />
    )
  }

  render() {
    return (
      <List style={styles.wrapper}>
        <Subheader style={{ color: color.white_075 }}>{this.props.language.bookmarks}</Subheader>
        {this.getBookmarksList(this.props.bookmarks)}
      </List>
    );
  }
}

export default BookmarksList;