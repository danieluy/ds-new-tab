import React, { Component } from 'react';
import url from 'url';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const placeholder = 'http://www.euneighbours.eu/sites/default/files/2017-01/placeholder.png'

class Tile extends Component {
  render() {
    return (
      <a href={this.props.url} className="tile">
        <div className="tile-img" style={{ backgroundImage: `url("${this.props.thumbnail || placeholder}")` }} title={this.props.url} />
        <div className="tile-title-wrapper">
          <div className="tile-title">{this.props.title}</div>
        </div>
      </a>
    )
  }
}

class Tiles extends Component {
  render() {
    // console.log(this.props.status.tiles)
    return (
      <div className="tiles-wrapper">
        {this.props.status.tiles.map((tile, i) => <Tile
          key={i}
          title={tile.title || tile.url}
          url={tile.url}
          thumbnail={tile.thumb}
        />)}
      </div>
    );
  }
}

export default Tiles;