import Block from './Block';
import { doesNotReject } from 'assert';

class BlockGrid {

  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = document.getElementById('gridEl')) {
    for (let x = 0; x < this.width; x++) {                      // for each column
      const id = 'col_' + x;                                    // create a column id 
      const colEl = document.createElement('div');              // create a new div and variable name for it
      colEl.id = id;                                            // give the new div the id we made
      colEl.className = 'col';                                  // give the new div a classname 
      el.appendChild(colEl);                                    // append the new div to the main grid element

      for (let y = this.height - 1; y >= 0; y--) {              // for each row
        const block = this.grid[x][y];                          // find the block from the grid made in constructor -- 0,0 0,1 0,2 etc... then 1,0 1,1 ...
        const id = `block_${x}x${y}`;                           // create an id for block
        const blockEl = document.createElement('div');          // create a new div for block

        blockEl.id = id;                                        // assign block the id we created
        blockEl.className = 'block';                            // assign block the classname block
        blockEl.style.background = block.colour;                // set the colour of the div to the colour prop of the block
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));    // ass event listener to block
        colEl.appendChild(blockEl);                             // append block to column
      }
    }
  }

  blockClicked(e, block) {
    block.markedForDelete()

    // get the co-ordinates of the block clicked 
    let x = block.x
    let y = block.y
    let selectedBlockColour = block.colour
    
    this.markBlocks(x, y, selectedBlockColour)

    this.removeMarkedBlocks()

    this.updateCoOrdinates()
  }

  markBlocks(x, y, colour) {
    const blocksTouching = [
      this.grid[x][y-1],
      this.grid[x][y+1],
      this.grid[x-1] ? this.grid[x-1][y] : undefined,
      this.grid[x+1] ? this.grid[x+1][y] : undefined
    ]
    blocksTouching.forEach( block => {
      if (block && block.forDeletion === false && block.colour === colour) {
        this.blockClicked('event', block)
      }
    })
  }

  removeMarkedBlocks() {
    for (let column = 0; column < this.width; column++) {
      this.grid[column] = this.grid[column].filter(block => block.forDeletion === false)
    }
  }

  updateCoOrdinates() {
    for (let x = 0; x < this.width; x++) {    
      let column = this.grid[x] 
      column.forEach( block => {
        const y = column.indexOf(block)
        block.updateCoOrdinates(x,y) 
      })
    }
  }

}

export default BlockGrid;