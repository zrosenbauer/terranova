import * as terra from './utils/terra';
import * as style from './utils/style';
import * as calc from './utils/calculations';
import * as events from './utils/events';
import * as features from './utils/features';
import Terra from './Outer';
import InfoWindowComponent from './InfoWindow';

// Terra
export const getMapById = terra.getMapById;
export const getDataByMapId = terra.getDataByMapId;

// Calculations
export const latLngToPixel = calc.latLngToPixel;

// Styles Modifiers
export const addStylesModifier = style.addStylesModifier;
export const removeStylesModifier = style.removeStylesModifier;
export const clearStylesModifiers = style.clearStylesModifiers;

// Feature
export const getFeatureBounds = features.getFeatureBounds;
export const getFeatureState = features.getFeatureState;
export const setFeatureState = features.setFeatureState;
export const getFeatureType = features.getFeatureType;
export const setFeatureType = features.setFeatureType;
export const getFeatureByMapId = features.getFeatureByMapId;
export const getFeatureProperties = features.getFeatureProperties;
export const FEATURE_EVENTS = features.FEATURE_EVENTS;

// Events
export const getEventNamespace = events.getEventNamespace;
export const ens = events.ens;

export const InfoWindow = InfoWindowComponent;

// UI component
export default Terra;
