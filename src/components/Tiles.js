import React, { PureComponent } from 'react';
import url from 'url';

import HistoryProvider from '../providers/HistoryProvider';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const placeholder = 'http://www.euneighbours.eu/sites/default/files/2017-01/placeholder.png'

class Tile extends PureComponent {
  render() {
    const visits = this.props.visits === 1 ? `${this.props.visits} visit to: ` : `${this.props.visits} visits to: `
    return (
      <div className="tile">
        <a href={this.props.url} className="tile-link">
          <div className="tile-img" style={{ backgroundImage: `url("${this.props.thumbnail || placeholder}")` }} title={`${visits} ${this.props.url}`} />
          <div className="tile-title-wrapper">
            <div className="tile-title">{this.props.title}</div>
          </div>
        </a>
        <button className="tile-btn-close" onClick={HistoryProvider.ignoreOnTop.bind(null, this.props.url)}>&times;</button>
      </div>

    )
  }
}

class Tiles extends PureComponent {
  getTiles(tiles) {
    if (tiles.length)
      return tiles.map((tile, i) => {
        return (
          <Tile
            key={i}
            title={tile.title || tile.url}
            url={tile.url}
            thumbnail={tile.thumb}
            visits={tile.visitCount}
          />
        )
      })
    return <div>Your most visited pages will appear here as soon as you visit any page</div>;
  }
  render() {
    if (this.props.visible)
      return <div className="tiles-wrapper">{this.getTiles(this.props.status.tiles)}</div>
    return null
  }
}

export default Tiles;