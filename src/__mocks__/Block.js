const colour = (x, y) => {
 if (x < 2 && y < 2)
    return 'green'
 else return 'red'
}

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colour = colour(x, y);
    }

    remove() {
        document.getElementById(`block_${this.x}x${this.y}`).remove()  
    }
    
    markedForDelete() {
        this.forDeletion = true
    }
}

export default Block