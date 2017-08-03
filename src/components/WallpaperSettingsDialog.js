import React, { PureComponent } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';

import { Download, Upload } from '../assets/icons';

class WallpaperSettings extends PureComponent {

  constructor() {
    super();
    this.state = {
      download_dialog_open: false,
      download_url: '',
      download_progress: false,
      alert: {
        open: false,
        message: ''
      }
    }
  }

  toggleVisible(props, evt, toggled) {
    props.handleSettings({
      wallpaper_on: toggled
    });
  }

  loadFile(evt) {
    document.getElementById('input-file-wallpaper').click();
  }

  handleImageUpload(props, evt) {
    const file = evt.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      this.storeNewWallpaper(props, evt.target.result);
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
          this.donwloadEnded();
          this.storeNewWallpaper(props, evt.target.result);
        };
      }
    }
    xhr.open('GET', this.state.download_url, true);
    xhr.send();
    this.toggleDownloadDialogOpen();
    this.donwloadStarted();
  }

  storeNewWallpaper(props, wallpaper) {
    const current_wallpaper = props.status.current_wallpaper;
    try {
      props.handleSettings({
        wallpaper_src: wallpaper
      });
    } catch (err) {
      props.handleSettings({
        wallpaper_src: current_wallpaper
      });
      if (err.code === 22)
        this.alert('This image is too big to be stored in the browser. However you may choose another wallpaper :)');
      else
        this.alert('Something went wrong, please try again or choose another wallpaper');
    }
  }

  donwloadStarted() {
    this.setState({
      download_progress: true
    })
  }

  donwloadEnded() {
    this.setState({
      download_progress: false
    })
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

  handleAlertClose() {
    this.setState({
      alert: {
        open: false,
        message: ''
      }
    })
  }

  alert(message) {
    this.setState({
      alert: {
        open: true,
        message: message
      }
    })
  }

  render() {
    return (
      <Dialog
        title="Wallpaper Settings"
        open={this.props.status.open}
        modal={false}
        onRequestClose={this.props.actions.open}
        autoScrollBodyContent={true}
      >

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <span>Please note that the wallpaper will be saved locally and won't be available in other devices.</span>
        </div>

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <Toggle
            label="Active"
            defaultToggled={this.props.status.main_switch_toggled}
            onToggle={this.toggleVisible.bind(this, this.props)}
          />
        </div>

        <Card>
          <CardHeader
            title="Current Wallpaper"
            subtitle="Enable, disable or change your wallpaper"
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
          {this.state.download_progress ? <CircularProgress style={{ marginLeft: '20px' }} /> : null}
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

        <Dialog
          modal={false}
          open={this.state.alert.open}
          onRequestClose={this.handleAlertClose.bind(this)}
        >
          {this.state.alert.message}
        </Dialog>

      </Dialog>
    );
  }
}

export default WallpaperSettings;