import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    top: '75px',
    zIndex: 99,
    backgroundColor: '#FAFAFA',
    padding: theme.spacing(2, 0, 0),
    maxWidth: '110%',
    marginLeft: '-5%',
    marginRight: '-5%',
  },
  root: {
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
    },
    '& .MuiInputAdornment-root': {
      marginLeft: theme.spacing(1),
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
}))

export default useStyles
