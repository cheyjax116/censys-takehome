import React from 'react';
import styles from './search-input.module.css';
import ClearIconSVG from '../icons/clear-icon';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  setQuery,
  onSearch,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={styles.mainContainer}>
      <input
        type='text'
        placeholder='Search Hosts'
        className={styles.inputContainer}
        value={query}
        onChange={handleChange}
        onKeyDown={handleEnterPress}
      />
      {query ? (
        <button
          type='button'
          onClick={clearQuery}
          className={styles.clearButton}
        >
          <ClearIconSVG />
        </button>
      ) : (
        ''
      )}
      <button
        type='button'
        className={styles.buttonContainer}
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
