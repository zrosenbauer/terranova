import {
  destroyTerra,
  createTerra,
  getDataById,
} from '../../utils/terra';
import {
  getFeatureBounds,
  getFeatureByMapId,
  getFeatureProperties,
  getFeatureState,
  getFeatureType,
  setFeatureState,
  setFeatureType,
} from '../../utils/features';

describe('utils/features', () => {
  const id = 'terra-id';

  beforeEach(() => {
    document.body.innerHTML = `<div id="${id}" />`;
    createTerra(id);
  });

  afterEach(() => {
    destroyTerra(id)
  });

  describe('getFeatureByMapId', () => {
    it('returns null if not found', () => {
      expect(getFeatureByMapId('not-found')).toBe(null);
    });

    it('returns feature if found', () => {
      const featureId = 'feature-id';
      expect(getFeatureByMapId(id, featureId)).toBe(featureId);
    });
  });
});
