const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const index = require('./index');
const fs = require('fs');
const jsdom = require('jsdom');

const expect = chai.expect;
chai.use(sinonChai);

describe('index', function() {
  var jquery = null;

  before(() => {
    const html = fs.readFileSync(__dirname + '/../index.html');
    const document = jsdom.jsdom(html);
    jquery = require('jquery')(document.defaultView);
  });

  afterEach(() => {
    index.setJquery(jquery);
  });

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

  describe('init', function() {
    it('should select existing elements', function() {
      sinon.stub(jquery, 'ajax').returns(Promise.resolve());
      const jquerySpy = sinon.spy(jquery);
      index.setJquery(jquerySpy);
      index.init();
      jquery(jquerySpy.firstCall.args[0]).submit();
      jquerySpy.args.forEach((callArgs) => {
        expect(jquery(callArgs[0]).length).to.be.above(0);
      })
    });
  });
});
