import {
  terraExists,
  getTerraById,
  getDataById,
  getMapById,
  createTerra,
  destroyTerra,
} from '../../utils/terra';

describe('utils/terra', () => {
  const id = 'terra-id';

  beforeEach(() => {
    document.body.innerHTML = `<div id="${id}" />`;
    createTerra(id);
  });

  afterEach(() => {
    destroyTerra(id)
  });

  describe('terraExists', () => {
    it('returns true if exists', () => {
      expect(terraExists(id)).toBe(true);
    });

    it('returns false if doesn\'t exist', () => {
      expect(terraExists('no-im-not-home')).toBe(false);
    });
  });

  describe('getTerraById', () => {
    it('returns null if doesn\'t exist', () => {
      expect(getTerraById('no-im-not-home')).toBe(null);
    });

    it('returns terra if it exists', () => {
      expect(getTerraById(id)).not.toBe(null);
    });
  });

  describe('getDataById', () => {
    it('returns null if doesn\'t exist', () => {
      expect(getDataById('no-im-not-home')).toBe(null);
    });

    it('returns data if it exists', () => {
      expect(getDataById(id)).not.toBe(null);
    });
  });

  describe('getMapById', () => {
    it('returns null if doesn\'t exist', () => {
      expect(getMapById('no-im-not-home')).toBe(null);
    });

    it('returns map if it exists', () => {
      expect(getMapById(id)).not.toBe(null);
    });
  });

  describe('createTerra', () => {
    it('throws error if map already exists', () => {
      const error = new Error(`Map with id of ${id}, already exists!`);
      expect(() => {
        createTerra(id);
      }).toThrowError(error);
    });

    it('creates new map', () => {
      destroyTerra(id)
      expect(getTerraById(id)).toBe(null);
      createTerra(id);
      expect(getTerraById(id)).not.toBe(null);
    });
  });

  describe('destroyTerra', () => {
    it('destroys map if exists', () => {
      destroyTerra(id)
      expect(getTerraById(id)).toBe(null);
    });
  });
});
