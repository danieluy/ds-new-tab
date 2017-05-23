import React, { Component } from 'react';

import { color } from './styles';

import { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


const LinkIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </SvgIcon>
);

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Options"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={color.white_075} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Open</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class ListItemPlus extends Component {
  render() {
    return (
      <ListItem
        style={{ color: color.white_075 }}
        leftIcon={<LinkIcon style={{ fill: color.white_075 }} />}
        rightIconButton={rightIconMenu}
        primaryText={this.props.item.title ? this.props.item.title : this.props.item.url}
        onTouchTap={this.props.onTouchTap}
      />
    );
  }
}

export default ListItemPlus;