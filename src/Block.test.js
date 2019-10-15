import Block, { COLOURS } from './Block';

describe('Block', () => {
  it('should be created with correct coordinates and one of the valid colours', () => {
    const testCoords = [[1, 2], [4, 9], [0, 0]];

    testCoords.forEach(testCoord => {
      const block = new Block(...testCoord);
      expect(block.x).toBe(testCoord[0]);
      expect(block.y).toBe(testCoord[1]);
      expect(COLOURS).toContain(block.colour);
    });
  });

  it('can be marked as delete-able', () => {
    const block = new Block(1,1)
    expect(block.forDeletion).toBe(false)

    block.markedForDelete()
    expect(block.forDeletion).toBe(true)
  })

  it('can have its co-ordinates updated', () => {
    const block = new Block(1,1)
    expect(block.x).toBe(1)

    block.updateCoOrdinates(2,6)
    expect(block.x).toBe(2)
    expect(block.y).toBe(6)
  })

  it('can return its own co-ordinates as an array property', () => {
    const block = new Block(3,8)

    expect(block.coOrdinates).toEqual([3,8])
  })

});
