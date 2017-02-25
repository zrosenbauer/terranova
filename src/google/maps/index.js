let maps = null;

// google/maps Module
// ------------------------------------
// maps module, handles a proxy to the
// google.maps object, on the server we
// don't throw an error, cause imports.
// ------------------------------------

if (typeof window !== 'undefined' && window.google && window.google.maps) {
  maps = window.google.maps;
} else {
  maps = {};
}

export default maps;
