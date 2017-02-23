const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const index = require('./index');

const expect = chai.expect;
chai.use(sinonChai);

describe('index', function() {
  describe('login', function() {
    it('should post to rocket /api/v1/login with given login info', function() {
      const jquerySpy = {
        ajax: sinon.spy()
      };
      const data = {
        username: 'captain-carrot@gmail.com',
        password: 'I love carrots',
      };
      index.setJquery(jquerySpy);
      index.login(data.username, data.password);
      expect(jquerySpy.ajax).to.have.been.called;

      options = jquerySpy.ajax.firstCall.args[0];
      expect(options.url).to.contain('/api/v1/login');
      expect(options.data).to.deep.equal(data);
    });
  });
});
