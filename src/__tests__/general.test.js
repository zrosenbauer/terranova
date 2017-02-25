import {
  isClient,
  isServer,
} from '../utils/general';

describe('utils/general', () => {
  describe('isClient', () => {
    // it('returns false if on the server', () => {
    //   expect(isClient()).toBe(false);
    // });

    // @todo Mock window...
    it('returns true if on the client', () => {
      expect(isClient()).toBe(true);
    });
  });

  describe('isServer', () => {
    // it('returns false if on the client', () => {
    //   expect(isServer()).toBe(false);
    // });

    // @todo Mock module...
    it('returns true if on the server', () => {
      expect(isServer()).toBe(true);
    });
  });
});
