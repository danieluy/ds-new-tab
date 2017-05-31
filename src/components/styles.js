import { blue500 } from 'material-ui/styles/colors';

const color = {
  alpha0: 'transparent',
  black_005: 'rgba(0,0,0,0.05)',
  black_025: 'rgba(0,0,0,0.25)',
  black_050: 'rgba(0,0,0,0.5)',
  black_075: 'rgba(0,0,0,0.75)',
  white_075: 'rgba(255,255,255,0.75)',
  white_100: 'rgba(255,255,255,1)'
}
const app = {
  app_bar: {
    root: {
      position: 'fixed',
      backgroundColor: color.alpha0,
      boxShadow: 'none'
    },
    title: {
      textShadow: `1px 1px 1px ${color.black_025}`
    },
    iconLeft: {
      filter: `drop-shadow(1px 1px 1px ${color.black_025})`
    },
    drawer_header: {
      backgroundColor: blue500,
    }
  },
  body_wrapper: {
    position: 'fixed',
    height: `${window.innerHeight - 64}px`,
    width: '100%',
    top: '64px',
    overflow: 'auto'
  }
}
const bookmarks_list = {
  wrapper: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}
const bookmarks_wrapper = {
  height: `${window.innerHeight - 128}px`,
  top: '64px'
}

export { color, app, bookmarks_list, bookmarks_wrapper }