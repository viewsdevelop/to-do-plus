import React from 'react'

// Material UI / Styles
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from '../styles/SearchBarStyles'

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
