import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class WallpaperSettings extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.actions.cancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.props.actions.submit}
      />
    ];
    return (
      <Dialog
        title="Wallpaper Settings"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
        <Toggle
          label="Active"
          defaultToggled={true}
        />
        <RaisedButton label="Change" />
      </Dialog>
    );
  }
}

export default WallpaperSettings;