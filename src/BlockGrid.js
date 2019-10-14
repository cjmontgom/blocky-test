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
    // for (let x = 0; x < this.width; x++) {
    //   const column = this.grid[x]
    //   if (column.includes(block)) this.deleteBlock(column, block)
    // }
    block.markedForDelete()

    // get the co-ordinates of the block clicked 
    let xAxis = block.x
    let yAxis = block.y

    let selectedBlockColour = block.colour
    let column = this.grid[xAxis]
    let nextColumn = this.grid[xAxis + 1]
    let row = yAxis

    let blockLeft = row[xAxis - 1]
    let blockRight = row[xAxis + 1]

    if (yAxis < this.height - 1) this.markBlocksAbove(yAxis, selectedBlockColour, column)
    
    if (yAxis > 0) this.markBlocksBelow(yAxis, selectedBlockColour, column)
 
    if (xAxis < this.width - 1) this.markBlocksToTheRight(xAxis, yAxis, selectedBlockColour)

    //   remove the blocks to the left ( x - 1 )
    //   remove the blocks to the right ( x + 1 )

    // delete the blocks marked as for deletion

    // for each column 
    //   re-write the co ordinates of all blocks in correspondence to their element id within the column

  }

  deleteBlock(column, block) {
    const index = column.indexOf(block)
    column.splice(index, 1)
    block.remove()
  }

  markBlocksAbove(yAxis, selectedBlockColour, column) {
    let blockAbove = column[yAxis + 1]
    while (yAxis < this.height && selectedBlockColour === blockAbove.colour) {
      blockAbove.markedForDelete()
      blockAbove = column[yAxis ++]
    }
  }

  markBlocksBelow(yAxis, selectedBlockColour, column) {
    let blockBelow = column[yAxis - 1]
    while (yAxis >= 0 && selectedBlockColour === blockBelow.colour) {
      blockBelow.markedForDelete()
      blockBelow = column[yAxis --]
    }
  }

  markBlocksToTheRight(xAxis, yAxis, selectedBlockColour) {
    let nextColumn = xAxis + 1
    let blockToTheRight = this.grid[nextColumn][yAxis]
    blockToTheRight.markedForDelete()

    while (nextColumn < this.width - 1 && selectedBlockColour === blockToTheRight.colour) {
      nextColumn ++
      blockToTheRight = this.grid[nextColumn][yAxis]
      blockToTheRight.markedForDelete()
    }
  }

}

export default BlockGrid;