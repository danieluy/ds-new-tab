import React, { Component } from 'react';

import Storage from '../storage';

import { blue500 } from 'material-ui/styles/colors';

import { WallpaperIcon } from '../assets/icons';

class Wallpaper extends Component {
  render() {
    if (this.props.status.visible && this.props.src)
      return (
        <div style={{
          backgroundImage: `url("${this.props.src}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'fixed',
          width: '100%',
          height: '100vh',
          zIndex: '-1'
        }} />
      );
    else if (this.props.status.visible)
      return (
        <div style={{
          backgroundColor: `${this.props.color}`,
          position: 'fixed',
          width: '100%',
          height: '100vh',
          zIndex: '-1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <WallpaperIcon style={{ height: '200px', width: '200px', fill: 'rgba(0,0,0,0.25)' }} />
          <span style={{ fontSize: '1.5rem', fontWidth: 700, color: 'rgba(0,0,0,0.25)' }}>
            Please select a wallpaper
          </span>
        </div>
      );
    return (
      <div style={{
        backgroundColor: `${this.props.color}`,
        position: 'fixed',
        width: '100%',
        height: '100vh',
        zIndex: '-1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      />
    );
  }
}

export default Wallpaper;