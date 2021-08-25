export default function routesFilter(splittedPath, routingTable) {
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
