import React, { useEffect, useState } from 'react';
import Autocomplete from '../Autocomplete';
import Dropdown from '../Dropdown';
import Loading from '../Loading';
import getAllCategories from '../../services/getAllCategories';
import getLocation from '../../services/getLocation';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCategories();
      setCategories(response);
      setIsLoaded(true);
    };

    // As an example I'm using setTimeout in order to see the loading
    setTimeout(() => {
      fetchData();
    }, 2000);

    return () => {
      setIsLoaded(false);
    };
  }, []);

  const getData = async (search) => {
    const response = await getLocation(search);
    const dataMapped = JSON.parse(response.substring(2, response.length - 2));
    return dataMapped;
  };

  return (
    <>
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
          <form>
            <div className={styles.container}>
              <h2 className={styles.title}>
                For a better working life
                <br />
                {' '}
                The new XING Jobs
              </h2>
              <div className={styles.box}>
                <div className={styles.item}>
                  <Dropdown data={categories} title="Categories" />
                </div>
                <div className={styles.item}>
                  <Autocomplete getData={getData} placeholder="Location" />
                </div>
                <div className={styles.search}>
                  <button className={styles.dropdownActivator} type="submit">Search</button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default SearchBox;
