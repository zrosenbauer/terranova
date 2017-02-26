import {
  isClient,
  isServer,
} from '../../utils/general';

describe('utils/general', () => {
  describe('isClient', () => {
    it('returns true if on the client', () => {
      expect(isClient()).toBe(true);
    });
  });

  describe('isServer', () => {
    it('returns true if on the server', () => {
      expect(isServer()).toBe(true);
    });
  });
});
