# Tic Tac Toe!

#### A learning project focused on leveling-up with:
* [Node.js](https://nodejs.org/) project development.
* [Test-driven software development](https://en.wikipedia.org/wiki/Test-driven_development).
* Artificial intelligence in JavaScript.
* The [model/view/controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) software architecture pattern.
* Principles of [clean](https://github.com/ryanmcdermott/clean-code-javascript), [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), [self-documenting code](https://en.wikipedia.org/wiki/Self-documenting_code).

## Table of Contents

1. [Description](#description)
2. [Requirements](#requirements)
3. [Installing](#installing)
4. [Playing](#playing)
5. [Testing](#testing)
6. [Contributing](#contributing)
7. [Author, Credits and Links](#author)

<a name="description"/>

### Description

A [Node.js](https://nodejs.org/) implementation of [Tic Tac Toe](https://en.wikipedia.org/wiki/Tic-tac-toe) featuring an unbeatable computer opponent. Built for your enjoyment as part of a set of coding challenges for a recent job interview.

<a name="requirements"/>

### Requirements

Before installing this game, make sure you have the following dependencies installed. Follow the links below for install files and instructions.

1. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. [Node.js and npm](https://nodejs.org/en/)

<a name="installing"/>

### Installing

1. [Clone this repository](https://help.github.com/articles/cloning-a-repository/) onto your machine in a directory of your choosing.
2. In the command line terminal, navigate to the root directory of your local clone (i.e., `/unbeatable-tic-tac-toe/`).
3. Run `npm install`. This will install all of the dependencies of this project.

<a name="playing"/>

### Playing

1. To play, from the project's root directory run `npm start`.
2. Follow the setup prompts, and begin playing once you have provided all of the game settings.
3. To stop the game and end the Node process at any time, press `Ctrl + C`.

<a name="testing"/>

### Testing

* From the project's root directory, run `npm test` to run the mocha testing suite once.

OR

* If you want to leave the tests running while you modify the code, run `npm run test-watch`. Whenever you save a file, the tests will run again and output the results to the console.

* Be sure to check out the documentation for [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to learn more about this testing suite.

<a name="contributing"/>

## Contributing

Your contributions are very welcome! The best thing you could possibly do is break this code and then let me know about it. Contact me or open an issue to discuss potential changes/additions.

<a name="author"/>

## Author, Credits and Links

Author
* Jeff Bothe, @jmbothe

Inspiration
* Jason Fox's [article on implementing the minimax algorithm in tic tac toe](https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13/)
* Nikolay Nemshilov's [article on reading user input with Node](http://st-on-it.blogspot.com/2011/05/how-to-read-user-input-with-nodejs.html)