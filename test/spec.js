"use strict";

const should = require('should');
const assert = require('assert');

describe('storage', () => {
  const storage = require('./stubs/storage-stub.js');
  beforeEach(function () {
    storage.clear();
  });
  describe('storage-stub', () => {
    it('should save and load a given data', (done) => {
      storage.save('KEY', [{ name: 'boomark1' }, { name: 'bookmark2' }])
        .then(() => storage.load('KEY'))
        .then(data => {
          if (data.length === 2) done();
          else done(new Error('Expected 2, returned ' + data.length));
        })
    })
  })
});