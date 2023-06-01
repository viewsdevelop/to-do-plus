import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const SearchBar = ({ searchQuery, handleSearchQueryChange, classes }) => {
  return (
    <>
      <Typography variant="h6">Search By Task</Typography>

      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className={classes.searchInput}
      />
    </>
  )
}

export default SearchBar
