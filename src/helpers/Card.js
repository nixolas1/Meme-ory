class Card {
    constructor(id) {
        this.id = id
        this.seed = Math.random()
        this.turned = false
        this.found = false
    }

}

export default Card