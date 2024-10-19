// Memory-based mock localStorage (for Node.js)
const localStorageMock = {
  _data: {},

  getItem: function(key) {
    return this._data[key] || null;
  },

  setItem: function(key, value) {
    this._data[key] = value;
  }
};

// Check if the environment is browser or Node.js
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Use appropriate storage (mimics localStorage behavior)
// Proxy allows usage like localStorage["foo"] for getting/setting items
const memoryStorage = new Proxy(isBrowser ? window.localStorage : localStorageMock, {
  get(target, prop) {
    return target.getItem(prop);
  },
  set(target, prop, value) {
    target.setItem(prop, value);
    return true;
  }
});

export default memoryStorage;
