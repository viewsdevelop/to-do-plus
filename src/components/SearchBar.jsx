import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
    },
    '& .MuiInputAdornment-root': {
      marginLeft: theme.spacing(1),
    },
  },
}))

function SearchBar({ searchQuery, handleSearchQueryChange, classes }) {
  const styles = useStyles()

  return (
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
  )
}

export default SearchBar
