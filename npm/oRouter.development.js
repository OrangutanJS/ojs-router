'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
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

var oRouter = function () {
  function oRouter() {
    _classCallCheck(this, oRouter);
  }
  _createClass(oRouter, null, [{
    key: "defaultView",
    set: function set(value) {
      if (!value || !(typeof value === 'function')) {
        return false;
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

function oFragment(...children) {
    if (!(this instanceof oFragment)) {
        return new oFragment(...children);
    }
    this.children = children.length === 1 && Array.isArray(children[0])
        ? children[0]
        : children;
    this._isofragment = true;
}
oFragment.prototype.add = function (...children) {
    if (!children.length)
        return this;
    const childrenArray = children.length === 1 && Array.isArray(children[0])
        ? children[0]
        : children;
    this.children = this.children.concat(childrenArray);
    return this;
};
oFragment.prototype.init = function () {
    return this.children;
};
function addMethodService(children) {
    if (!this._isoelement) {
        console.error('Wrong usage of addService function');
        return;
    }
    if (
        typeof children === 'boolean' ||
        children === null ||
        typeof children === 'undefined'
    ) return;
    if (Array.isArray(children)) {
        children.forEach(child => addMethodService.call(this, child));
        return;
    }
    if (children._isofragment) {
        children.init().forEach(child => addMethodService.call(this, child));
        return;
    }
    if (children instanceof HTMLElement) {
        this.element.appendChild(children);
        return;
    }
    if (children._isoelement || children.__proto__.init) {
        const oInstanceHTML = children.init();
        if (oInstanceHTML instanceof HTMLElement) {
            this.element.appendChild(oInstanceHTML);
        }
    }
    return;
}
function inputFunction(instance, name, value) {
    if (instance.element.nodeName !== 'INPUT' || value === undefined) {
        return instance;
    }
    instance.element[name] = value;
    return instance;
}
function o(element) {
    if (!(this instanceof o)) {
        return new o(element);
    }
    if (element === 'fragment') {
        this.element = oFragment();
        return;
    }
    if (element instanceof HTMLElement) {
        this.element = element;
        return;
    }
    this.element = document.createElement(element);
    this._isoelement = true;
}
o.prototype.event = function (obj) {
    if (obj instanceof Array) {
        obj.forEach(event => this.element.addEventListener(
            event.name,
            event.fn,
        ));
    } else if (obj instanceof Object) {
        this.element.addEventListener(
            obj.name,
            obj.fn,
        );
    }
    return this;
};
o.prototype.click = function (cb) {
    this.element.addEventListener('click', cb);
    return this;
};
o.prototype.setAttribute = function (name, val) {
    this.element.setAttribute(name, val);
    return this;
};
o.prototype.setAttributes = function (attributes) {
    return this.attr(attributes);
};
o.prototype.attr = function (attrs) {
    if (Array.isArray(attrs)) {
        attrs.forEach(attr => this.element.setAttribute(attr.name, attr.val));
    } else {
        Object.entries(attrs).forEach(([name, val]) => this.element.setAttribute(name, val));
    }
    return this;
};
o.prototype.class = function (classNames) {
    if (Array.isArray(classNames)) {
        classNames.forEach(className => this.element.classList.add(className));
    } else if (typeof classNames === 'string') {
        this.element.className = classNames;
    }
    return this;
};
o.prototype.classList = function (classList) {
    return this.class(classList)
};
o.prototype.className = function (className) {
    return this.class(className)
};
o.prototype.id = function (id) {
    this.element.setAttribute('id', id);
    return this;
};
o.prototype.add = function (...children) {
    children.forEach(child => addMethodService.call(this, child));
    return this;
};
o.prototype.for = function (id) {
    if (this.element.nodeName === 'LABEL') {
        this.element.setAttribute('for', id);
    }
    return this;
};
o.prototype.get = function (attribute) {
    return this.element[attribute] || undefined;
};
o.prototype.getText = function () {
    return this.element.innerText;
};
o.prototype.getId = function () {
    return this.element.id || undefined;
};
o.prototype.parent = function () {
    const { parentNode } = this.element;
    return parentNode ? o(parentNode) : null;
};
o.prototype.text = function (text) {
    if (!['undefined', 'object', 'function'].includes(typeof text)) {
        this.element.textContent = text;
    }
    return this;
};
o.prototype.html = function (html) {
    if (typeof (html) == 'object') {
        try {
            this.element.appendChild(html);
        } catch (err) {
            console.warn('Object is not HTMLElement: parametr 1 is type ' + typeof (html) + '\n' + err);
        }
    } else if (typeof (html) !== undefined && html !== undefined) {
        this.element.innerHTML = html;
    }
    return this;
};
o.prototype.init = function () {
    return (this.element instanceof oFragment) ? this.element.init() : this.element;
};
o.prototype.ref = function (oRefInstance) {
    if (!oRefInstance || !oRefInstance._isoref) {
        return this;
    }
    oRefInstance.target = this.element;
    oRefInstance.o = this;
    return this;
};
o.prototype.style = function (styles) {
    this.element.setAttribute('style', styles);
    return this;
};
o.prototype.placeholder = function (placeholder) { return inputFunction(this, 'placeholder', placeholder) };
o.prototype.value = function (value) { return inputFunction(this, 'value', value) };
o.prototype.type = function (type) { return inputFunction(this, 'type', type) };
o.prototype.name = function (name) { return inputFunction(this, 'name', name) };
o.prototype.min = function (min) { return inputFunction(this, 'min', min) };
o.prototype.max = function (max) { return inputFunction(this, 'max', max) };
o.prototype.disabled = function (disabled) { return inputFunction(this, 'disabled', disabled) };
o.prototype.required = function (required) { return inputFunction(this, 'required', required) };

function oLink(route) {
  if (!(this instanceof oLink)) return new oLink(route);
  this.element = o('a').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (route) {
      oRouter.redirect(route);
    }
  });
}
oLink.prototype.add = function () {
  var _this$element;
  (_this$element = this.element).add.apply(_this$element, arguments);
  return this;
};
oLink.prototype.setAttribute = function (name, val) {
  this.element.setAttribute(name, val);
  return this;
};
oLink.prototype.setAttributes = function (attributes) {
  this.element.attr(attributes);
  return this;
};
oLink.prototype.attr = o.prototype.setAttributes;
oLink.prototype["class"] = function (classNames) {
  this.element["class"](classNames);
  return this;
};
oLink.prototype.classList = function (classList) {
  return this["class"](classList);
};
oLink.prototype.className = function (className) {
  return this["class"](className);
};
oLink.prototype.id = function (id) {
  this.element.id(id);
  return this;
};
oLink.prototype.get = function (attribute) {
  return this.element.get(attribute);
};
oLink.prototype.getText = function () {
  return this.element.getText();
};
oLink.prototype.getId = function () {
  return this.element.getId();
};
oLink.prototype.parent = function () {
  return this.element.parent();
};
oLink.prototype.text = function (text) {
  this.element.text(text);
  return this;
};
oLink.prototype.to = function (route) {
  this.element.click(function () {
    oRouter.redirect(route);
  });
  return this;
};
oLink.prototype.init = function () {
  return this.element.init();
};
oLink.prototype.ref = function (oRefInstance) {
  this.element.ref(oRefInstance);
  return this;
};
oLink.prototype.style = function (styles) {
  this.element.style(styles);
  return this;
};

exports["default"] = oRouter;
exports.oLink = oLink;
