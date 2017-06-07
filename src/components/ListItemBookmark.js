import React, { Component } from 'react';

import url from 'url';

import { Bookmark, Extension, Settings, Link } from '../assets/icons';

import { color } from '../assets/styles';

import { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { ThreeDotsMenu } from './ThreeDotsMenu';

class ListItemBookmark extends Component {

  getFavicon(URL) {
    const parsed = url.parse(URL);
    const styles = {
      container: {
        height: '56px',
        paddingTop: '11px',
        paddingLeft: '3px'
      },
      favicon: {
        fill: color.white_075,
        width: '18px',
        height: '18px'
      }
    }
    if (parsed.hostname === 'bookmarks')
      return (
        <div style={styles.container}>
          <Bookmark style={styles.favicon} />
        </div>
      )
    if (parsed.hostname === 'extensions')
      return (
        <div style={styles.container}>
          <Extension style={styles.favicon} />
        </div>
      )
    if (parsed.hostname === 'settings')
      return (
        <div style={styles.container}>
          <Settings style={styles.favicon} />
        </div>
      )
    return (
      <div style={styles.container}>
        <img src={`http://s2.googleusercontent.com/s2/favicons?domain_url=${`${parsed.protocol}//${parsed.hostname}`}`} />
      </div>
    )
  }

  render() {
    return (
      <ListItem
        style={{ color: color.white_075 }}
        leftAvatar={this.getFavicon(this.props.item.url)}
        //leftIcon={<Link style={{ fill: color.white_075 }} />}
        rightIconButton={ThreeDotsMenu(this.props.options)}
        primaryText={this.props.item.title ? this.props.item.title : this.props.item.url}
        onTouchTap={this.props.onTouchTap}
      />
    );
  }
}

export default ListItemBookmark;