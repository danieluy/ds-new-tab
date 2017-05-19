import React, { Component } from 'react';
import { bookmarks_list as styles } from './styles';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';

class BookmarksList extends Component {

  getBookmarksList(bookmarks) {
    console.log(bookmarks)
    return bookmarks.map((bookmark, i) => {
      if (bookmark.children)
        return this.getFolder(bookmark, i)
      else
        return this.getItem(i, bookmark, this.openURL.bind(this, bookmark.url));
    })
  }

  getItem(key, item, onTouchTap) {
    console.log(onTouchTap)
    return <ListItem
      key={key}
      primaryText={item.title ? item.title : item.url}
      secondaryText={item.url}
      onTouchTap={onTouchTap}
    />;
  }

  fetchFavicon(URL) {
    // `https://www.google.com/s2/favicons?domain=${URL}`
  }

  getFolder(folder, i) {
    return (
      <ListItem
        key={i}
        leftAvatar={<Avatar icon={<FileFolder />} />}
        primaryText={folder.title}
        nestedItems={
          folder.children.map((child, j) => {
            if (child.children)
              return this.getFolder(child, j);
            return this.getItem(i + j + 1, child, this.openURL.bind(this, child.url));
          })
        }
      />
    )
  }

  openURL(url) {
    chrome.tabs.update(null, { url });
  }

  render() {
    return (
      <List style={styles.wrapper}>
        {this.getBookmarksList(this.props.bookmarks)}
        {/*<ListItem
          value={1}
          primaryText="Brendan Lim"
          leftAvatar={<Avatar src="http://lorempixel.com/output/people-q-c-200-200-8.jpg" />}
          nestedItems={[
            <ListItem key={2}
              value={2}
              primaryText="Grace Ng"
              leftAvatar={<Avatar src="http://lorempixel.com/output/people-q-c-200-200-7.jpg" />}
            />,
          ]}
        />*/}
      </List>
    );
  }
}

export default BookmarksList;