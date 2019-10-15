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
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);
      this.renderBlocks(x, colEl)
    }
  }

  reRenderColumns() {
    for (let x = 0; x < this.width; x++) {
      let column = document.getElementById(`col_${x}`)
      if (column) {
        while (column.firstChild) {
          column.removeChild(column.firstChild);
        }
        this.renderBlocks(x, column)
      }
    }
  }

  renderBlocks(x, column) {
    for (let y = this.height - 1; y >= 0; y--) {              
      const block = this.grid[x][y];
      const id = `block_${x}x${y}`;                           
      const blockEl = document.createElement('div');          
      blockEl.id = id;                                      
      blockEl.className = 'block';                            
      blockEl.style.background = block ? block.colour : 'white';                
      blockEl.addEventListener('click', evt => this.blockClicked(evt, block));    
      column.appendChild(blockEl);                                                    
    }
  }

  blockClicked(e, block) {
    block.markedForDelete()

    let x = block.x
    let y = block.y
    let selectedBlockColour = block.colour
    
    this.markBlocks(x, y, selectedBlockColour)
    this.removeMarkedBlocks()
    this.updateCoOrdinates()
    this.reRenderColumns()
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