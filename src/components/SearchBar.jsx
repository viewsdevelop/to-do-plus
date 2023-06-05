import React from 'react'
import TextField from '@material-ui/core/TextField'

function SearchBar({ searchQuery, handleSearchQueryChange, classes }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      className={classes.searchInput}
      value={searchQuery}
      onChange={handleSearchQueryChange}
      fullWidth
    />
  )
}

export default SearchBar
