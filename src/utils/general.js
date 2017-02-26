/* @flow */

// General Module
// ------------------------------------
// Another case of poor naming, but this
// modules is correctly named in that
// it contains only general utils.
// ------------------------------------

/**
 * Returns true on client,
 * @returns {Boolean}
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Returns true on server,
 * @returns {Boolean}
 */
export function isServer(): boolean {
  return typeof module === 'object' && typeof module.exports === 'object';
}

// Public Api
export default {
  isClient,
  isServer,
};
