/**
 * @property {string} originPrefix
 * @static
 * @description Set only if your origin url has a static prefix.
 * Example: http:/yourdomain.com/prefixExample -> originPrefix = '/prefixExample'
 */
class oRouter {
    static originPrefix = '';//TODO: setter or type secure
    static routingTable = {};//TODO: setter or type secure
    static defaultView = null;

    static redirect(path, params){
        oRouter.route(path, params);
    }

    static route(givenPath, givenParams){
        oRouter.#setEvent();
        const url = oRouter.#createURL(givenPath);

        const routingParams = {
            fullPath: url.href.replace(url.origin, ''), //NOTE: "fullPath"->?
            url,
            searchParams: oRouter.#decodeSearchQuery(url.search)
        };

        if(typeof givenParams === 'object'){
            Object.assign(routingParams, givenParams);
        }

        const splittedPath = url.pathname.split('/').filter(part => part !== '');
        if(!splittedPath.length){
            if(!oRouter.defaultView || !(typeof oRouter.defaultView === 'function')){
                throw new Error('Property defaultView not set or is not a function.');
            }
            oRouter.#changeState(url, routingParams);
            return oRouter.defaultView(routingParams);
        }

        const routesFiltered = oRouter.#routesFilter(splittedPath);
        if(!routesFiltered.length)
            return oRouter.#notFound(routingParams)

        const foundRoute = routesFiltered[0];
        foundRoute.splitted.forEach((part, index) => {
            if(part.startsWith(':')){
                const paramName = part.replace(':','');
                routingParams[paramName] = splittedPath[index];
            }
        })
        oRouter.#changeState(url, routingParams);
        return oRouter.#optionalRendering(
            oRouter.routingTable[foundRoute.full](routingParams)
        );
    }

    static addSearchParams(params){
        let paramsStr = '';
        Object.entries(params).forEach(([key, value]) => {
            paramsStr += `${key}=${value}`
        })
    }


    //Section: private methods
    static #changeState({ pathname, href}, params){
        try {
            if(pathname === window.location.pathname){
                window.history.replaceState(JSON.parse(JSON.stringify(params)), document.title, href);
            }else{
                const state = { ...params, redirectedFrom: window.location.pathname };
                window.history.pushState(JSON.parse(JSON.stringify(state)), document.title, href);
            }
            return true;
        }catch (e) {
            console.warn(e);
            return false;
        }
    }

    static #createURL(path){
        if(typeof path === 'object' && path instanceof URL) return path;

        return path ? (
            new URL(window.location.origin + oRouter.originPrefix + path)
        ) : (
            new URL(window.location.href)
        );
    }

    static #decodeSearchQuery(query){
        const parsedQuery = Object.create(null);
        if(!query.length)
            return parsedQuery;

        const queryParamsSplitted = query.substring(1).split('&');
        queryParamsSplitted.forEach(param => {
            const [key, value] = param.split('=');
            parsedQuery[decodeURIComponent(key)] = decodeURIComponent(value);
        });

        return parsedQuery;
    }

    static #notFound(routingParams){
        const { url } = routingParams;
        if(!oRouter.routingTable['404']){
            throw new Error('404 not found');
        }
        oRouter.#changeState(url, routingParams);
        return oRouter.#optionalRendering(
            oRouter.routingTable['404'](routingParams)
        );
    }

    static #setEvent(){
        if(!window.onpopstate){
            window.onpopstate = function(e){
                e.preventDefault();
                oRouter.route();
            }
        }
    }

    static #routesFilter(splittedPath){
        const routes = Object.keys(oRouter.routingTable).map(route => ({
            full: route,
            splitted: route.split('/').filter(route => route !== '')
        }));

        let routesFiltered = routes.filter(route=> route.splitted.length === splittedPath.length);
        for(let i = 0; i < splittedPath.length; i++){
            routesFiltered = routesFiltered.filter(route => (route.splitted[i] === splittedPath[i] || route.splitted[i].startsWith(':')));
        }
        return routesFiltered;
    }

    static #optionalRendering(routingFnResult){
        if(routingFnResult instanceof HTMLElement){
            document.body.innerHTML = '';
            document.body.appendChild(routingFnResult);
        }
    }
}
export default oRouter;