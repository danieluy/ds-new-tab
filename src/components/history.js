import React, { Component } from 'react';

const url = require('url');

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class History extends Component {
  constructor() {
    super();
    this.state = {
      sort_criteria: 'date',
      sort_order: 'descendant',
      stringFixedLength: 50
    }
  }
  stringifyDate(ms) {
    const date = new Date(ms);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  sortAndGroup() {
    if (this.state.sort_criteria === 'date' && this.state.sort_order === 'descendant')
      return this.groupByDate();
  }
  groupByDate() {
    const group = {};
    this.props.history.map((visit_item, i) => {
      const key = this.stringifyDate(visit_item.lastVisitTime);
      if (!group.hasOwnProperty(key))
        group[key] = [];
      group[key].push(visit_item);
    })
    const sorted = [];
    for (let key in group) {
      sorted.push({ subheader: key })
      group[key].forEach(visit_item => {
        sorted.push(visit_item);
      }, null);
    }
    return sorted;
  }
  trimStringToFixedLength(str) {
    if (str.length > this.state.stringFixedLength)
      return `${str.slice(0, this.state.stringFixedLength)} ... ...`
    return str;
  }
  render() {
    return (

      <Dialog
        title="History"
        open={this.props.status.open}
        modal={false}
        onRequestClose={this.props.actions.open}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
      >
        <List>
          {this.sortAndGroup(this.props.history).map((item, i) => {
            if (item.subheader)
              return (
                <div key={i}>
                  <Subheader>{item.subheader}</Subheader>
                  <Divider />
                </div>
              );
            const parsed_url = url.parse(item.url)
            return (
              <a key={i} href={item.url} style={{ textDecoration: 'none' }}>
                <ListItem
                  primaryText={this.trimStringToFixedLength(item.title) || this.trimStringToFixedLength(parsed_url.host)}
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