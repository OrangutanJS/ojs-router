'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);

  _classCheckPrivateStaticFieldDescriptor(descriptor, "get");

  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);

  _classCheckPrivateStaticFieldDescriptor(descriptor, "set");

  _classApplyDescriptorSet(receiver, descriptor, value);

  return value;
}

function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);

  return method;
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

function _classCheckPrivateStaticAccess(receiver, classConstructor) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }
}

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
  if (descriptor === undefined) {
    throw new TypeError("attempted to " + action + " private static field before its declaration");
  }
}

function renderIfHtmlElementGiven(element) {
  var renderIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  if (!element) {
    return;
  }

  var render = function render(element) {
    renderIn.innerHTML = '';
    renderIn.appendChild(element);
  };

  if (element instanceof HTMLElement) {
    render(element);
  }

  if (element.init && typeof element.init === 'function') {
    var result = element.init();

    if (result instanceof HTMLElement) {
      render(result);
    }
  }
}

function routesFilter(splittedPath, routingTable) {
  var routes = Object.keys(routingTable).map(function (route) {
    return {
      full: route,
      splitted: route.split('/').filter(function (route) {
        return route !== '';
      })
    };
  });
  var routesFiltered = routes.filter(function (route) {
    return route.splitted.length === splittedPath.length;
  });

  var _loop = function _loop(i) {
    routesFiltered = routesFiltered.filter(function (route) {
      return route.splitted[i] === splittedPath[i] || route.splitted[i].startsWith(':');
    });
  };

  for (var i = 0; i < splittedPath.length; i++) {
    _loop(i);
  }

  return routesFiltered;
}

function setOnPopStateEvent(callback) {
  if (!window.onpopstate) {
    window.onpopstate = function (e) {
      e.preventDefault();
      callback();
    };
  }
}

function decodeSearchQuery(query) {
  var parsedQuery = Object.create(null);
  if (typeof query !== 'string' || !query.length || !query.startsWith('?')) return parsedQuery;
  var queryParametersSplitted = query.substring(1).split('&');
  queryParametersSplitted.forEach(function (parameter) {
    var _parameter$split = parameter.split('='),
        _parameter$split2 = _slicedToArray(_parameter$split, 2),
        key = _parameter$split2[0],
        value = _parameter$split2[1];

    parsedQuery[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return parsedQuery;
}

function createUrlObject(path) {
  var originPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (_typeof(path) === 'object' && path instanceof URL) return path;
  return path || path === '' ? new URL(window.location.origin + originPrefix + path) : new URL(window.location.href);
}

function splitAndFilterPath(path) {
  var originPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var parsedOriginPrefix = originPrefix.startsWith('/') ? originPrefix.substring(1) : originPrefix;
  return path.split('/').filter(function (part) {
    return part !== '' && part !== parsedOriginPrefix;
  });
}

var FORBIDDEN_PARAMETERS = ['fullPath', 'url', 'hash', 'searchParameters'];
function decodeParameters(route, splittedPath) {
  var decodedParameters = {};
  route.splitted.forEach(function (part, index) {
    if (part.startsWith(':')) {
      var parameterName = part.replace(':', '');
      if (FORBIDDEN_PARAMETERS.includes(parameterName)) return;
      decodedParameters[parameterName] = splittedPath[index];
    }
  });
  return decodedParameters;
}

function encodeSearchQuery(searchParameters) {
  if (!searchParameters || _typeof(searchParameters) !== 'object') return '';
  var searchParametersEntries = Object.entries(searchParameters);
  var searchQueryString = '?';
  searchQueryString += searchParametersEntries.filter(function (parameterEntry) {
    return searchParametersFilter(parameterEntry);
  }).map(function (parameterEntry) {
    return searchParametersMapper(parameterEntry);
  }).join('&');
  if (!searchQueryString.substring(1).length) return '';
  return searchQueryString;
}

function searchParametersFilter(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      value = _ref2[1];

  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

function searchParametersMapper(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];

  return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
}

/**
 * @property {string} originPrefix
 * @static
 * @description Set only if your origin url has a static prefix.
 * Example: http:/yourdomain.com/prefixExample -> originPrefix = '/prefixExample'
 * @property {function} defaultView
 * @static
 * @description default view for oRouter ('/' path).
 */
//TODO: wykrywanie zmian w urlu np. dodanie hasha poza api oRoutera

var oRouter = /*#__PURE__*/function () {
  function oRouter() {
    _classCallCheck(this, oRouter);
  }

  _createClass(oRouter, null, [{
    key: "defaultView",
    set: //TODO: setter or type secure
    //TODO: setter or type secure
    function set(value) {
      if (!value || !(typeof value === 'function')) {
        throw new Error('Not valid defaultView parametereter.');
      }

      _classStaticPrivateFieldSpecSet(oRouter, oRouter, _defaultView, value);
    }
  }, {
    key: "routingParameters",
    get: function get() {
      return _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters);
    },
    set: function set(value) {
      return value;
    }
  }, {
    key: "redirect",
    value: function redirect(path, parameters) {
      oRouter.route(path, parameters);
    }
  }, {
    key: "route",
    value: function route(givenPath, givenParameters) {
      setOnPopStateEvent(oRouter.route);
      var renderFunctionResult;
      var url = createUrlObject(givenPath, oRouter.originPrefix);

      _classStaticPrivateFieldSpecSet(oRouter, oRouter, _routingParameters, {
        fullPath: url.href.replace(url.origin, ''),
        url: url,
        searchParameters: decodeSearchQuery(url.search),
        hash: url.hash,
        parameters: {}
      });

      if (_typeof(givenParameters) === 'object') {
        Object.assign(_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters), givenParameters);
      }

      var splittedPath = splitAndFilterPath(url.pathname, oRouter.originPrefix);

      if (!splittedPath.length) {
        _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, url);

        renderFunctionResult = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _defaultView).call(oRouter, _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters));
        renderIfHtmlElementGiven(renderFunctionResult);
        return true;
      }

      var routesFiltered = routesFilter(splittedPath, oRouter.routingTable);

      if (!routesFiltered.length) {
        var _classStaticPrivateFi = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
            _url = _classStaticPrivateFi.url;

        if (!oRouter.routingTable['404-notFound']) {
          return false;
        }

        _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, _url);

        renderFunctionResult = oRouter.routingTable['404-notFound'](_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters));
        renderIfHtmlElementGiven(renderFunctionResult);
        return false;
      }

      var foundRoute = routesFiltered[0];
      Object.assign(_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters).parameters, decodeParameters(foundRoute, splittedPath));

      _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, url);

      renderFunctionResult = oRouter.routingTable[foundRoute.full](_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters));
      renderIfHtmlElementGiven(renderFunctionResult);
      return true;
    }
  }, {
    key: "setSearchParameter",
    value: function setSearchParameter(key, value) {
      if (!key || typeof key !== 'string' || _typeof(value) === 'object') return false;
      return oRouter.setSearchParameters(_defineProperty({}, key, String(value)));
    }
  }, {
    key: "unsetSearchParameter",
    value: function unsetSearchParameter(key) {
      if (!_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters).searchParameters[key]) return false;
      delete _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters).searchParameters[key];

      var _classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
          url = _classStaticPrivateFi2.url;

      var parametersStr = _classStaticPrivateMethodGet(oRouter, oRouter, _searchParametersToString).call(oRouter);

      url.search = "?".concat(parametersStr);
      return _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, url);
    }
  }, {
    key: "setSearchParameters",
    value: function setSearchParameters(parameters) {
      if (_typeof(parameters) !== 'object') return false;
      if (!Object.keys(parameters).length) return true;

      var _classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
          url = _classStaticPrivateFi3.url;

      url.search = _classStaticPrivateMethodGet(oRouter, oRouter, _searchParametersToString).call(oRouter, parameters);
      return _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, url);
    }
  }, {
    key: "unsetSearchParametersAll",
    value: function unsetSearchParametersAll() {
      var _classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
          url = _classStaticPrivateFi4.url;

      var searchParameters = decodeSearchQuery(url.search);
      Object.keys(searchParameters).forEach(function (searchParameter) {
        return oRouter.unsetSearchParameter(searchParameter);
      });
      return _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, url);
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {
      if (!hash || _typeof(hash) === 'object') return false;
      hash = String(hash);

      var _classStaticPrivateFi5 = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
          url = _classStaticPrivateFi5.url;

      if (hash.startsWith('#')) {
        hash = hash.substring(1);
      }

      var alreadyInRegExp = new RegExp("#?".concat(hash, "(#|$)"), 'i');
      if (alreadyInRegExp.test(url.hash)) return true;
      url.hash += '#' + hash;
      return _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, url);
    }
  }, {
    key: "unsetHash",
    value: function unsetHash(hash) {
      if (!hash || _typeof(hash) === 'object') return false;
      hash = String(hash);

      var _classStaticPrivateFi6 = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
          url = _classStaticPrivateFi6.url;

      if (hash.startsWith('#')) {
        hash = hash.substring(1);
      }

      var alreadyInRegExp = new RegExp("#?".concat(hash, "(#|$)"), 'i');
      url.hash = url.hash.replace(alreadyInRegExp, '');
      return _classStaticPrivateMethodGet(oRouter, oRouter, _changeState).call(oRouter, url);
    }
  }, {
    key: "unsetHashAll",
    value: function unsetHashAll() {
      var _classStaticPrivateFi7 = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
          url = _classStaticPrivateFi7.url;

      var hashes = url.hash.split('#').filter(function (hash) {
        return hash !== '';
      });
      hashes.forEach(function (hash) {
        return oRouter.unsetHash(hash);
      });
    }
  }, {
    key: "isSetHash",
    value: function isSetHash(hash) {
      var alreadyInRegExp = new RegExp("#?".concat(hash, "(#|$)"));

      var _classStaticPrivateFi8 = _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters),
          url = _classStaticPrivateFi8.url;

      return alreadyInRegExp.test(url.hash);
    }
  }, {
    key: "back",
    value: function back() {
      window.history.back();
    }
  }]);

  return oRouter;
}();

function _searchParametersToString(searchParameters) {
  if (searchParameters) {
    Object.assign(_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters).searchParameters, searchParameters);
  }

  return encodeSearchQuery(_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters).searchParameters);
}

function _changeState(url) {
  var pathname = url.pathname;
  _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters).fullPath = url.href.replace(url.origin, '');

  try {
    if (pathname === window.location.pathname) {
      window.history.replaceState(JSON.parse(JSON.stringify(_classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters))), document.title, url);
    } else {
      var state = _objectSpread2(_objectSpread2({}, _classStaticPrivateFieldSpecGet(oRouter, oRouter, _routingParameters)), {}, {
        redirectedFrom: window.location.pathname
      });

      window.history.pushState(JSON.parse(JSON.stringify(state)), document.title, url);
    }

    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

_defineProperty(oRouter, "originPrefix", '');

_defineProperty(oRouter, "routingTable", {});

var _routingParameters = {
  writable: true,
  value: {}
};
var _defaultView = {
  writable: true,
  value: function value() {
    return null;
  }
};

module.exports = oRouter;
