import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

import { Permissions } from '../assets/icons';

class TopVisitedSettingsDialog extends Component {

  constructor() {
    super();
    this.state = {
      all_urls_permission: false
    }
  }

  componentWillMount() {
    this.checkPermissions();
  }

  toggleVisible(props, evt, toggled) {
    if (this.state.all_urls_permission)
      props.actions.handleSettings({
        top_visited_on: toggled
      });
    else
      this.requestAllURLPermission.call(this);
  }

  requestAllURLPermission() {
    // Permissions must be requested from a user action, like a button's click handler.
    chrome.permissions.request({ origins: ["<all_urls>"] }, (granted) => {
      console.log('granted', granted)
      this.setState({
        all_urls_permission: granted
      })
    });
  }

  checkPermissions() {
    chrome.permissions.contains({ origins: ["<all_urls>"] }, (granted) => {
      this.setState({
        all_urls_permission: granted
      })
    });
  }

  render() {
    const LANG = this.props.status.language
    return (
      <Dialog
        title="Most Visited Settings"
        open={this.props.status.open}
        modal={false}
        onRequestClose={this.props.actions.open}
        autoScrollBodyContent={true}
      >

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <Toggle
            label={LANG.active}
            defaultToggled={this.props.status.main_switch_toggled}
            onToggle={this.toggleVisible.bind(this, this.props)}
          />
        </div>

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '48px' }}>
            <Permissions />
          </div>
          <div style={{ width: 'calc(100% - 48px)' }}>
            <Toggle
              label={'Required permissions'}
              defaultToggled={this.state.all_urls_permission}
              disabled={this.state.all_urls_permission}
              onToggle={this.requestAllURLPermission.bind(this)}
            />
          </div>
        </div>

      </Dialog>
    );
  }
}

export default TopVisitedSettingsDialog;