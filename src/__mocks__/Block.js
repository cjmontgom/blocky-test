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
        this.forDeletion = false;
        this.coOrdinates = [x, y]
    }

    remove() {
        document.getElementById(`block_${this.x}x${this.y}`).remove();
    }
    
    markedForDelete() {
        this.forDeletion = true;
    }

    updateCoOrdinates(x, y) {
        this.x = x
        this.y = y
    }
}

export default Block