import {
  getMapById,
  createTerra,
  destroyTerra,
} from '../../utils/terra';
import {
  latLngToPixel,
} from '../../utils/calculations';

describe('utils/calculations', () => {
  const id = 'terra-id';
  beforeEach(() => {
    document.body.innerHTML = `<div id="${id}" />`;
    createTerra(id);
  });

  afterEach(() => {
    destroyTerra(id)
  });

  describe('latLngToPixel', () => {
    it('does something', () => {
      const latLng = {
        lat: 44.121,
        lng: -88.873,
      };
      const point = latLngToPixel(getMapById(id), latLng);
      expect(point.x).toBe(-53278.71999999997);
      expect(point.y).toBe(-1815504.896);
    });
  });
});
