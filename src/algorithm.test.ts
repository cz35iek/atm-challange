import getCoins from './algorithm'

// const getCoins = require('./algorithm.js')

test('Entry: 30.00 to equal 30.00)', () => {
  expect(getCoins(30.00)).toEqual([20.00, 10.00])
});

test('Entry: 80.00 to equal 30.00)', () => {
  expect(getCoins(80.00)).toEqual([50.00, 20.00, 10.00])
});

test('Entry: 125.00 to throw NoteUnavailableException', () => {
  expect(() => getCoins(125.00)).toThrowError(new Error('NoteUnavailableException'))
});

test('Entry: -130.00 to throw InvalidArgumentException', () => {
  expect(() => getCoins(-130.00)).toThrowError(new Error('InvalidArgumentException'))
});

test('Entry: NULL to equal [Empty Set])', () => {
  expect(getCoins(null)).toEqual([])
});

