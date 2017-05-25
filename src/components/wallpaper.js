import React, { Component } from 'react';

class Wallpaper extends Component {
  render() {
    if (this.props.status.visible)
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
    return null;
  }
}

export default Wallpaper;