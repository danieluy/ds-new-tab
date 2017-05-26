import React, { Component } from 'react';

import { color } from './styles';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon color={color.white_075} />
  </IconButton>
);

export const ThreeDotsMenu = (options) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    {options.map((option, i) => <MenuItem key={i} onTouchTap={option.action}>{option.label}</MenuItem>)}
  </IconMenu>
);