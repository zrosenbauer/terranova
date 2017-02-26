import { setStyle } from '../../../testing/__mocks__/google';
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
  const fakeStyler = jest.fn((val) => {
    if (val.type === 'foobar') {
      return true;
    }

    return false;
  });
  const fakeStylers = [
    fakeStyler,
  ];
  const fakeType = 'foo';
  const feature = {
    id: 'fake-feature',
    type: fakeType,
    setProperty: jest.fn((key, obj) => obj),
    getProperty: jest.fn(() => fakeType),
  };
  const fakeTypes = {
    foo: {
      type: fakeType,
      getStyles: jest.fn((feature) => feature),
    },
  };

  beforeEach(() => {
    document.body.innerHTML = `<div id="${id}" />`;
    createTerra(id, null, fakeTypes, [
      fakeStyler,
    ]);
    // Add Feature
    getDataById(id).add(feature);
  });

  afterEach(() => {
    setStyle.mockClear();
    destroyTerra(id);
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

  // export function addStyles(mapId) {
  //   const featureStyles = getFeatureTypesByMapId(mapId);
  //
  //   getDataById(mapId).setStyle((feature) => {
  //     const type = getFeatureTypeByName(featureStyles, getFeatureType(feature));
  //
  //     // Allow custom overrides,
  //     // we will exit forEach once one of the
  //     // setStyle functions returns a style object
  //     let customOverride = null;
  //     const stylesModifiers = getStylesModifiers(mapId);
  //     if (stylesModifiers.length) {
  //       forEach(stylesModifiers, (setStyle) => {
  //         customOverride = setStyle(feature);
  //
  //         if (customOverride) {
  //           return;
  //         }
  //       });
  //     }
  //
  //     if (customOverride) {
  //       return customOverride;
  //     }
  //
  //     if (type) {
  //       return type.getStyles(feature);
  //     }
  //
  //     return null;
  //   });
  // }

  describe('addStyles', () => {
    it('uses the styles modifier', () => {
      const fakeFeature = {
        ...feature,
        type: 'foobar',
      };
      getDataById(id).clear();
      getDataById(id).add(fakeFeature);
      addStyles(id);
      expect(setStyle).toBeCalledWith(true);
    });

    it('does not use the custom override', () => {
      addStyles(id);
      expect(fakeTypes.foo.getStyles).toBeCalledWith(feature);
    });

    // it('clears modifiers', () => {
    //   clearStylesModifiers(id);
    //   expect(getStylesModifiers(id).length).toEqual(0);
    // });
  });
});
