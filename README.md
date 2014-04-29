# Rose
[![Build Status](https://travis-ci.org/nicolasmccurdy/rose.svg?branch=master)](https://travis-ci.org/nicolasmccurdy/rose)
[![Dependency Status](https://gemnasium.com/nicolasmccurdy/rose.svg)](https://gemnasium.com/nicolasmccurdy/rose)

An interactive, technical, and openly editable [Rosetta
Stone](http://en.wikipedia.org/wiki/Rosetta_Stone) for developers.

Think of it as an interactive Rosetta Stone table, or a technical thesaurus for
looking up code examples across different technologies. Rose makes it easy to
learn how to do things you're used to with new technologies.

## Why?
Existing question/answer sites like [Stack Overflow](http://stackoverflow.com/)
are awesome for getting answers to most technical questions and keeping them in
one place. However, the question/answer format isn't always the best for
figuring out how to use features across different technologies.

For example, let's say you wanted to explain how to use a certain feature across
ten different programming languages, relative to how it works in another
language that your readers already know. If you were trying to write individual
answers on a traditional question/answer site for every possible combination of
a language to translate from (10 choices) and a language to translate to (9
choices), you would need to write 90 (10 * 9) answers to cover them all! That's
a lot of combinatorial explosion.

Fortunately, Rosetta Stone tables (such as the [Pacman
Rosetta](https://wiki.archlinux.org/index.php/Pacman_Rosetta)) are fantastic for
showing how to use features across many different technologies.  However,
they're often hidden across many different wikis and websites, and their inner
contents aren't easy to search through unless you already know where the table
you need is. While they're dense in information, they aren't nearly as easy to
search for in one place like answers on a question/answer site are.

Rose is meant to bring the best of both worlds. With Rose, you can describe how
to use a feature once in all ten languages (like with a Rosetta Stone table),
except that anyone could visit Rose and easily search between the code examples
you provided without having to visit your specific table first.

## Goals
- Translate methods, functions, commands, concepts, etc. across programming
  languages, command line tools, libraries, and frameworks.
- Store many different kinds of technologies, features, and examples in a very
  generalized and searchable way.
- Fast searches for looking up information by the name of a feature or with
  source code examples.
- Only provide detailed information about how features differ in different
  technologies. The technologies themselves already document how their features
  work, and Rose should link to third-party documentation where appropriate.

## What Rose is not
- A tutorial.
- A language-specific reference.
- A [programming chrestomathy](http://en.wikipedia.org/wiki/Chrestomathy) site.
  Rose should provide consice technical information on how to use specific
  features across different languages instead of providing ports of example
  programs across different languages.
- A place for learning about concepts that you don't already understand in at
  least one known technology. Rose should link to you at least one good resource
  for understanding a feature example in at least one technology, however.

## Inspirations
- Rosetta Stone tables. Here are some good examples:
  - http://mercurial.selenic.com/wiki/GitConcepts
  - https://wiki.archlinux.org/index.php/Pacman_Rosetta
- [Rosetta Code](http://rosettacode.org/)
- [Hyperpolyglot](http://hyperpolyglot.org/)
