//const sum = require('../src/index');
import $ from 'jquery';
import sum from './../src/index.js'

test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})