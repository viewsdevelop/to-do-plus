import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  },
})

export default useStyles
