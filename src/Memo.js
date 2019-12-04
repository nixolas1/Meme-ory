import React from 'react';
import styles from './Memo.module.scss';
import CardGrid from "./components/CardGrid";

const Memo = () => {
  return (
    <div className={styles.root}>
      <CardGrid cardCount={9} />
    </div>
  );
}

export default Memo;
