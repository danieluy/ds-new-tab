import React, { Component } from 'react';

import SvgIcon from 'material-ui/SvgIcon';

export const BookmarkIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </SvgIcon>
);
export const WallpaperIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z" />
  </SvgIcon>
);
export const Download = (props) => (
  <SvgIcon {...props}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </SvgIcon>
);
export const Upload = (props) => (
  <SvgIcon {...props}>
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
  </SvgIcon>
);