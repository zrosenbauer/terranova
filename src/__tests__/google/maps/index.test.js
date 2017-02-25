describe('google/maps', () => {
  const tempGoog = window.google;

  afterAll(() => {
    window.google = tempGoog;
  });

  it('allows export of google.maps if on client and loaded', () => {
    const maps = require('../../../google/maps');
    expect(maps.default).toBe(window.google.maps);
  });

  it('exports empty object if not on client or not loaded', () => {
    window.google = null;
    console.log(window.google);
    const maps = require('../../../google/maps');
    expect(maps.default).toBe(window.google);
  });
});
