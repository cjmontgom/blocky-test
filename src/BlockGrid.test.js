import BlockGrid from './BlockGrid';
import Block from './Block';

jest.mock('./Block');

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  it('marks the block as deletable when the block is clicked on', () => {
    const blockGrid = new BlockGrid(10, 10);
    const grid = blockGrid.grid;

    const testBlock = grid[3][4];

    blockGrid.blockClicked('event', testBlock);

    expect(testBlock.forDeletion).toBe(true);
  });

  it('marks all blocks of the same colour that are connected to the target element', () => {
    const blockGrid = new BlockGrid(4, 4);
    const grid = blockGrid.grid;

    const testBlock = grid[0][0];

    const blockAbove = grid[0][1]; // same colour
    const blockTwoAbove = grid[0][2]; // different colour
    const blockDiagonal = grid[1][1]; // same colour, not directly touching

    blockGrid.blockClicked('event', testBlock);

    expect(blockAbove.forDeletion).toBe(true)
    expect(blockDiagonal.forDeletion).toBe(true)
    expect(blockTwoAbove.forDeletion).toBe(false)
  });

  it('removes all marked blocks from their columns', () => {
    const blockGrid = new BlockGrid(4, 4);
    const grid = blockGrid.grid;

    const testBlock = grid[0][0];

    const blockAbove = grid[0][1]; // same colour
    const blockTwoAbove = grid[0][2]; // different colour
    const blockDiagonal = grid[1][1]; // same colour, not directly touching

    blockGrid.blockClicked('event', testBlock);

    expect(grid[0]).not.toContain(testBlock);
    expect(grid[0]).not.toContain(blockAbove);
    expect(grid[0]).toContain(blockTwoAbove)
    expect(grid[1]).not.toContain(blockDiagonal);
  });

  it('re-assigns the co-ordinates of all blocks in correspondence to their element id within the column', () => {
    const blockGrid = new BlockGrid(4, 4);
    const grid = blockGrid.grid;

    const testBlock = grid[0][0];

    blockGrid.blockClicked('event', testBlock);

    expect(grid[0][0].coOrdinates).toEqual([0,0])
    expect(grid[1][0].coOrdinates).toEqual([1,0])
    expect(grid[1][1].coOrdinates).toEqual([1,1])
  });

});



