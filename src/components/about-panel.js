import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const manifest = require('../../build/manifest.json');

class AboutPanel extends Component {

  render() {
    const LANG = this.props.lang;
    return (
      <Dialog
        title={LANG.title}
        open={this.props.status.open}
        modal={false}
        onRequestClose={this.props.actions.open}
        autoScrollBodyContent={true}
      >
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <img style={{height: '128px', width: '128px', borderRadius:'128px', boxShadow:'0 5px 10px rgba(0,0,0,0.5)'}} src="icons/128x128.png" alt="Application logo" />
          <h1 style={{padding:'20px'}}>{LANG.subtitle}</h1>
        </div>

        <Card>
          <CardHeader
            title={LANG.label.description}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p style={{ fontSize: '1.2rem', padding: '15px 0' }}>{LANG.description.title}</p>
            <Divider />
            <p style={{ color: '#888888', padding: '10px 0' }}>{LANG.description.features_lbl}</p>
            <ul>
              {LANG.description.features.map((feature, i) => <li style={{ padding: '5px 0 5px 30px' }} key={i}>{feature}</li>)}
            </ul>
          </CardText>
        </Card>

        <Card>
          <CardHeader
            title={LANG.label.author}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p style={{ fontSize: '1.2rem', padding: '15px 0' }}>{LANG.description.author.name}</p>
            <Divider />
            <a style={{ color: '#888888', padding: '10px 0', display:'inline-block', cursor:'pointer' }} href={LANG.description.author.web_url} target="_blank">{LANG.description.author.web}</a>
          </CardText>
        </Card>

        <Card>
          <CardHeader
            title={LANG.label.versioning}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p style={{ fontSize: '1.2rem', padding: '15px 0' }}>{`v${manifest.version}`}</p>
            <Divider />
            <p style={{ color: '#888888', padding: '10px 0' }}>{LANG.description.changelog_lbl}</p>
            <ul>
              {(function() {
                const changelog_array = [];
                for(let change in LANG.description.changelog){
                  changelog_array.push(<li style={{ padding: '5px 0 5px 30px' }} key={change}>{`${change} - ${LANG.description.changelog[change]}`}</li>)
                };
                console.log()
                return changelog_array;
              })()}
            </ul>
          </CardText>
        </Card>

      </Dialog >
    );
  }
}

export default AboutPanel;