# Blocky Puzzle

## Notes from Chloe

Having reached the point where I mark each block of the same colour which stretches to the left, right, above, and below- I realised that Tetris also deletes blocks which aren't in line with the selected block, so my approach was missing a fundamental rule of the game! 
I am first and foremost dissapointed with myself that I forgot how Tetris works, becasue I used to love Tetris. Secondly, this means scrapping alot of my work and taking a new approach. 
It makes much more sense now to find the blocks immediately touching the selected block with the same colour (using its x and y axis). Then use recursion to do the same process with every block of the same colour which is touching, thereby spreading across the entire grid, not just in lines from the selected block. 

## To get started

You will need a recent version of [Node]. If you do not have it installed already, we find [nvm] to be a handy script to install and even juggle between versions of Node without too much hassle.

On most projects, we have transitioned into using [Yarn], Facebook's package manager in favour of npm. Either one will do to install and run this project, as well as run its tests.

```sh
yarn
# or `npm install`
yarn start
# or `npm start`
```

`http://localhost:9100/` will open automatically on the blocky app, live-reloading as you develop.

Use `yarn test` to run the unit tests on the terminal. `yarn test --watch` will only run test files relevant to changes since your last commit, and rerun them every time you save.

## Task

Clicking on a block should remove (or hide) itself and all blocks of the same colour that are connected to the target element, then allow the blocks above the removed to "fall down". The "gravity" is similar to [Tetris], but every block is its own 1x1 entity. Unlike Tetris, it's clicking on a block that triggers the removal and fall of blocks.

For example, given:

![Initial state](./initial.jpg)

After clicking one of the bottom right blue boxes, it should look like this:

![state 2](./expectedResult.jpg)

[node]: https://nodejs.org/en/ "Node is a JavaScript runtime built on Chrome's V8 JavaScript engine"
[nvm]: https://github.com/creationix/nvm 'Because nobody wants to upgrade and downgrade Node per project'
[yarn]: https://yarnpkg.com/en/docs/install 'Never go full Facebook though'
[tetris]: https://en.wikipedia.org/wiki/Tetris "You've played Tetris, right?"
