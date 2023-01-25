import React from 'react';
import propTypes from 'prop-types';
import styles from './Autocomplete.module.css';

const Autocomplete = ({ getData, placeholder }) => {
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');

  const onChange = async (e) => {
    const inputValue = e.currentTarget.value;
    setUserInput(inputValue);
    if (inputValue.length > 2) {
      const result = await getData(inputValue);
      setFilteredSuggestions(result);
      setShowSuggestions(true);
    }
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[0]);
    }
  };

  return (
    <>
      <div className={styles.dropdownWrapper}>
        <div className={styles.userInput}>
          <input
            type="text"
            className={styles.input}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {showSuggestions && userInput && (
            <ul className={styles.dropdownItem}>
              {(filteredSuggestions || []).map((suggestion) => (
                <li className={styles.item} key={suggestion}>
                  <button type="button" onClick={onClick} className={styles.suggestion}>{suggestion}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

Autocomplete.defaultProps = {
  getData: propTypes.func,
  placeholder: propTypes.string,
};

Autocomplete.propTypes = {
  getData: propTypes.func,
  placeholder: propTypes.string,
};

export default Autocomplete;
