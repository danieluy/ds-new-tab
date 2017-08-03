import React, { PureComponent } from 'react';

import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const manifest = require('../../build/manifest.json');

class AboutPanel extends PureComponent {

  render() {
    const LANG = this.props.lang.about;
    return (
      <Dialog
        title={`${this.props.lang.app_name} v${manifest.version}`}
        open={this.props.status.open}
        modal={false}
        onRequestClose={this.props.actions.open}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
      >

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img style={{ margin: '40px', height: '128px', width: '128px', borderRadius: '128px', boxShadow: '0 5px 10px rgba(0,0,0,0.5)' }} src="icons/128x128.png" alt="Application logo" />
          <h1>{LANG.subtitle}</h1>
        </div>

        <CardText>
          <span style={{ textTransform: 'uppercase', padding: '10px 0', display: 'inline-block', fontWeight: '500', color: '#888888', fontSize: '.7rem'}}>
            {LANG.label.description}
          </span>
          <Divider />
          <p style={{ fontSize: '1.2rem', padding: '15px 0' }}>{LANG.description.title}</p>
          <p style={{ color: '#888888', padding: '10px 0' }}>{LANG.label.features}</p>
          <ul>
            {LANG.description.features.map((feature, i) => <li style={{ padding: '5px 0 5px 30px' }} key={i}>{feature}</li>)}
          </ul>
        </CardText>

        <CardText>
          <span style={{ textTransform: 'uppercase', padding: '10px 0', display: 'inline-block', fontWeight: '500', color: '#888888', fontSize: '.7rem'}}>
            {LANG.label.author}
          </span>
          <Divider />
          <p style={{ fontSize: '1.2rem', padding: '15px 0' }}>{LANG.author.name}</p>
          <a style={{ color: '#888888', padding: '10px 0', display: 'inline-block', cursor: 'pointer' }} href={LANG.author.web_url} target="_blank">{LANG.author.web}</a>
        </CardText>

        <CardText>
          <span style={{ textTransform: 'uppercase', padding: '10px 0', display: 'inline-block', fontWeight: '500', color: '#888888', fontSize: '.7rem'}}>
            {LANG.label.versioning}
          </span>
          <Divider />
          <p style={{ fontSize: '1.2rem', padding: '15px 0' }}>{`v${manifest.version}`}</p>
          <p style={{ color: '#888888', padding: '10px 0' }}>{LANG.label.changelog}</p>
          <ul>
            {(function () {
              const changelog_array = [];
              for (let version in LANG.changelog)
                changelog_array.push(
                  <li
                    style={{ padding: '5px 0 5px 30px' }}
                    key={version}>
                    {`${version} - ${LANG.changelog[version]}`}
                  </li>
                );
              return changelog_array;
            })()}
          </ul>
        </CardText>

        <CardText>
          <span style={{ textTransform: 'uppercase', padding: '10px 0', display: 'inline-block', fontWeight: '500', color: '#888888', fontSize: '.7rem'}}>
            {LANG.label.license}
          </span>
          <Divider />
          <p style={{ fontSize: '1.2rem', padding: '15px 0' }}>{LANG.license.title}</p>
          <p style={{ color: '#888888', padding: '10px 0' }}>{LANG.license.subtitle}</p>
          {LANG.license.body.map((paragraph, i) => <p style={{ padding: '5px 0' }} key={i}>{paragraph}</p>)}
        </CardText>

      </Dialog >
    );
  }
}

export default AboutPanel;