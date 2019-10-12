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

  it('marks the blocks above which are the same colour as the block which is clicked on', () => {
    const blockGrid = new BlockGrid(4, 4);
    const grid = blockGrid.grid;

    const testBlock = grid[0][0];
    const blockAbove = grid[0][1];
    const blockTwoAbove = grid[0][2];

    blockGrid.blockClicked('event', testBlock);

    expect(blockAbove.forDeletion).toBe(true)
    expect(blockTwoAbove.forDeletion).toBe(false)
  });

  it('marks the blocks below which are the same colour as the block which is clicked on', () => {
    const blockGrid = new BlockGrid(6, 6);
    const grid = blockGrid.grid;

    const testBlock = grid[1][5];
    const blockBelow = grid[1][4];
    const blockThreeBelow = grid[1][2]

    blockGrid.blockClicked('event', testBlock);

    expect(blockBelow.forDeletion).toBe(true)
    expect(blockThreeBelow.forDeletion).toBe(true)
    console.log(grid)
  });
});


//    expect(grid[3]).not.toContain(testBlock);



