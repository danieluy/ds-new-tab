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
describe('bookmarks', () => {
  const storage = require('./stubs/storage-stub.js');
  const bookmarks = require('../src/bookmarks');
  bookmarks.stubStorageDependency(storage);
  beforeEach(function () {
    storage.clear();
  });
  describe('set().then(get())', () => {
    it('should set and get a full set of bookmarks', (done) => {
      bookmarks.set([{ name: 'boomark1' }, { name: 'bookmark2' }])
        .then(() => bookmarks.get())
        .then((data) => {
          if (data.length !== 2) done(new Error('Expected 2, returned ' + data.length));
          else if (!Array.prototype.isPrototypeOf(data)) done(new Error('Expected Array'));
          else done();
        })
    })
  })
  describe('add()', () => {
    it('should add a given bookmark', (done) => {
      bookmarks.set([{ name: 'boomark1' }, { name: 'bookmark2' }])
        .then(() => bookmarks.add({ name: 'bookmark3' }))
        .then(() => bookmarks.get())
        .then((data) => {
          if (data.length !== 3) done(new Error('Expected 2, returned ' + data.length));
          else if (!Array.prototype.isPrototypeOf(data)) done(new Error('Expected Array'));
          else done();
        })
    })
  })
})