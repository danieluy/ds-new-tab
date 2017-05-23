export const color = {
  alpha0: 'transparent',
  black_005: 'rgba(0,0,0,0.05)',
  black_025: 'rgba(0,0,0,0.25)',
  black_050: 'rgba(0,0,0,0.5)',
  white_075: 'rgba(255,255,255,0.75)'
}
export const app = {
  app_bar: {
    root: {
      position: 'fixed',
      backgroundColor: color.alpha0,
      boxShadow: 'none'
    },
    title:{
      textShadow: `1px 1px 1px ${color.black_025}`
    },
    iconLeft:{
      filter: `drop-shadow(1px 1px 1px ${color.black_025})`
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
export const bookmarks_list = {
  wrapper: {
    width: '300px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
}