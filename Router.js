/**
 * @property {string} originPrefix
 * @static
 * @description Set only if your origin url has a static prefix.
 * Example: http:/yourdomain.com/prefixExample -> originPrefix = '/prefixExample'
 */
class Router {
    static originPrefix = '';
    static routingTable = {};
    static defaultView = null;

    static redirect(path, params){
        Router.route(path, params);
    }

    static changeState(path, params){
        try {
            if(params.url === window.location.pathname){
                window.history.replaceState(params, document.title, path);
            }else{
                const state = { ...params, redirectedFrom: window.location.pathname };
                window.history.pushState(state, document.title, path);
            }
            return true;
        }catch (e) {
            console.warn(e);
            return false;
        }
    }

	static route(givenPath, givenParams){
        Router.#setEvent();
        const path = givenPath ?? (Router.originPrefix ? location.pathname.replace(Router.originPrefix, '') : location.pathname);
        const [searchParams, searchString] = Router.#searchQueryParser(givenPath ?? location.search);

        const routingParams = {
            url: path + searchString,
            searchParams
        };

        if(typeof givenParams === 'object'){
            Object.assign(routingParams, givenParams);
        }

        const splittedPath = path.split('/').filter(part => part !== '');
        if(!splittedPath.length){
            if(!Router.defaultView || !(typeof Router.defaultView === 'function')){
                throw new Error('Property defaultView not set.');
            }
            Router.changeState(path, routingParams);
            return Router.defaultView(routingParams);
        }

        const routesFiltered = Router.#routesFilter(splittedPath);
        if(!routesFiltered.length)
            return Router.#notFound(routingParams)

        const foundRoute = routesFiltered[0];
        foundRoute.splitted.forEach((part, index) => {
            if(part.startsWith(':')){
                const paramName = part.replace(':','');
                routingParams[paramName] = splittedPath[index];
            }
        })
        Router.changeState(path, routingParams);
        return Router.routingTable[foundRoute.full](routingParams);
    }



    //Section: private methods
    static #searchQueryParser(query){
        const parsedQuery = Object.create(null);
        if(!query.length)
            return [parsedQuery, query];

        if(!(query instanceof Location)){
            const delimiter1 = query.indexOf('?');
            const delimiter2 = query.indexOf('#');
            if(delimiter1 < 0)
                return [parsedQuery, query];

            query = delimiter2 > -1 ? query.slice(delimiter1, delimiter2) : query.substring(delimiter1);
        }

        const queryParamsSplitted = query.substring(1).split('&');
        queryParamsSplitted.forEach(param => {
            const [key, value] = param.split('=');
            parsedQuery[decodeURIComponent(key)] = decodeURIComponent(value);
        });

        return [parsedQuery, query];
    }

    static #notFound(routingParams){
        const { path } = routingParams;
        if(!Router.routingTable['404']){
            throw new Error('404 not found');
        }
        Router.changeState(path, routingParams);
        return Router.routingTable['404'](routingParams);
    }

    static #setEvent(){
        if(!window.onpopstate){
            window.onpopstate = function(e){
                e.preventDefault();
                Router.route();
            }
        }
    }

    static #routesFilter(splittedPath){
        const routes = Object.keys(Router.routingTable).map(route => ({
            full: route,
            splitted: route.split('/').filter(route => route !== '')
        }));

        let routesFiltered = routes.filter(route=> route.splitted.length === splittedPath.length);
        for(let i = 0; i < splittedPath.length; i++){
            routesFiltered = routesFiltered.filter(route => (route.splitted[i] === splittedPath[i] || route.splitted[i].startsWith(':')));
        }
        return routesFiltered;
    }
}
export default Router;