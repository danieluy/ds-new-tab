import React, { Component } from 'react';

const url = require('url');

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';

class History extends Component {
  stringifyDate(ms) {
    const date = new Date(ms);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  render() {
    console.log(this.props.history);
    return (

      <Dialog
        title="History"
        open={true}
        modal={false}
        //onRequestClose={this.props.actions.open}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
      >
        <List>
          {this.props.history.map((item, i) => {
            const parsed_url = url.parse(item.url)
            return (
              <a key={i} href={item.url} style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText={`${this.stringifyDate(item.lastVisitTime)} - ${item.title || parsed_url.host}`}
                  secondaryText={item.url}
                  rightIcon={<ActionInfo style={{ fill: parsed_url.protocol === 'https:' ? '#4CAF50' : '#888888' }} />}
                />
              </a>
            )
          })}
        </List>
      </Dialog>

    );
  }
}

export default History;