import React, { PureComponent } from 'react';

const url = require('url');

import { Lock, LockOpen } from '../assets/icons';

import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class History extends PureComponent {
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
    return this.props.history;
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
  renderItems() {
    return this.sortAndGroup(this.props.history).map((item, i) => {
      if (item.subheader)
        return (
          <div key={i}>
            <Subheader>{item.subheader}</Subheader>
            <Divider />
          </div>
        );
      return (
        <a key={i} href={item.url} style={{ textDecoration: 'none' }}>
          <ListItem
            primaryText={this.trimStringToFixedLength(item.title) || this.trimStringToFixedLength(item.url)}
            //secondaryText={item.url} // TODO findout why secondaryText renders so slowly
            rightIcon={url.parse(item.url).protocol === 'https:' ? <Lock style={{ fill: '#4CAF50' }} /> : <LockOpen />}
          />
        </a>
      )
    })
  }
  render() {
    return (

      <Dialog
        title="History"
        open={this.props.visible}
        modal={false}
        onRequestClose={this.props.onRequestClose}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
      >
        <List>
          {this.renderItems.call(this)}
        </List>
      </Dialog>

    );
  }
}

export default History;