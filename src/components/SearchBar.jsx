import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    top: '75px',
    zIndex: 99,
    backgroundColor: '#FAFAFA',
    padding: theme.spacing(5, 0, 0),
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

function SearchBar({ searchQuery, handleSearchQueryChange, classes }) {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <TextField
        className={`${styles.root} ${classes.root}`}
        variant="outlined"
        label="Search"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default SearchBar
