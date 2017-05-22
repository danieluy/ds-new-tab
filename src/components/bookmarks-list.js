import React, { Component } from 'react';
import { bookmarks_list as styles } from './styles';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';
import SvgIcon from 'material-ui/SvgIcon';

const LinkIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </SvgIcon>
);

class BookmarksList extends Component {

  getBookmarksList(bookmarks) {
    return bookmarks.map((bookmark, i) => {
      if (bookmark.children)
        return this.getFolder(bookmark, i)
      else
        return this.getItem(i, bookmark, this.openURL.bind(this, bookmark.url));
    })
  }

  getItem(key, item, onTouchTap) {
    return <ListItem
      key={key}
      leftIcon={<LinkIcon style={{ marginRight: 24 }} />}
      primaryText={item.title ? item.title : item.url}
      /*secondaryText={item.url}*/
      onTouchTap={onTouchTap}
    />;
  }

  getFolder(folder, i) {
    return (
      <ListItem
        key={i}
        leftIcon={<FileFolder />}
        primaryText={folder.title}
        nestedItems={
          folder.children.map((child, j) => {
            if (child.children)
              return this.getFolder(child, j);
            return this.getItem(i + j + 1, child, this.openURL.bind(this, child.url));
          })
        }
        nestedListStyle={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      />
    )
  }

  openURL(url) {
    chrome.tabs.update(null, { url });
  }

  render() {
    return (
      <List style={styles.wrapper}>
        <Subheader>Bookmarks</Subheader>
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