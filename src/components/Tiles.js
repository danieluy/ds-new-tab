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
  getTiles(tiles) {
    if (tiles.length)
      return tiles.map((tile, i) => {
        return (
          <Tile
            key={i}
            title={tile.title || tile.url}
            url={tile.url}
            thumbnail={tile.thumb}
          />
        )
      })
    return <div>The most visited pages will appear shortly</div>;
  }
  render() {
    return <div className="tiles-wrapper">{this.getTiles(this.props.status.tiles)}</div>;
  }
}

export default Tiles;