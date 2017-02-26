import {
  destroyTerra,
  createTerra,
  getDataById,
} from '../../utils/terra';
import {
  getStylesModifiers,
  addStylesModifier,
  removeStylesModifier,
  clearStylesModifiers,
  addStyles,
} from '../../utils/style';

describe('utils/style', () => {
  const id = 'terra-id';
  const fakeStyler = jest.fn((val) => val);
  const fakeStylers = [
    fakeStyler,
  ];

  beforeEach(() => {
    document.body.innerHTML = `<div id="${id}" />`;
    createTerra(id, null, null, [
      fakeStyler,
    ]);
  });

  afterEach(() => {
    destroyTerra(id)
  });

  describe('getStylesModifiers', () => {
    it('returns empty array if no map', () => {
      expect(getStylesModifiers('no-map')).toEqual([]);
    });

    it('returns styleModifiers for the map', () => {
      expect(getStylesModifiers(id)).toEqual(fakeStylers);
    });
  });

  describe('addStylesModifier', () => {
    it('does not add modifier if same function is added', () => {
      addStylesModifier(id, fakeStyler);
      expect(getStylesModifiers(id).length).toEqual(1);
    });

    it('adds style modifiers to the map', () => {
      addStylesModifier(id, () => {});
      expect(getStylesModifiers(id).length).toEqual(2);
    });
  });

  describe('removeStylesModifier', () => {
    it('removes a styleModifier', () => {
      removeStylesModifier(id, fakeStyler);
      expect(getStylesModifiers(id).length).toEqual(0);
    });

    it('does not remove a styleModifier if does not exist', () => {
      removeStylesModifier(id, () => {})
      expect(getStylesModifiers(id).length).toEqual(1);
    });
  });

  describe('clearStylesModifiers', () => {
    it('doesn\'t clear modifiers if map not found', () => {
      clearStylesModifiers('no');
      expect(getStylesModifiers(id).length).toEqual(1);
    });

    it('clears modifiers', () => {
      clearStylesModifiers(id);
      expect(getStylesModifiers(id).length).toEqual(0);
    });
  });

  describe('addStyles', () => {
    // it('doesn\'t clear modifiers if map not found', () => {
    //   clearStylesModifiers('no');
    //   expect(getStylesModifiers(id).length).toEqual(1);
    // });
    //
    // it('clears modifiers', () => {
    //   clearStylesModifiers(id);
    //   expect(getStylesModifiers(id).length).toEqual(0);
    // });
  });
});
