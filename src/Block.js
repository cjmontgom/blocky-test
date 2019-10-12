export const COLOURS = ['red', 'green', 'blue', 'yellow'];

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.forDeletion = false
  }

  remove() {
    document.getElementById(`block_${this.x}x${this.y}`).remove()  
  }

  markedForDelete() {
    this.forDeletion = true
  }

}

export default Block;
