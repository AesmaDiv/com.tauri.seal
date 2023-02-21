export const STYLES = {
  root: {
    width: '100%',
    height: '575px',
  },
  controls: {
    minWidth: '250px',
    height: '100%',
    justifyContent: 'space-between'
  },
  controls_data: {
    gap: 3,
  },
  controls_btns: {
    gap: 1,
  },
  controls_test: {
    width: '100%',
    height: '40px',
  },

  btns: {
    mb: 0, pb: 0, flexGrow: 1,
    transition: 'background-color 250ms',
    color: 'rgb(250,250,250)',
  },
  btn_start: {
    backgroundColor: 'rgb(50,200,0)',
    '&:hover': {
      backgroundColor: 'rgb(0,150,0)',
    },
  },
  btn_stop: {
    backgroundColor: 'rgb(200,50,0)',
    '&:hover': {
      backgroundColor: 'rgb(150,0,0)',
    },
  },
  btn_save: {
    mb: 0, pb: 0
  },
}