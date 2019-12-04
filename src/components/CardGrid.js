import React from 'react';
import PropTypes from 'prop-types'

import styles from './CardGrid.module.scss';
import Card from "../helpers/Card";
import CardItem from "./CardItem";


class CardGrid extends React.Component {
    state = {
        cards: [],
        allowFlips: true
    }

    componentDidMount() {
        this.initCardPairs()
    }

    componentDidUpdate(prevProps) {
        if (this.props.cardCount !== prevProps.cardCount) {
            this.initCardPairs()
        }
    }

    initCardPairs = () => {
        // create an array of cards, with a cardCount length
        const cards = Array.from({length: this.props.cardCount}, (id, i) => new Card(i))
        this.setState({ cards })
    }

    cardClickHandler = (card) => {

        let cards = this.state.cards

        // reset cards flipped state
        if(!this.state.allowFlips) {
            flipCards(cards.filter(card => card.flipped), cards)
        }


        // flip card
        // todo: no flipping back
        flipCards([card], cards)

        // get flipped cards
        const [firstCard, secondCard] = cards.filter(card => card.flipped)

        // there exists two flipped cards
        if(firstCard && secondCard) {
            // they are the same
            if(firstCard.seed === secondCard.seed) {
                // set as found
                setCardsAsFound([firstCard, secondCard], cards)

                // todo give points

                // todo check if game is over

            } else {
                // flip back both after a timeout
                this.setState({allowFlips: false})
                setTimeout(() => {
                    flipCards([firstCard, secondCard], cards)
                    this.setState({cards, allowFlips: true})
                }, 1000)
            }
        }

        this.setState({cards, allowFlips: true})
    }

    render() {
        const { cards } = this.state
        return (
            <ul className={styles.root}>
                {cards.map((card, i) => (
                    <li className={styles.item} key={i}>
                        <CardItem card={card} onClick={this.cardClickHandler} />
                    </li>
                ))}
            </ul>
        );
    }
}

CardGrid.propTypes = {
    cardCount: PropTypes.number
}

const flipCardValue = (prop, cards, array) => cards.forEach(card => {
    card[prop] = !card[prop]
    array[card.id] = card
})

const setCardsAsFound = (cards, array) => flipCardValue("found", cards, array)
const flipCards = (cards, array) => flipCardValue("flipped", cards, array)


export default CardGrid
