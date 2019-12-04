import React from 'react';
import styles from './CardItem.module.scss';

const CardItem = ({card, onClick}) => {
    console.log(card)
    return (
        <button className={styles.root} onClick={() => onClick(card)}>
            {card.flipped && (
                <div className={styles.content}>
                    {card.id}
                </div>
            )}
        </button>
    );
}

export default CardItem;
