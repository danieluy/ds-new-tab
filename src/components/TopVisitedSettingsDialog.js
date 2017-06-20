import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

import { Permissions } from '../assets/icons';

class TopVisitedSettingsDialog extends Component {

  toggleVisible(props, evt, toggled) {

    props.actions.handleSettings({
      top_visited_on: toggled
    });
  }

  requestAllURLPermission() {
    // Permissions must be requested from a user action, like a button's click handler.
    chrome.permissions.request({ origins: ["<all_urls>"] }, (granted) => {
      if (granted)
        console.log('Permission granted');
      else
        console.log('Permission denied');
    });
  }

  checkPermissions() {
    chrome.permissions.contains({
      origins: ["<all_urls>"]
    }, (granted) => {
      if (!granted)
        console.error('checkPermissions -> <all_urls> refused');
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
              defaultToggled={this.props.status.main_switch_toggled}
              onToggle={this.toggleVisible.bind(this, this.props)}
            />
          </div>
        </div>

      </Dialog>
    );
  }
}

export default TopVisitedSettingsDialog;