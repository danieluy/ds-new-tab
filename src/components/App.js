import React from 'react';

import _debounce from 'lodash/debounce';

import Language from '../assets/Language'
import { app as styles, bookmarks_wrapper, color } from '../assets/styles';
import { DefaultWallpaper } from '../assets/images-base64/wallpaper-default';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import Wallpaper from './Wallpaper'

// Needed for onTouchTap ///////////////////////////////////////////////////////////
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
////////////////////////////////////////////////////////////////////////////////////

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      lang: Language.getLang('en'),
    }
  }
  componentWillMount() {
    this.setState({
      wallpaper_src: DefaultWallpaper
    })
  }
  render() {
    const LANG = this.state.lang;
    return (
      <MuiThemeProvider muiTheme={
        getMuiTheme.call(this, {
          palette: {
            primary1Color: color.primary
          }
        })
      }>
        <div /*Single element for MuiThemeProvider*/>


          <Wallpaper
            visible={true}
            src={this.state.wallpaper_src}
          />


        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
