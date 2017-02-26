import _ from 'lodash';
import {
  destroyTerra,
  createTerra,
  getDataById,
} from '../../utils/terra';
import Feature, {
  FEATURE_EVENTS,
  getFeatureByMapId,
  getFeatureTypeByName,
  getFeatureType,
  getFeatureState,
  getFeatureTypesByMapId,
  getFeatureProperties,
  setFeatureState,
  setFeatureType,
  addFeatures,
  updateFeatures,
  handleFeatureEvents,
} from '../../utils/features';

describe('utils/features', () => {
  const id = 'terra-id';
  const fakeStyler = jest.fn((val) => val);
  const fakeTypes = {
    fake: {
      name: 'fake',
    },
  };
  const fakeStylers = [
    fakeStyler,
  ];
  const fakeFeatureId = 'fake-feature-id';
  const defaultFeature = {
    id: fakeFeatureId,
    setProperty: jest.fn((key, obj) => obj),
    getProperty: jest.fn((val) => val),
    getId: () => fakeFeatureId,
  };

  // Generate fake features
  function getFakeFeature(opts = defaultFeature) {
    return ({
      ...opts,
    });
  }

  beforeEach(() => {
    document.body.innerHTML = `<div id="${id}" />`;
    createTerra(id, null, fakeTypes, fakeStylers);
    // Manually add feature...
    getDataById(id).add(getFakeFeature());
  });

  afterEach(() => {
    destroyTerra(id)
  });

  it('matches snap shot for events constant', () => {
    expect(FEATURE_EVENTS).toMatchSnapshot();
  });

  // export function updateFeatures(mapId: string, nextFeatures: Array<Object> = []): void {
  //   const data = getDataById(mapId);
  //
  //   // Check if existing features need to be removed
  //   // and removes them, will skip those that exist in the incoming features
  //   if (data && data.length) {
  //     data.forEach((feature) => {
  //       if (!find(nextFeatures, { id: feature.getId() })) {
  //         data.remove(feature);
  //       }
  //     });
  //   }
  //
  //   // Add new features, only those that need to be updated will be
  //   forEach(nextFeatures, (feature) => {
  //     if (data.getFeatureById(feature.id)) {
  //       return;
  //     }
  //     data.add(transformToValidFeature(feature, mapId));
  //   });
  // }

  // only calls remove on features with id not found
  // only calls add for features without id present
  // on addition transforms to Point and Poly respectively

  describe('updateFeatures', () => {
    const latLng = {
      lat: 44.2433,
      lng: 88.2243,
    };
    const newFeature = {
      type: 'foo',
      id: 'new-one',
      geometry: latLng,
    };

    it('removes features if not in the nextFeatures', () => {
      updateFeatures(id, []);
      const data = getDataById(id);
      expect(data.remove).toBeCalled();
      expect(getFeatureByMapId(id, fakeFeatureId)).toBe(null);
      expect(data.getFeatures().length).toBe(0);
    });

    it('will not remove if still in nextFeatures & not add if same feature', () => {
      updateFeatures(id, [getFakeFeature()]);
      const data = getDataById(id);
      expect(data.remove).not.toBeCalled();
      expect(data.getFeatures().length).toBe(1);
    });

    it('will add feature as LatLng', () => {
      updateFeatures(id, [newFeature]);
      const data = getDataById(id);
      expect(data.add).toBeCalledWith({
        ..._.omit(newFeature, 'type'),
        properties: {
          [Feature.typeKey]: newFeature.type,
          [Feature.stateKey]: {},
        }
      });
    });

    it('will add feature as polygon', () => {
      const poly = [
        latLng,
        latLng,
        latLng,
      ];
      updateFeatures(id, [
        {
          ...newFeature,
          geometry: poly,
        }
      ]);
      const data = getDataById(id);
      expect(data.getFeatureById(newFeature.id)).toEqual({
        ..._.omit(newFeature, 'type'),
        geometry: [poly],
        properties: {
          [Feature.typeKey]: newFeature.type,
          [Feature.stateKey]: {},
        }
      });
    });
  });

  describe('getFeatureTypesByMapId', () => {
    it('returns null if no map', () => {
      expect(getFeatureTypesByMapId('no-map')).toBe(null);
    });

    it('returns featureTypes', () => {
      expect(getFeatureTypesByMapId(id)).toEqual(fakeTypes);
    });
  });

  describe('getFeatureProperties', () => {
    let props = {
      foo: 'bar',
      bill: 'bob',
    };
    const fakeFeature = getFakeFeature({
      ...defaultFeature,
      forEachProperty: jest.fn((cb) => {
        for (let key in props) {
          cb(props[key], key);
        }
      }),
    });

    it('returns empty object if no feature', () => {
      expect(getFeatureProperties(null)).toEqual({});
    });

    it('returns feature properties', () => {
      expect(getFeatureProperties(fakeFeature)).toEqual(props);
    });
  });

  describe('setFeatureType', () => {
    const initType = 'fake-type';
    let typeProp = initType;
    const fakeFeature = getFakeFeature({
      ...defaultFeature,
      getProperty: jest.fn(() => typeProp),
      setProperty: jest.fn((key, val) => {
        typeProp = val;
      }),
    });

    it('does not update type incoming type is the same', () => {
      setFeatureType(fakeFeature, initType);
      expect(fakeFeature.setProperty).not.toBeCalled();
    });

    it('updates feature type', () => {
      const nextType = 'next-type';
      setFeatureType(fakeFeature, nextType)
      expect(getFeatureType(fakeFeature)).toEqual(nextType);
    });
  });

  describe('setFeatureState', () => {
    const initState = {
      isOn: true,
      isOff: false,
    };
    let state = initState;
    const newFeature = {
      ...defaultFeature,
      getProperty: jest.fn(() => state),
      setProperty: jest.fn((key, object) => {
        state = {
          ...state,
          ...object,
        };
      })
    };
    const fakeFeature = getFakeFeature(newFeature);

    it('does not update if incoming state is the same', () => {
      setFeatureState(fakeFeature, initState);
      expect(fakeFeature.setProperty).not.toBeCalled();
    });

    it('updates feature state', () => {
      const nextState = {
        isNew: true,
      };
      setFeatureState(fakeFeature, nextState)
      expect(getFeatureState(fakeFeature)).toEqual({
        ...state,
        ...nextState,
      });
    });
  });

  describe('getFeatureState', () => {
    it('returns null if not found', () => {
      expect(getFeatureState()).toBe(null);
    });

    it('returns feature type if found', () => {
      const fakeType = 'fake-type';
      const feature = {
        ...defaultFeature,
        getProperty: jest.fn(() => fakeType),
      };
      expect(getFeatureState(feature)).toEqual(fakeType);
      expect(feature.getProperty).toBeCalled();
    });
  });

  describe('getFeatureType', () => {
    it('returns null if not found', () => {
      expect(getFeatureType()).toBe('');
    });

    it('returns feature type if found', () => {
      const fakeType = 'fake-type';
      const feature = {
        getProperty: jest.fn(() => fakeType),
      };
      expect(getFeatureType(feature)).toEqual(fakeType);
    });
  });

  describe('getFeatureTypeByName', () => {
    it('returns null if not found', () => {
      expect(getFeatureTypeByName(fakeTypes, 'not-this-guy')).toBe(null);
    });

    it('returns feature if found', () => {
      expect(getFeatureTypeByName(fakeTypes, 'fake')).toEqual(fakeTypes.fake);
    });
  });

  describe('getFeatureByMapId', () => {
    it('returns null if not found', () => {
      expect(getFeatureByMapId('not-found')).toBe(null);
    });

    it('returns feature if found', () => {
      expect(getFeatureByMapId(id, fakeFeatureId)).toEqual(getFakeFeature());
    });
  });
});
