import { inputToNumber, getFileContents } from '../../src/inc/utils';

describe('Utility Functions (inc/utils)', () => {
  describe('inputToNumber()', () => {
    test('empty string should result in false', () => {
      expect(inputToNumber('')).toBe(false);
    });
    test('string with letters should result in false', () => {
      expect(inputToNumber('abc')).toBe(false);
    });
    test('string with numbers should result in a number', () => {
      expect(inputToNumber('123')).toBe(123);
    });
    test('string of 0 should result in 0', () => {
      expect(inputToNumber('0')).toBe(0);
    });
  });

  describe('getFileContents()', () => {
    test('file contents should be a string', () => {
      expect(typeof getFileContents('tests/utils/data/getFileContents.dat')).toBe('string');
    });
    test('file contents should be 123/456/789 (new lines)', () => {
      expect(getFileContents('tests/utils/data/getFileContents.dat')).toBe('123\n456\n789');
    });
    test('file contents should be a string without newlines (flatten flag)', () => {
      expect(getFileContents('tests/utils/data/getFileContents.dat', true).includes('\n')).toBe(false);
    });
    test('file contents should be 123456789 (flatten flag)', () => {
      expect(getFileContents('tests/utils/data/getFileContents.dat', true)).toBe('123456789');
    });
  });
});
