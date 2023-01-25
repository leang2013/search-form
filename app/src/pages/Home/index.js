import React from 'react';

import SearchBox from '../../components/SearchBox';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.box}>
        <SearchBox />
      </div>
    </>
  );
}
