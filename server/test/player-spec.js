const expect = require('chai').expect

describe('addPlayer', function () {
  let addPlayer;
  beforeEach(function () {
    addPlayer = require('../routes/players')
  })
  it('resolves', (done) => {
    const resolvingPromise = new Promise( (resolve) => {
      resolve('promise resolved')
    });
    resolvingPromise.then( (result) => {
      expect(result).to.equal('promise resolved');
      done()
    })
  })
})
