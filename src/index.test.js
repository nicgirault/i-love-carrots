const expect = require('chai').expect;
const index = require('./index');

describe('index', function() {
  describe('login', function() {
    it('should return "Hello World"', function() {
      expect(index.login()).to.equal('Hello World');
    });
  });
});
