const Feature = require('../lib/feature');
const seeds = require('../lib/seeds');
const seedData = require('./seedData');

describe('Feature', () => {
  describe('schema', () => {
    it('creates a valid Feature', () => {
      return Feature.create({
        name: 'map over elements',
        examples: [
          { technology: 'Common Lisp', snippets: 'map' },
          { technology: 'Haskell', snippets: 'map' },
          { technology: 'JavaScript', snippets: 'Array#map' },
          { technology: 'Python', snippets: 'map' },
          { technology: 'Ruby', snippets: ['Enumerable#map', 'Enumerable#collect'] }
        ]
      });
    });

    it('does not create an invalid Feature', () => {
      return expect(Feature.create({
        name: 'no examples here'
      })).rejects.toMatchObject({ name: 'ValidationError', message: 'Feature validation failed' });
    });
  });

  describe('.search()', () => {
    const gitAddFeature = [{
      name: 'add files',
      examples: [
        { technology: 'Git', snippets: ['git add'] },
        { technology: 'Mercurial', snippets: ['hg add'] },
        { technology: 'Subversion', snippets: ['svn add'] }
      ]
    }];

    beforeAll(() => seeds(seedData));

    describe('with an empty query', () => {
      it('finds all features', () => {
        return expect(Feature.search('')).resolves.toHaveLength(7);
      });
    });

    describe('with a feature query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('add files')).resolves.toEqual(gitAddFeature);
      });
    });

    describe('with a technology query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('git')).resolves.toHaveLength(6);
      });
    });

    describe('with a command query', () => {
      it('finds all matching features', () => {
        return expect(Feature.search('git ADD')).resolves.toEqual(gitAddFeature);
      });
    });

    describe('with a command query for a command that does not exist', () => {
      it('finds no features', () => {
        return expect(Feature.search('git yolo')).resolves.toHaveLength(0);
      });
    });
  });
});
