import React, { Component } from 'react';

import { app as styles } from '../assets/styles';


import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import { Bookmark, Wallpaper as WallpaperIcon, About, History as HistoryIcon, Permissions, Chart } from '../assets/icons';

class MainDrawer extends Component {
  render() {
    const LANG = this.props.status.language;
    return (
      <Drawer
        docked={false}
        width={400}
        open={this.props.status.open}
        onRequestChange={this.props.actions.onRequestChange}>
        <AppBar /*Drawer Header*/
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          title={LANG.app_name}
          onLeftIconButtonTouchTap={this.props.actions.app_bar.onLeftIconButtonTouchTap}
          style={styles.app_bar.drawer_header}
        />

        <Subheader>Components</Subheader>

        <MenuItem
          leftIcon={<WallpaperIcon />}
          onTouchTap={this.props.actions.menu_items.wallpaper.onTouchTap}>{LANG.wallpaper}
        </MenuItem>

        <MenuItem
          leftIcon={<Bookmark />}
          onTouchTap={this.props.actions.menu_items.bookmarks.onTouchTap}>{LANG.bookmarks}
        </MenuItem>

        <MenuItem
          leftIcon={<Chart />}
          onTouchTap={this.props.actions.menu_items.top_visited.onTouchTap}>{LANG.top_visited}
        </MenuItem>

        <MenuItem
          leftIcon={<HistoryIcon />}
          onTouchTap={this.props.actions.menu_items.history.onTouchTap}>{LANG.history}
        </MenuItem>

        <Divider />

        <Subheader>Miscellaneous</Subheader>

        <MenuItem
          leftIcon={<Permissions />}
          onTouchTap={this.props.actions.menu_items.permissions.onTouchTap}>{LANG.permissions}
        </MenuItem>

        <MenuItem
          leftIcon={<About />}
          onTouchTap={this.props.actions.menu_items.about.onTouchTap}>{LANG.about.title}
        </MenuItem>

      </Drawer>
    );
  }
}

export default MainDrawer;