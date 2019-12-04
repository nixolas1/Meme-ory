import React from 'react';
import PropTypes from 'prop-types'

import styles from './CardGrid.module.scss';
import Card from "../helpers/Card";
import CardItem from "./CardItem";
import getImages from '../helpers/getImages';


class CardGrid extends React.Component {
    state = {
        cards: [...Array(this.props.cardCount*2).keys()],
        allowFlips: true,
        victory: false,
        images: []
    }

    componentDidMount() {
        this.initCardPairs()
    }

    componentDidUpdate(prevProps) {
        if (this.props.cardCount !== prevProps.cardCount) {
            this.initCardPairs()
        }
    }

    initCardPairs = async () => {
        // create an array of cards, with a cardCount length
        const count = this.props.cardCount * 2
        let cards = []
        const images = await getImages(count)

        for(let i = 0; i < count; i += 2){
            const seed = Math.random()
            const image = images[i]
            // create two cards with same identity
            cards.push(new Card(i, seed, image))
            cards.push(new Card(i + 1, seed, image))
        }

        // hehe
        shuffle(cards)
        this.setState({ cards, images })
    }

    cardClickHandler = (card, event) => {
        // don't allow flips while waiting
        if(!this.state.allowFlips || card.flipped || card.found || card.id === undefined) return false

        let cards = this.state.cards
        flipCards([card])
        
        this.checkIfCardMatches(cards)
        this.setState({cards})
    }

    checkIfCardMatches = (cards) => {
        // get two flipped cards
        const [firstCard, secondCard] = cards.filter(c => c.flipped && !c.found)

        // there exists two flipped cards
        if(firstCard && secondCard) {

            // they are the same
            if(firstCard.seed === secondCard.seed) {
                // set as found
                setCardsAsFound([firstCard, secondCard])

                // todo: give points

                // check if game is over
                if(cards.every(c => c.found)) {
                    this.setState({victory: true})
                }
            } else {
                // not correct card, flip back both after a timeout
                this.setState({allowFlips: false})
                setTimeout(() => {
                    flipCards([firstCard, secondCard])
                    this.setState({cards, allowFlips: true})
                }, 700)
            }
        }
    }

    render() {
        const { cards, images, victory } = this.state
        if(victory) {
            return (
                <h1 className={styles.victory}>You Win!</h1>
            )
        }
        return (
            <React.Fragment>
                <ul className={styles.root}>
                    {cards.map((card, i) => (
                        <li className={styles.item} key={i}>
                            <CardItem card={card} clickHandler={this.cardClickHandler} />
                        </li>
                    ))}
                </ul>
                <div className={styles.imageLoader}>
                    {images.map(url => <img src={url} alt="Load me" key={url} />)}
                </div>
            </React.Fragment>
        );
    }
}

CardGrid.propTypes = {
    cardCount: PropTypes.number
}

const flipCardValue = (prop, cards) => cards.forEach(card => {
    card[prop] = !card[prop]
})

const setCardsAsFound = (cards, array) => {
    flipCardValue("found", cards)
    flipCardValue("flipped", cards)
}
const flipCards = (cards) => flipCardValue("flipped", cards)

// sorts array based on random number. Not uniformly random, but good enough
const shuffle = arr => arr.sort(() => Math.random() - 0.5);


export default CardGrid
