import {
  FEATURE_EVENTS,
  getFeatureState,
} from '../../../../index';

const idleStyles = {
  fillOpacity: 0,
  strokeColor: '#2917cc',
  strokeOpacity: 1,
  strokeWeight: 2,
};

const activeStyles = {
  fillColor: '#fff',
  fillOpacity: 0.25,
  strokeColor: '#c33',
};

export default {
  name: 'polygon',
  initialState: {
    isIdle: true,
    isHovered: false,
    hasBeenHovered: false,
    hasBeenClicked: false,
  },
  handleEvents: (feature, eventType) => {
    switch (eventType) {
      case FEATURE_EVENTS.mouseOut:
        return {
          ...getFeatureState(feature),
          isIdle: true,
          isHovered: false,
          hasBeenHovered: true,
        };
      case FEATURE_EVENTS.mouseOver:
        return {
          ...getFeatureState(feature),
          isHovered: true,
        };
      case FEATURE_EVENTS.click:
        return {
          ...feature.getProperty('state'),
          hasBeenClicked: true,
        };
      default:
        return getFeatureState(feature);
    }
  },
  getStyles: (feature) => {
    const state = getFeatureState(feature);

    if (state.isHovered) {
      return activeStyles;
    }

    return idleStyles;
  },
};
