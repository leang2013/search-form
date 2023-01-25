import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import styles from './Dropdown.module.css';

const Dropdown = ({ data, title }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [listChecked, setListChecked] = useState([]);
  const [userInput, setUserInput] = useState('');
  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);

  const formatData = (info = []) => info.map((cat) => ({
    name: cat.attributes.name,
    results: cat.attributes.results,
    level: cat.attributes.level,

  }));

  const mappedData = formatData(data);

  if (filteredSuggestions.length === 0) {
    setFilteredSuggestions(mappedData);
  }

  const dropdownTitle = `in all ${title}`;
  const wordingSearch = data.length === listChecked.length ? 'Remove all' : 'Search in all';

  const onChange = (e) => {
    const inputValue = e.currentTarget.value;

    const dataFiltered = data.filter((cat) => {
      const { attributes } = cat;
      const { name } = attributes;
      return name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    });

    const filteredData = formatData(dataFiltered);

    setFilteredSuggestions(filteredData);
    setUserInput(inputValue);
  };

  const onChangeCheckbox = (e) => {
    setFilteredSuggestions([]);
    if (listChecked.includes(e.currentTarget.id)) {
      setListChecked(listChecked.filter((elem) => elem !== e.currentTarget.id));
      setUserInput('');
    } else {
      setListChecked([...listChecked, e.currentTarget.id]);
      setUserInput(e.currentTarget.id);
    }
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setUserInput(filteredSuggestions[0].name);
    }
  };

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const clickOutsideHandler = (event) => {
    if (dropdownListRef.current && event.target.nodeName !== 'INPUT') {
      if (
        dropdownListRef.current.contains(event.target)
        || activatorRef.current.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      dropdownListRef.current.querySelector('li').focus();
      document.addEventListener('mousedown', clickOutsideHandler);
    } else {
      document.addEventListener('mousedown', clickOutsideHandler);
    }
  }, [isOpen]);

  const onAllOptions = () => {
    if (userInput === `all ${title}`.toLowerCase()) {
      setUserInput('');
      setListChecked([]);
    } else {
      setUserInput(`all ${title}`.toLowerCase());
      setListChecked(mappedData.map((elem) => elem.name));
    }
  };

  return (
    <>
      <div className={styles.dropdownWrapper}>
        <div className={styles.userInput}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Keyword"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <button
            className={styles.dropdownActivator}
            type="button"
            aria-controls={dropdownTitle}
            onClick={clickHandler}
            ref={activatorRef}
          >
            {dropdownTitle.toLowerCase()}
            {' '}
            {isOpen ? (
              <svg
                height="24"
                fill="rgb(70,70,70)"
                viewBox="0 0 24 24"
                className={styles.chevron}
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m0 0h24v24h-24z" fill="none" />
                <path d="m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" />
              </svg>
            ) : (
              <svg
                height="24"
                fill="rgb(70,70,70)"
                viewBox="0 0 24 24"
                className={styles.chevron}
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m0 0h24v24h-24z" fill="none" />
                <path d="m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
              </svg>
            )}
          </button>
        </div>
        {isOpen && (
          <div
            className={`${styles.container} ${isOpen ? styles.active : ''} `}
            ref={dropdownListRef}
          >
            <>
              <div className={styles.barContainer}>
                <h3>
                  Top
                  {' '}
                  {title}
                </h3>
                <button type="button" onClick={onAllOptions} className={styles.searchAllOptions}>
                  {wordingSearch}
                  {' '}
                  {title.toLowerCase()}
                </button>
              </div>
              <ul
                className={`${styles.dropdownItem} ${
                  isOpen ? styles.active : ''
                } `}
              >
                {filteredSuggestions.map((item) => {
                  const { level } = item;
                  if (level === 0) {
                    return (
                      <li className={styles.item} key={item.name}>
                        <div className={styles.option}>
                          <input
                            type="checkbox"
                            id={item.name}
                            name="checkOption"
                            checked={listChecked.includes(item.name)}
                            onChange={onChangeCheckbox}
                          />
                          <label htmlFor={item.name}>
                            {item.name}
                            {' '}
                            (
                            {item.results}
                            )
                          </label>
                        </div>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </>
            <>
              <div className={styles.barContainer}>
                <h3>
                  More
                  {' '}
                  {title}
                </h3>
              </div>
              <ul
                className={`${styles.dropdownMoreItem} ${
                  isOpen ? styles.active : ''
                } `}
              >
                {filteredSuggestions.map((item) => {
                  const { level } = item;
                  if (level === 1) {
                    return (
                      <li className={styles.item} key={item.name}>
                        <div className={styles.option}>
                          <input
                            type="checkbox"
                            id={item.name}
                            name="checkOption"
                            checked={listChecked.includes(item.name)}
                            onChange={onChangeCheckbox}
                          />
                          <label htmlFor={item.name}>
                            {item.name}
                            {' '}
                            (
                            {item.results}
                            )
                          </label>
                        </div>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </>
          </div>
        )}
      </div>
    </>
  );
};

Dropdown.defaultProps = {
  data: [],
  title: '',
};

Dropdown.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    attributes: propTypes.shape({
      level: propTypes.number,
      name: propTypes.string,
      results: propTypes.number,
    }),
  })),
  title: propTypes.string,
};

export default Dropdown;
