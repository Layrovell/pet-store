import { describe, expect, test } from '@jest/globals';
import { firstUpperLetter } from '../stringFormatter';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(firstUpperLetter('hello')).toBe('Hello');
  });
});

describe('should be fine ', () => {
  test('111 hello to Hello', () => {
    expect(firstUpperLetter('hello DFDGF')).toBe('Hello DFDGF')
  });
  test('222 hello to Hello', () => {
    expect(firstUpperLetter('hello')).toBe('Hello')
  });
  test('333 hello to Hello', () => {
    expect(firstUpperLetter('')).toBe('gggg')
  });
});
