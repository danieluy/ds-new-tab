import React, { Component } from 'react';

import url from 'url';

import { Bookmark, Extension, Settings, Link } from '../assets/icons';

import { color } from './styles';

import { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { ThreeDotsMenu } from './three-dots-menu';

class ListItemBookmark extends Component {

  getFavicon(URL) {
    const parsed = url.parse(URL);
    if (parsed.hostname === 'bookmarks')
      return (
        <div style={{ height: '56px', paddingTop: '10px' }}>
          <Bookmark style={{ fill: color.white_075, width: '18px', height: '18px' }} />
        </div>
      )
    if (parsed.hostname === 'extensions')
      return (
        <div style={{ height: '56px', paddingTop: '10px' }}>
          <Extension style={{ fill: color.white_075, width: '18px', height: '18px' }} />
        </div>
      )
    if (parsed.hostname === 'settings')
      return (
        <div style={{ height: '56px', paddingTop: '10px' }}>
          <Settings style={{ fill: color.white_075, width: '18px', height: '18px' }} />
        </div>
      )
    return (
      <div style={{ height: '56px', paddingTop: '10px' }}>
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