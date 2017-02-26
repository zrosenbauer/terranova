import {
  getEventNamespace,
  ens,
  dispatchMapEvent,
  dispatch,
} from '../../utils/events';

describe('utils/events', () => {

  describe('getEventNamespace', () => {
    const args = ['a', 'b', 'c'];
    const runTest = (func) => {
      return () => {
        expect(func(...args)).toBe(args.join('.'));
      };
    };

    it('returns the properly formatted namespace', runTest(getEventNamespace));
    it('proxies to `ens` and returns the properly formatted namespace', runTest(ens));
  });

  describe('dispatchMapEvent', () => {
    window.google.maps.event.trigger = jest.fn();
    const args = ['a', 'b', 'c'];
    const runTest = (func) => {
      return () => {
        func(...args);
        expect(window.google.maps.event.trigger).toHaveBeenCalledWith(null, args[1], args[2]);
      };
    };

    it('returns the properly formatted namespace', runTest(dispatchMapEvent));
    it('proxies to `dispatch` and returns the properly formatted namespace', runTest(dispatch));
  });
});
