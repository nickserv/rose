require('./test_helper');

describe('helpers', function () {
  describe('.highlightQuery()', function () {
    var string = 'I like Git!';

    context('when the query does not exist', function () {
      it('leaves the string alone', function () {
        expect(helpers.highlightQuery(string, 'svn')).to.equal(string);
      });
    });

    context('when the query is empty', function () {
      it('leaves the string alone', function () {
        expect(helpers.highlightQuery(string, '')).to.equal(string);
      });
    });

    context('when the query exists once', function () {
      it('surrounds the query once', function () {
        expect(helpers.highlightQuery(string, 'git'))
              .to.equal('I like <span class="text-primary">Git</span>!');
      });
    });

    context('when the query exists multiple times', function () {
      it('surrounds the query multiple times', function () {
        expect(helpers.highlightQuery('I like Git (also known as git)!', 'git'))
              .to.equal('I like <span class="text-primary">Git</span> (also known as <span class="text-primary">git</span>)!');
      });
    });
  });
});
