import React from 'react';
import cx from 'classnames';
import styles from './CardItem.module.scss';


const CardItem = ({card, clickHandler}) => {
    const classNames = cx(styles.root, { [styles.flipped]: card.flipped, [styles.found]: card.found });
    return (
        <button className={classNames}
            onClick={(e) => clickHandler(card, e)}>
            {/* Hide image from dom before its needed, for less cheats */}
            {(card.flipped || card.found) && (
                <img src={card.image} className={styles.content} alt={card.seed} />
            )}
        </button>
    );
}


export default CardItem;
