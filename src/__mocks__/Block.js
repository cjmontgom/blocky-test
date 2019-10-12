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
}

export default Block