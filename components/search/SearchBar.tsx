import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

/**
 * A search bar that allows for filtering of queries.
 */

export type SearchBarProps = {
  updateQuery: (query: string) => void;
};

export default function SearchBar({ updateQuery }: SearchBarProps): JSX.Element {
  const [query, setQuery] = useState<string>('');

  const handleQueryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    updateQuery(event.target.value);
  };

  return (
    <Paper className="py-2 px-4" component="form">
      <InputBase
        className="flex-1"
        placeholder="Search catalog for courses"
        inputProps={{ 'aria-label': 'Search courses' }}
        value={query}
        onChange={handleQueryUpdate}
      />
      <IconButton className="p-2" type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}