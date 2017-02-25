(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['../utils/general'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('../utils/general'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.general);
    global.generalTest = mod.exports;
  }
})(this, function (_general) {
  'use strict';

  describe('utils/general', function () {
    describe('isClient', function () {
      // it('returns false if on the server', () => {
      //   expect(isClient()).toBe(false);
      // });

      // @todo Mock window...
      it('returns true if on the client', function () {
        expect((0, _general.isClient)()).toBe(true);
      });
    });

    describe('isServer', function () {
      // it('returns false if on the client', () => {
      //   expect(isServer()).toBe(false);
      // });

      // @todo Mock module...
      it('returns true if on the server', function () {
        expect((0, _general.isServer)()).toBe(true);
      });
    });
  });
});