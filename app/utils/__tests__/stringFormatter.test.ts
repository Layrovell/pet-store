import { describe, expect, test } from '@jest/globals';
import { firstUpperLetter } from '../stringFormatter';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(firstUpperLetter('hello')).toBe('Hello');
  });
});

describe('should be fine ', () => {
  test('some silly test', () => {
    expect('hello').toBe('hello');
  });
  test('some silly test 2', () => {
    expect('hello').toBe('hello');
  });
});
