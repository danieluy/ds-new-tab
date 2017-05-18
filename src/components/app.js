import React, { Component } from 'react';

import Bookmarks from '../bookmarks';

import Header from './header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bookmarks: []
    }
  }
  componentWillMount() {
    Bookmarks.get().then(bookmarks => {
      this.setState({
        bookmarks: bookmarks
      })
    })
  }
  render() {
    return (
      <div>
        <Header />
        <BookmarksBar bookmarks={this.state.bookmarks} />
      </div>
    );
  }
}

export default App;
