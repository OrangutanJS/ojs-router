/**
 * @property {string} originPrefix
 * @static
 * @description Set only if your origin url has a static prefix.
 * Example: http:/yourdomain.com/prefixExample -> originPrefix = '/prefixExample'
 * @property {function} defaultView
 * @static
 * @description default view for oRouter ('/' path).
 */

//TODO: wykrywanie zmian w urlu np. dodanie hasha poza api oRoutera0
class oRouter {
  static originPrefix = '';//TODO: setter or type secure
  static routingTable = {};//TODO: setter or type secure
  static #routingParams = {};

  static set defaultView(value) {
    if (!value || !(typeof value === 'function')) {
      throw new Error('Not valid defaultView parameter.');
    }
    oRouter.#defaultView = value;
  }

  static get routingParams() {
    return oRouter.#routingParams;
  }

  static set routingParams(value) {
    return false;
  }

  static #defaultView = () => null;

  static redirect(path, params) {
    oRouter.route(path, params);
  }

  static route(givenPath, givenParams) {
    oRouter.#setEvent();
    const url = oRouter.#createURL(givenPath);

    oRouter.#routingParams = {
      fullPath: url.href.replace(url.origin, ''), //NOTE: "fullPath"->?
      url,
      searchParams: oRouter.#decodeSearchQuery(url.search),
      hash: url.hash
    };

    if (typeof givenParams === 'object') {
      Object.assign(oRouter.#routingParams, givenParams);
    }

    const splittedPath = url.pathname.split('/').filter(part => part !== '');
    if (!splittedPath.length) {
      oRouter.#changeState(url);
      return oRouter.#optionalRendering(
        oRouter.#defaultView(oRouter.#routingParams)
      );
    }

    const routesFiltered = oRouter.#routesFilter(splittedPath);
    if (!routesFiltered.length) {
      return oRouter.#notFound(oRouter.#routingParams);
    }

    const foundRoute = routesFiltered[0];
    foundRoute.splitted.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.replace(':', '');
        oRouter.#routingParams[paramName] = splittedPath[index];
      }
    })

    oRouter.#changeState(url);
    return oRouter.#optionalRendering(
      oRouter.routingTable[foundRoute.full](oRouter.#routingParams)
    );
  }

  static setSearchParam(key, value) {
    if (!key || typeof key !== 'string' || typeof value === 'object') return false;
    return oRouter.setSearchParams({
      [key]: String(value)
    });
  }

  static unsetSearchParam(key) {
    delete oRouter.#routingParams.searchParams[key];

    const {url} = oRouter.#routingParams;
    let paramsStr = oRouter.#searchParamsToString();

    url.search = `?${paramsStr}`;
    return oRouter.#changeState(url);
  }

  static setSearchParams(params) {
    if (typeof params !== 'object') return false;
    if (!Object.keys(params).length) return true;

    const {url} = oRouter.#routingParams;
    let paramsStr = oRouter.#searchParamsToString(params);

    url.search = '?' + paramsStr;
    return oRouter.#changeState(url);
  }

  static setHash(hash) {
    if (!hash || typeof hash === 'object') return false;

    hash = String(hash);
    const {url} = oRouter.#routingParams;

    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }
    const alredyInRegExp = new RegExp(`#?${hash}(#|$)`);
    if (alredyInRegExp.test(url.hash)) return true;

    url.hash += '#' + hash;

    return oRouter.#changeState(url);
  }

  static unsetHash(hash) {
    if (!hash || typeof hash === 'object') return false;

    hash = String(hash);
    const {url} = oRouter.#routingParams;

    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }
    const alredyInRegExp = new RegExp(`#?${hash}(#|$)`, 'i');
    url.hash = url.hash.replace(alredyInRegExp, '');

    return oRouter.#changeState(url);
  }

  static isSetHash(hash) {
    const alredyInRegExp = new RegExp(`#?${hash}(#|$)`);
    const {url} = oRouter.#routingParams;
    return alredyInRegExp.test(url.hash);
  }

  static #searchParamsToString(params) {
    if (params) {
      Object.assign(
        oRouter.#routingParams.searchParams,
        params
      );
    }

    const paramsMapped = Object.entries(oRouter.#routingParams.searchParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

    return paramsMapped.join('&');
  }

  //Section: private methods
  static #changeState({pathname, href}) {
    try {
      if (pathname === window.location.pathname) {
        window.history.replaceState(JSON.parse(JSON.stringify(oRouter.#routingParams)), document.title, href);
      } else {
        const state = {...oRouter.#routingParams, redirectedFrom: window.location.pathname};
        window.history.pushState(JSON.parse(JSON.stringify(state)), document.title, href);
      }
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  static #createURL(path) {
    if (typeof path === 'object' && path instanceof URL) return path;

    return path ? (
      new URL(window.location.origin + oRouter.originPrefix + path)
    ) : (
      new URL(window.location.href)
    );
  }

  static #decodeSearchQuery(query) {
    const parsedQuery = Object.create(null);
    if (!query.length)
      return parsedQuery;

    const queryParamsSplitted = query.substring(1).split('&');
    queryParamsSplitted.forEach(param => {
      const [key, value] = param.split('=');
      parsedQuery[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return parsedQuery;
  }

  static #notFound() {
    const {url} = oRouter.#routingParams;
    if (!oRouter.routingTable['404']) {
      throw new Error('404 not found');
    }
    oRouter.#changeState(url);
    return oRouter.#optionalRendering(
      oRouter.routingTable['404'](oRouter.#routingParams)
    );
  }

  static #setEvent() {
    if (!window.onpopstate) {
      window.onpopstate = function (e) {
        e.preventDefault();
        oRouter.route();
      }
    }
  }

  static #routesFilter(splittedPath) {
    const routes = Object.keys(oRouter.routingTable).map(route => ({
      full: route,
      splitted: route.split('/').filter(route => route !== '')
    }));

    let routesFiltered = routes.filter(route => route.splitted.length === splittedPath.length);
    for (let i = 0; i < splittedPath.length; i++) {
      routesFiltered = routesFiltered.filter(route => (route.splitted[i] === splittedPath[i] || route.splitted[i].startsWith(':')));
    }
    return routesFiltered;
  }

  static #optionalRendering(routingFnResult) {
    if (routingFnResult instanceof HTMLElement) {
      document.body.innerHTML = '';
      document.body.appendChild(routingFnResult);
    }
  }
}

export default oRouter;
