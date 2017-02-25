import {
  FEATURE_EVENTS,
  getFeatureState,
} from '../../../../index';

const idleStyles = {};

const activeStyles = {
  icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  zIndex: 1000, // puts on top of all other markers
};

export default {
  name: 'marker',
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
          ...getFeatureState(feature),
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
