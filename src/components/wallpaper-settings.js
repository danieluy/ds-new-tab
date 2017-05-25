import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';

import { Download, Upload } from '../assets/icons';

class WallpaperSettings extends Component {

  constructor() {
    super();
    this.state = {
      download_dialog_open: false,
      download_url: ''
    }
  }

  toggleVisible(props, evt, toggled) {
    props.handleSettings({
      wallpaper_on: toggled
    });
  }

  loadFile(evt) {
    const input = document.getElementById('input-file-wallpaper').click();
  }

  handleImageUpload(props, evt) {
    const file = evt.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      props.handleSettings({
        wallpaper_src: evt.target.result
      });
    };
  }

  handleImageDownload(props) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(xhr.response);
        fileReader.onload = (evt) => {
          props.handleSettings({
            wallpaper_src: evt.target.result
          });
        };
      }
    }
    xhr.open('GET', this.state.download_url, true);
    xhr.send();
  }

  toggleDownloadDialogOpen() {
    this.setState({
      download_dialog_open: !this.state.download_dialog_open
    })
  }

  handleURLInputChange(evt) {
    this.setState({
      download_url: evt.target.value,
    });
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cerrar"
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
          <span>Please note that the wallpaper will be saved locally and won't be available in other devices.</span>
        </div>

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <Toggle
            label="Active"
            defaultToggled={this.props.status.switch_visible}
            onToggle={this.toggleVisible.bind(this, this.props)}
          />
        </div>

        <Card>
          <CardHeader
            title="Current Wallpaper"
            subtitle="Subtitle"
          />
          <CardMedia>
            <img src={this.props.status.current_wallpaper} />
          </CardMedia>
        </Card>

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <RaisedButton icon={<Upload />} label="Load from local machine" onTouchTap={this.loadFile} />
          <input id="input-file-wallpaper" type="file" style={{ display: 'none' }} onChange={this.handleImageUpload.bind(this, this.props)} />
        </div>

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <RaisedButton icon={<Download />} label="Download from web" onTouchTap={this.toggleDownloadDialogOpen.bind(this)} />
        </div>

        <Dialog
          title="Wallpaper from web"
          actions={[
            <RaisedButton
              label="OK"
              primary={true}
              onTouchTap={this.handleImageDownload.bind(this, this.props)}
            />
          ]}
          modal={false}
          open={this.state.download_dialog_open}
          onRequestClose={this.toggleDownloadDialogOpen.bind(this)}
        >
          <TextField
            hintText="http://lorempixel.com/output/nature-q-c-640-480-1.jpg"
            floatingLabelText="Paste or tipe URL"
            onChange={this.handleURLInputChange.bind(this)}
            fullWidth={true}
          />
        </Dialog>

      </Dialog>
    );
  }
}

export default WallpaperSettings;