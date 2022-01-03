'use strict';

function renderIfHtmlElementGiven(element, renderIn = document.body) {
  if (!element) {
    return;
  }

  const render = (element) => {
    renderIn.innerHTML = '';
    renderIn.appendChild(element);
  };

  if (element instanceof HTMLElement) {
    render(element);
  }

  if (element.init && typeof element.init === 'function') {
    const result = element.init();
    if (result instanceof HTMLElement) {
      render(result);
    }
  }
}

function routesFilter(splittedPath, routingTable) {
  const routes = Object.keys(routingTable).map(route => ({
    full: route,
    splitted: route.split('/').filter(route => route !== '')
  }));

  let routesFiltered = routes.filter(route => route.splitted.length === splittedPath.length);
  for (let i = 0; i < splittedPath.length; i++) {
    routesFiltered = routesFiltered.filter(route => (route.splitted[i] === splittedPath[i] || route.splitted[i].startsWith(':')));
  }
  return routesFiltered;
}

function setOnPopStateEvent() {
  if (!window.onpopstate) {
    window.onpopstate = function (e) {
      e.preventDefault();
      oRouter.route();
    };
  }
}

function decodeSearchQuery(query) {
  const parsedQuery = Object.create(null);
  if (
    typeof query !== 'string' ||
    !query.length ||
    !query.startsWith('?')
  )
    return parsedQuery;


  const queryParametersSplitted = query.substring(1).split('&');
  queryParametersSplitted.forEach(parameter => {
    const [key, value] = parameter.split('=');
    parsedQuery[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return parsedQuery;
}

function createUrlObject(path, originPrefix = '') {
  if (typeof path === 'object' && path instanceof URL) return path;

  return (path || path === '') ?
    new URL(window.location.origin + originPrefix + path) :
    new URL(window.location.href);
}

function splitAndFilterPath(path, originPrefix = '') {
  const parsedOriginPrefix = originPrefix.startsWith('/') ? originPrefix.substring(1) : originPrefix;
  return path.split('/').filter(part => part !== '' && part !== parsedOriginPrefix);
}

const FORBIDDEN_PARAMETERS = [
  'fullPath',
  'url',
  'hash',
  'searchParameters'
];

function decodeParameters(route, splittedPath) {
  const decodedParameters = {};
  route.splitted.forEach((part, index) => {
    if (part.startsWith(':')) {
      const parameterName = part.replace(':', '');
      if(FORBIDDEN_PARAMETERS.includes(parameterName)) return;

      decodedParameters[parameterName] = splittedPath[index];
    }
  });
  return decodedParameters;
}

function encodeSearchQuery(searchParameters) {
  if (!searchParameters || typeof searchParameters !== 'object') return '';

  const searchParametersEntries = Object.entries(searchParameters);
  let searchQueryString = '?';

  searchQueryString += searchParametersEntries
    .filter(parameterEntry => searchParametersFilter(parameterEntry))
    .map(parameterEntry => searchParametersMapper(parameterEntry))
    .join('&');


  if (!searchQueryString.substring(1).length)
    return '';

  return searchQueryString;
}

function searchParametersFilter([, value]) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
}

function searchParametersMapper([key, value]) {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
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

class oRouter {
  static originPrefix = '';//TODO: setter or type secure
  static routingTable = {};//TODO: setter or type secure
  static #routingParameters = {};

  static set defaultView(value) {
    if (!value || !(typeof value === 'function')) {
      throw new Error('Not valid defaultView parametereter.');
    }
    oRouter.#defaultView = value;
  }

  static get routingParameters() {
    return oRouter.#routingParameters;
  }

  static set routingParameters(value) {
    return value;
  }

  static #defaultView = () => null;

  static redirect(path, parameters) {
    oRouter.route(path, parameters);
  }

  static route(givenPath, givenParameters) {
    setOnPopStateEvent();
    var renderFunctionResult;
    const url = createUrlObject(givenPath, oRouter.originPrefix);

    oRouter.#routingParameters = {
      fullPath: url.href.replace(url.origin, ''),
      url,
      searchParameters: decodeSearchQuery(url.search),
      hash: url.hash,
      parameters: {}
    };

    if (typeof givenParameters === 'object') {
      Object.assign(oRouter.#routingParameters, givenParameters);
    }

    const splittedPath = splitAndFilterPath(url.pathname, oRouter.originPrefix);
    if (!splittedPath.length) {
      oRouter.#changeState(url);
      renderFunctionResult = oRouter.#defaultView(oRouter.#routingParameters);
      renderIfHtmlElementGiven(renderFunctionResult);
      return true;
    }

    const routesFiltered = routesFilter(splittedPath, oRouter.routingTable);
    if (!routesFiltered.length) {
      const { url } = oRouter.#routingParameters;
      if (!oRouter.routingTable['404-notFound']) {
        return false;
      }
      oRouter.#changeState(url);
      renderFunctionResult = oRouter.routingTable['404-notFound'](oRouter.#routingParameters);
      renderIfHtmlElementGiven(renderFunctionResult);
      return false;
    }

    const foundRoute = routesFiltered[0];
    Object.assign(
      oRouter.#routingParameters.parameters,
      decodeParameters(foundRoute, splittedPath)
    );

    oRouter.#changeState(url);
    renderFunctionResult = oRouter.routingTable[foundRoute.full](oRouter.#routingParameters);
    renderIfHtmlElementGiven(renderFunctionResult);
    return true;
  }

  static setSearchParameter(key, value) {
    if (!key || typeof key !== 'string' || typeof value === 'object') return false;
    return oRouter.setSearchParameters({
      [key]: String(value)
    });
  }

  static unsetSearchParameter(key) {
    if (!oRouter.#routingParameters.searchParameters[key]) return false;

    delete oRouter.#routingParameters.searchParameters[key];

    const { url } = oRouter.#routingParameters;
    let parametersStr = oRouter.#searchParametersToString();

    url.search = `?${parametersStr}`;
    return oRouter.#changeState(url);
  }

  static setSearchParameters(parameters) {
    if (typeof parameters !== 'object') return false;
    if (!Object.keys(parameters).length) return true;

    const { url } = oRouter.#routingParameters;

    url.search = oRouter.#searchParametersToString(parameters);
    return oRouter.#changeState(url);
  }

  static unsetSearchParametersAll() {
    const { url } = oRouter.#routingParameters;
    const searchParameters = decodeSearchQuery(url.search);
    Object.keys(searchParameters).forEach(searchParameter => oRouter.unsetSearchParameter(searchParameter));

    return oRouter.#changeState(url);
  }

  static setHash(hash) {
    if (!hash || typeof hash === 'object') return false;

    hash = String(hash);
    const { url } = oRouter.#routingParameters;

    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }
    const alreadyInRegExp = new RegExp(`#?${hash}(#|$)`, 'i');
    if (alreadyInRegExp.test(url.hash)) return true;

    url.hash += '#' + hash;

    return oRouter.#changeState(url);
  }

  static unsetHash(hash) {
    if (!hash || typeof hash === 'object') return false;

    hash = String(hash);
    const { url } = oRouter.#routingParameters;

    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }
    const alreadyInRegExp = new RegExp(`#?${hash}(#|$)`, 'i');
    url.hash = url.hash.replace(alreadyInRegExp, '');

    return oRouter.#changeState(url);
  }

  static unsetHashAll() {
    const { url } = oRouter.#routingParameters;
    const hashes = url.hash.split('#').filter(hash => hash !== '');
    hashes.forEach(hash => oRouter.unsetHash(hash));
  }

  static isSetHash(hash) {
    const alreadyInRegExp = new RegExp(`#?${hash}(#|$)`);
    const { url } = oRouter.#routingParameters;
    return alreadyInRegExp.test(url.hash);
  }

  static back() {
    window.history.back();
  }

  static #searchParametersToString(searchParameters) {
    if (searchParameters) {
      Object.assign(
        oRouter.#routingParameters.searchParameters,
        searchParameters
      );
    }

    return encodeSearchQuery(oRouter.#routingParameters.searchParameters);
  }

  //Section: private methods
  static #changeState(url) {
    const { pathname } = url;
    oRouter.#routingParameters.fullPath = url.href.replace(url.origin, '');
    try {
      if (pathname === window.location.pathname) {
        window.history.replaceState(
          JSON.parse(JSON.stringify(oRouter.#routingParameters)),
          document.title,
          url
        );
      } else {
        const state = { ...oRouter.#routingParameters, redirectedFrom: window.location.pathname };
        window.history.pushState(
          JSON.parse(JSON.stringify(state)),
          document.title,
          url
        );
      }
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }
}

module.exports = oRouter;
