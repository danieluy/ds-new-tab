import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

class WallpaperSettings extends Component {
  toggleVisible(props, evt, toggled) {
    props.handleSettings({
      wallpaper_visible: toggled
    });
  }
  loadFile(evt) {
    const input = document.getElementById('input-file-wallpaper').click();
  }
  handleFileUpload(evt) {
    const file = evt.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      this.handleResultBase64Image(evt.target.result);
    };
  }
  handleResultBase64Image(base64) {
    const img = new Image();
    img.setAttribute('src', base64);
    document.body.appendChild(img);
  }
  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.props.actions.ok}
      />,
    ];
    return (
      <Dialog
        title="Wallpaper Settings"
        actions={actions}
        modal={true}
        open={this.props.status.open}
      >
        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <Toggle
            label="Active"
            defaultToggled={this.props.status.switch_visible}
            onToggle={this.toggleVisible.bind(this, this.props)}
          />
        </div>
        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <RaisedButton label="Load from local machine" onTouchTap={this.loadFile} />
          <input id="input-file-wallpaper" type="file" style={{ display: 'none' }} onChange={this.handleFileUpload.bind(this)} />
        </div>


      </Dialog>
    );
  }
}

export default WallpaperSettings;