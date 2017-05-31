import React, { Component } from 'react';
import { bookmarks_list as styles, color } from './styles';

import ListItemBookmark from './list-item-bookmark';
import { ThreeDotsMenu } from './three-dots-menu';

import { List, ListItem } from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';


class BookmarksList extends Component {

  deleteBookmark;

  constructor(props){
    super();
    this.deleteBookmark = props.actions.delete
  }

  getBookmarksList(bookmarks) {
    return bookmarks.map((bookmark, i) => {
      if (bookmark.children)
        return this.getFolder(bookmark, i)
      return <ListItemBookmark
        options={[
          {
            label: 'Delete',
            action: this.deleteBookmark.bind(this, bookmark.id)
          }
        ]}
        key={bookmark.id}
        item={bookmark}
        onTouchTap={this.openURL.bind(this, bookmark.url)}
      />;
    })
  }

  openURL(url) {
    chrome.tabs.update(null, { url });
  }

  getFolder(folder, i) {
    return (
      <ListItem
        key={folder.id}
        leftIcon={<FileFolder style={{ fill: color.white_075 }} />}
        primaryText={folder.title}
        style={{ color: color.white_075 }}
        nestedListStyle={{ backgroundColor: color.black_005 }}
        primaryTogglesNestedList={true}
        autoGenerateNestedIndicator={false}
        rightIconButton={ThreeDotsMenu([
          {
            label: 'Delete',
            action: this.deleteBookmark.bind(this, folder.id)
          }
        ])}
        nestedItems={
          folder.children.map((child, j) => {
            if (child.children)
              return this.getFolder(child, j);
            return <ListItemBookmark
              options={[
                {
                  label: 'Delete',
                  action: this.deleteBookmark.bind(this, child.id)
                }
              ]}
              key={child.id}
              item={child}
              onTouchTap={this.openURL.bind(this, child.url)}
            />;
          })
        }
      />
    )
  }

  render() {
    return (
      <List style={styles.wrapper} className="custom-scrollbar">
        {/*<Subheader style={{ color: color.white_075 }}>{this.props.language.bookmarks}</Subheader>*/}
        {this.getBookmarksList(this.props.bookmarks)}
      </List>
    );
  }
}

export default BookmarksList;