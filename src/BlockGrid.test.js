import BlockGrid from './BlockGrid';
import Block from './Block';

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

  it('removes the block from its column when the block is clicked on', () => {
    const blockGrid = new BlockGrid(10, 10);
    const grid = blockGrid.grid

    const testBlock = grid[0][0]

    blockGrid.blockClicked('event', testBlock)

    expect(grid[0].length).toBe(9)

    const testBlock2 = grid[3][4]

    blockGrid.blockClicked('event', testBlock2)

    expect(grid[3].length).toBe(9)
    expect(grid[3]).not.toContain(testBlock2)

  });
});
