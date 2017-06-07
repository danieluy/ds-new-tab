import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

class WallpaperSettings extends Component {

  toggleVisible(props, evt, toggled) {
    props.actions.handleSettings({
      bookmarks_on: toggled
    });
  }

  render() {
    const LANG = this.props.status.language
    return (
      <Dialog
        title="Bookmarks Settings"
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

      </Dialog>
    );
  }
}

export default WallpaperSettings;