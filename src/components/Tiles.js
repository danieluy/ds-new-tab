import React, { Component } from 'react';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const placeholder = 'https://www.axure.com/c/attachments/forum/7-0-general-discussion/3919d1401387174-turn-placeholder-widget-into-image-maintain-interactions-screen-shot-2014-05-29-10.46.57-am.png'

class Tiles extends Component {
  render() {
    return (
      <div className="tiles-wrapper">
        {this.props.status.tiles.map((tile, i) => {
          return (
            <div key={i} className="tiles-item">
              <Card>
                <CardMedia>
                  <img src={tile.thumb || placeholder} alt="" />
                </CardMedia>
                <CardTitle title="Card title" subtitle="Card subtitle" />
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
              </Card>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Tiles;