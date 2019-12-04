class Card {
    constructor(id, seed = Math.random(), image) {
        this.id = id
        this.seed = seed
        this.flipped = false
        this.found = false
        this.image = image
    }

}

export default Card